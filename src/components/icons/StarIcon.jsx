/**
 * Four-point brand star. Previously copy-pasted into 12 page files.
 * Decorative by default — hidden from assistive tech unless given a title.
 */
const StarIcon = ({ className = 'w-8 h-8 text-white mb-4' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        focusable="false"
    >
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

export default StarIcon;
