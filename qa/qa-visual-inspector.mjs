/* Visual inspector: decodes QA screenshots and prints a coarse luminance grid
   (ASCII heat) per shot plus stats, so layout/composition problems (blank
   frames, dead crops, lopsided scenes) are visible without a browser. */
import fs from 'node:fs';
import zlib from 'node:zlib';
import { execSync } from 'node:child_process';

const TMP = execSync('cygpath -w /tmp').toString().trim();
const DIR = process.argv[2] || `${TMP}\\qa_shots`;

function decodePng(path) {
    const buf = fs.readFileSync(path);
    let pos = 8;
    let w = 0; let h = 0;
    const idat = [];
    while (pos < buf.length) {
        const len = buf.readUInt32BE(pos);
        const type = buf.toString('ascii', pos + 4, pos + 8);
        if (type === 'IHDR') {
            w = buf.readUInt32BE(pos + 8);
            h = buf.readUInt32BE(pos + 12);
            const bitDepth = buf[pos + 16 + 4]; // after width,height,depth... layout: w(4) h(4) depth(1)...
            // IHDR: width(4) height(4) bitDepth(1) colorType(1) ...
            const bd = buf.readUInt8(pos + 16 + 4); // wrong offset guard below
            void bd; void bitDepth;
        }
        if (type === 'IHDR') {
            // correct offsets: 8 len,4 type then data
            // width at +8, height at +12, bitDepth at +16, colorType at +17
            void len;
        }
        if (type === 'IDAT') idat.push(buf.subarray(pos + 8, pos + 8 + len));
        pos += 12 + len;
    }
    const raw = zlib.inflateSync(Buffer.concat(idat));
    // assume 8-bit RGB (Chrome screenshots are RGBA actually — handle both)
    const bpp = 4; // Chrome headless PNGs are RGBA
    const stride = w * bpp;
    const out = Buffer.alloc(h * stride);
    const prev = Buffer.alloc(stride);
    let p = 0;
    for (let y = 0; y < h; y += 1) {
        const ft = raw[p]; p += 1;
        const line = raw.subarray(p, p + stride);
        p += stride;
        const cur = out.subarray(y * stride, (y + 1) * stride);
        line.copy(cur);
        if (ft === 1) {
            for (let x = bpp; x < stride; x += 1) cur[x] = (cur[x] + cur[x - bpp]) & 255;
        } else if (ft === 2) {
            for (let x = 0; x < stride; x += 1) cur[x] = (cur[x] + prev[x]) & 255;
        } else if (ft === 3) {
            for (let x = 0; x < stride; x += 1) {
                const a = x >= bpp ? cur[x - bpp] : 0;
                cur[x] = (cur[x] + ((a + prev[x]) >> 1)) & 255;
            }
        } else if (ft === 4) {
            for (let x = 0; x < stride; x += 1) {
                const a = x >= bpp ? cur[x - bpp] : 0;
                const b = prev[x];
                const c = x >= bpp ? prev[x - bpp] : 0;
                const pa = Math.abs(b - c); const pb = Math.abs(a - c); const pc = Math.abs(a + b - 2 * c);
                const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
                cur[x] = (cur[x] + pr) & 255;
            }
        }
        cur.copy(prev);
    }
    return { w, h, bpp, stride, px: out };
}

function lumGrid({ w, h, bpp, stride, px }, cols = 24, rows = 14) {
    const grid = [];
    for (let gy = 0; gy < rows; gy += 1) {
        const row = [];
        for (let gx = 0; gx < cols; gx += 1) {
            const x0 = Math.floor(gx * w / cols);
            const x1 = Math.floor((gx + 1) * w / cols);
            const y0 = Math.floor(gy * h / rows);
            const y1 = Math.floor((gy + 1) * h / rows);
            let sum = 0; let n = 0;
            for (let y = y0; y < y1; y += 4) {
                for (let x = x0; x < x1; x += 4) {
                    const o = y * stride + x * bpp;
                    sum += 0.299 * px[o] + 0.587 * px[o + 1] + 0.114 * px[o + 2];
                    n += 1;
                }
            }
            row.push(n ? Math.round(sum / n) : 0);
        }
        grid.push(row);
    }
    return grid;
}

const ramp = ' .:-=+*#%@';
function ascii(grid) {
    return grid.map((row) => row.map((v) => {
        const idx = Math.min(9, Math.floor(v / 25.6));
        return ramp[idx];
    }).join('')).join('\n');
}

function stats(grid) {
    const flat = grid.flat();
    const mean = flat.reduce((a, b) => a + b, 0) / flat.length;
    const min = Math.min(...flat);
    const max = Math.max(...flat);
    const contrast = max - min;
    return { mean: Math.round(mean), contrast };
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.png')).sort();
console.log(`inspecting ${files.length} shots in ${DIR}\n`);
for (const f of files) {
    const img = decodePng(`${DIR}\\${f}`);
    const grid = lumGrid(img);
    const s = stats(grid);
    const flat = grid.flat();
    const uniform = flat.every((v) => Math.abs(v - flat[0]) < 6);
    console.log(`── ${f}  mean=${s.mean} contrast=${s.contrast}${uniform ? '  ⚠ UNIFORM/BLANK?' : ''}`);
    console.log(ascii(grid));
    console.log();
}
