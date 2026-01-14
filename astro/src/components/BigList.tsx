import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { type HTMLMotionProps, motion } from "motion/react";
import type { ComponentProps, MouseEventHandler } from "react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Observer);

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
}: ComponentProps<"ul"> & { numItems: number }) {
    const threshold = 100 / numItems;
    const ref = useRef(null);

    const { contextSafe } = useGSAP({ scope: ref });

    const onMove: MouseEventHandler<HTMLUListElement> = contextSafe((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

        const bottomFromPosition =
            mouseY < threshold
                ? -threshold + (mouseY / threshold) * 2 * threshold
                : mouseY;

        const topFromPosition = 100 - bottomFromPosition;

        gsap.to(ref.current, {
            duration: 0.1,
            ease: "power1.out",
            "--tw-mask-bottom-from-position": `${bottomFromPosition}%`,
            "--tw-mask-top-from-position": `${topFromPosition}%`,
        });
    });

    const onLeave: MouseEventHandler<HTMLUListElement> = contextSafe(() => {
        gsap.to(ref.current, {
            duration: 0.3,
            ease: "power1.out",
            "--tw-mask-bottom-from-position": "0%",
            "--tw-mask-top-from-position": "100%",
        });
    });

    return (
        <ul
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={clsx(
                "big-list",
                "not-has-[*:hover]:mask-b-from-0% hover:mask-t-from-0 hover:mask-b-from-0 ease-out",
                className,
            )}
            {...props}
        >
            {children}
        </ul>
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
