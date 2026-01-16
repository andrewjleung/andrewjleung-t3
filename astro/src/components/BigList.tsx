import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import type { ComponentProps, MouseEventHandler } from "react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Observer);

export function BigList({
    children,
    className,
    numItems,
    ...props
}: ComponentProps<"ul"> & { numItems: number }) {
    const threshold =
        100 / gsap.utils.clamp(1, Number.POSITIVE_INFINITY, numItems * 2);
    const ref = useRef(null);

    const { contextSafe } = useGSAP({ scope: ref });

    const onMove: MouseEventHandler<HTMLUListElement> = contextSafe((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const bottomFromPosition = gsap.utils.mapRange(
            rect.top,
            rect.bottom,
            -threshold,
            100 + threshold,
            e.clientY,
        );

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
                "mask-intersect not-hover:mask-b-from-0 hover:mask-y-from-0",
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
