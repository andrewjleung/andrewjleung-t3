import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";
import { useVerticalSpotlight } from "@/lib/hooks/use-vertical-spotlight";

export function VerticalSpotlightList({
    children,
    className,
    numItems,
    ...props
}: ComponentPropsWithoutRef<"ul"> & { numItems: number }) {
    const ref = useRef<HTMLUListElement>(null);
    const {
        onMove,
        onLeave,
        className: spotlightClassName,
    } = useVerticalSpotlight(ref, {
        animateBufferPercantageStrategy: { type: "count", count: numItems },
    });

    return (
        <ul
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={clsx(spotlightClassName, className)}
            {...props}
        >
            {children}
        </ul>
    );
}

export function VerticalSpotlightListItem({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) {
    return (
        <li className={clsx("", className)} {...props}>
            {children}
        </li>
    );
}
