import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import type { ComponentProps, MouseEventHandler } from "react";
import { useState } from "react";

export function BigList({
    children,
    className,
    ...props
}: HTMLMotionProps<"ul">) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const onMove: MouseEventHandler<HTMLUListElement> = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

        setMousePosition({ x, y });
    };

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
                "--tw-mask-bottom-from-position": `${Math.round(mousePosition.y)}%`,
                "--tw-mask-top-from-position": `${100 - Math.round(mousePosition.y)}%`,
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
