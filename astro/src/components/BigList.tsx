import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import type { ComponentProps, MouseEventHandler } from "react";
import { useState } from "react";

function useYSpotlight(
    threshold: number,
    mousePosition: { x: number; y: number },
): { bottomFromPosition: number; topFromPosition: number } {
    const mouseY = Math.round(mousePosition.y);
    const bottomFromPosition =
        mouseY < threshold
            ? -threshold + (mouseY / threshold) * 2 * threshold
            : mouseY;

    const topFromPosition = 100 - bottomFromPosition;

    return { bottomFromPosition, topFromPosition };
}

export function BigList({
    children,
    className,
    numItems,
    ...props
}: HTMLMotionProps<"ul"> & { numItems: number }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const onMove: MouseEventHandler<HTMLUListElement> = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

        setMousePosition({ x, y });
    };

    const threshold = 100 / numItems;
    const { bottomFromPosition, topFromPosition } = useYSpotlight(
        threshold,
        mousePosition,
    );

    return (
        <motion.ul
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
            initial={{
                "--tw-mask-bottom-from-position": "0%",
                "--tw-mask-top-from-position": "100%",
            }}
            whileHover={{
                "--tw-mask-bottom-from-position": `${bottomFromPosition}%`,
                "--tw-mask-top-from-position": `${topFromPosition}%`,
                transition: {
                    duration: 0.1,
                    ease: "easeOut",
                },
            }}
            onMouseMove={onMove}
            className={clsx(
                "not-has-[*:hover]:mask-b-from-0% hover:mask-t-from-0 hover:mask-b-from-0 ease-out",
                className,
            )}
            {...props}
        >
            {children}
        </motion.ul>
    );
}

export function BigListItem({
    children,
    className,
    ...props
}: ComponentProps<"li">) {
    return (
        <li className={clsx("", className)} {...props}>
            {children}
        </li>
    );
}
