export const RadarScanOverlay = () => (
    <svg
        viewBox="0 0 100 100"
        className="radar-overlay absolute inset-0 pointer-events-none"
    >
        {/* balayage */}
        <line
            x1="50"
            y1="50"
            x2="50"
            y2="0"
            stroke="rgba(0,255,0,0.6)"
            strokeWidth="0.5"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="3s"
                repeatCount="indefinite"
            />
        </line>

        {/* halo */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,255,0,0.15)" />
    </svg>
);
