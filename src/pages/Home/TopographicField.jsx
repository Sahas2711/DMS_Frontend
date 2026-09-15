/**
 * TopographicField — the homepage's single lightweight 3D signature.
 *
 * Design: an abstract topographic contour surface (option C) that slowly
 * breathes behind the closing CTA. It suggests terrain and movement through
 * Asia without becoming "a 3D globe website".
 *
 * Implementation: raw WebGL 1 (no Three.js — nothing extra to download), one
 * low-resolution heightfield (~96x54 vertices), vertex-shader displacement,
 * wireframe lines. Conservative on every device class.
 *
 * Robustness ladder:
 *   1. prefers-reduced-motion  -> static SVG contour fallback (no canvas)
 *   2. no WebGL / context fail -> static SVG contour fallback
 *   3. render loop pauses when offscreen (IntersectionObserver)
 *   4. render loop pauses when the tab is hidden (visibilitychange)
 *   5. full GL cleanup on unmount
 *   6. low DPR: min(devicePixelRatio, 1.5) desktop, 1 on small screens
 */
import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
uniform float u_time;
uniform vec2 u_aspect;
varying float v_elev;
varying float v_dist;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = a_pos;
  vec2 world = p * u_aspect * 3.0 + vec2(u_time * 0.045, u_time * 0.02);
  float e = fbm(world);
  // gentle ridges
  e = mix(e, abs(e - 0.5) * 2.0, 0.35);
  v_elev = e;
  v_dist = length(p);
  gl_Position = vec4(p, (e - 0.5) * 0.16, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying float v_elev;
varying float v_dist;
uniform vec3 u_line;
uniform vec3 u_accent;

void main(){
  float edge = smoothstep(1.15, 0.55, v_dist);          // fade toward edges
  float band = smoothstep(0.42, 0.5, v_elev) * (1.0 - smoothstep(0.5, 0.62, v_elev));
  vec3 col = mix(u_line, u_accent, band * 0.85);
  float alpha = (0.16 + band * 0.5) * edge;
  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
    }
    return sh;
}

/** Static SVG fallback — premium without WebGL. */
function StaticFallback({ className }) {
    return (
        <svg aria-hidden="true" className={className} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <path
                    key={i}
                    d={`M-20 ${80 + i * 44} C 200 ${20 + i * 46}, 420 ${140 + i * 40}, 640 ${70 + i * 44} S 1040 ${150 + i * 42}, 1220 ${60 + i * 45}`}
                    fill="none"
                    stroke={i % 4 === 1 ? 'rgba(197,168,105,0.28)' : 'rgba(255,255,255,0.10)'}
                    strokeWidth="1"
                />
            ))}
        </svg>
    );
}

export default function TopographicField({ className = '' }) {
    const hostRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        if (!host || !canvas) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            host.dataset.fallback = 'true';
            return undefined;
        }

        const gl = canvas.getContext('webgl', { antialias: true, alpha: true, powerPreference: 'low-power' })
            || canvas.getContext('experimental-webgl', { antialias: true, alpha: true });
        if (!gl) {
            host.dataset.fallback = 'true';
            return undefined;
        }

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) { host.dataset.fallback = 'true'; return undefined; }
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { host.dataset.fallback = 'true'; return undefined; }
        gl.useProgram(prog);

        /* Line grid: rows of horizontal polylines (GL_LINE_STRIP). Low-poly. */
        const COLS = 96;
        const ROWS = 54;
        const verts = [];
        for (let r = 0; r <= ROWS; r += 1) {
            for (let c = 0; c <= COLS; c += 1) {
                verts.push((c / COLS) * 2 - 1, (r / ROWS) * 2 - 1);
            }
        }
        const indices = [];
        for (let r = 0; r <= ROWS; r += 1) {
            for (let c = 0; c < COLS; c += 1) {
                const base = r * (COLS + 1) + c;
                indices.push(base, base + 1);
            }
        }
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        const ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const aPos = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uAspect = gl.getUniformLocation(prog, 'u_aspect');
        const uLine = gl.getUniformLocation(prog, 'u_line');
        const uAccent = gl.getUniformLocation(prog, 'u_accent');
        gl.uniform2f(uAspect, Math.max(1, canvas.clientWidth / Math.max(1, canvas.clientHeight)) * 0.62, 1.0);
        gl.uniform3f(uLine, 1.0, 1.0, 1.0);
        gl.uniform3f(uAccent, 197 / 255, 168 / 255, 105 / 255);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);

        const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 1024 ? 1 : 1.5);
        const resize = () => {
            const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
            const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                gl.viewport(0, 0, w, h);
            }
        };
        resize();
        window.addEventListener('resize', resize);

        /* Render loop with offscreen + visibility pausing. */
        let raf = 0;
        let running = false;
        let visible = true;
        const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(frame); } };
        const stop = () => { running = false; cancelAnimationFrame(raf); };
        const t0 = performance.now();
        const frame = (now) => {
            gl.uniform1f(uTime, (now - t0) / 1000);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
            raf = requestAnimationFrame(frame);
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start(); else stop();
        }, { rootMargin: '80px' });
        io.observe(canvas);

        const onVis = () => { if (document.hidden) stop(); else start(); };
        document.addEventListener('visibilitychange', onVis);
        start();

        return () => {
            stop();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            window.removeEventListener('resize', resize);
            gl.deleteBuffer(vbo);
            gl.deleteBuffer(ibo);
            gl.deleteProgram(prog);
            const lose = gl.getExtension('WEBGL_lose_context');
            if (lose) lose.loseContext();
        };
    }, []);

    return (
        <div ref={hostRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
            <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ opacity: 0.9 }}
            />
            <StaticFallback className="hidden h-full w-full" />
        </div>
    );
}
