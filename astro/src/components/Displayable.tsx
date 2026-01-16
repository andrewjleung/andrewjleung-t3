import type { ComponentProps, MouseEventHandler } from "react";
import type { DisplayKind } from "@/lib/displays";
import { display } from "@/lib/stores";

export function Displayable({
    children,
    className,
    displayKind,
}: ComponentProps<"div"> & { displayKind: DisplayKind }) {
    const onMove: MouseEventHandler<HTMLDivElement> = () => {
        display.set(displayKind);
    };

    const onLeave: MouseEventHandler<HTMLDivElement> = () => {
        display.set("default");
    };

    return (
        <span
            role="none"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
        >
            {children}
        </span>
    );
}
