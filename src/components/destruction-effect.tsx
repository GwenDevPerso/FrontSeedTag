import type {Coordinates} from "../types/attack.types";

/** Maps chart coordinates (-100..100) to overlay viewBox (0..100). */
const chartToViewBox = (c: Coordinates): {cx: number; cy: number;} => ({
    cx: 50 + c.x / 2,
    cy: 50 - c.y / 2,
});

type DestructionEffectProps = {
    target: Coordinates;
    onComplete: () => void;
};

export const DestructionEffect = ({target, onComplete}: DestructionEffectProps) => {
    const {cx, cy} = chartToViewBox(target);

    return (
        <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 pointer-events-none overflow-visible"
            preserveAspectRatio="none"
        >
            <circle
                cx={cx}
                cy={cy}
                r="2"
                fill="none"
                stroke="rgba(255, 80, 80, 0.9)"
                strokeWidth="0.8"
                className="animate-destruction"
                onAnimationEnd={onComplete}
            />
            <circle
                cx={cx}
                cy={cy}
                r="1"
                fill="rgba(255, 180, 80, 0.8)"
                className="animate-destruction-inner"
            />
        </svg>
    );
};
