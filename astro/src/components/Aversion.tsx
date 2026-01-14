import clsx from "clsx";
import { motion } from "motion/react";
import { type ComponentProps, type RefObject, useRef } from "react";

function manhattan(
    a: { x: number; y: number },
    b: { x: number; y: number },
): { x: number; y: number } {
    return {
        x: b.x - a.x,
        y: b.y - a.y,
    };
}

type Coordinate = {
    x: number;
    y: number;
};

function useAversion<T extends Element>(
    ref: RefObject<T | null>,
    mousePosition: { x: number; y: number },
): Coordinate {
    const manhattanToRef = (ref: RefObject<T | null>) => {
        if (ref.current == null) {
            return null;
        }

        const boundingRect = ref.current?.getBoundingClientRect();
        const center = {
            x: boundingRect.x + boundingRect.width / 2,
            y: boundingRect.y + boundingRect.height / 2,
        };

        return manhattan(mousePosition, center);
    };

    return manhattanToRef(ref) || { x: 0, y: 0 };
}

export function Aversion({
    className,
    children,
    mousePosition,
    scale,
}: ComponentProps<"div"> & { mousePosition: Coordinate; scale: number }) {
    const ref = useRef(null);
    const { x, y } = useAversion(ref, mousePosition);

    return (
        <div className={clsx("relative", className)}>
            <motion.div
                variants={{
                    initial: {},
                    animate: {
                        translateX: `${x * scale}px`,
                        translateY: `${y * scale}px`,
                        transition: {
                            type: "tween",
                            duration: 0.1,
                            ease: "easeOut",
                        },
                    },
                }}
                transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                }}
                className="absolute h-full w-full"
            >
                {children}
            </motion.div>

            <div ref={ref} className="absolute h-full w-full opacity-0">
                {children}
            </div>
        </div>
    );
}
