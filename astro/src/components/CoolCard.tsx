import clsx from "clsx";
import { Asterisk } from "lucide-react";
import { type ComponentProps, type MouseEventHandler, useRef } from "react";
import { useAversion } from "@/components/Aversion";
import { Card, CardContent } from "@/components/ui/card";

export function CoolCard({
    className,
    children,
    ...props
}: ComponentProps<"div">) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { onMove: onMove1, onLeave: onLeave1 } = useAversion<HTMLDivElement>(
        containerRef,
        "#aversion-1",
        "#aversion-static-1",
        0.3,
    );

    const { onMove: onMove2, onLeave: onLeave2 } = useAversion<HTMLDivElement>(
        containerRef,
        "#aversion-2",
        "#aversion-static-2",
        0.2,
    );

    const { onMove: onMove3, onLeave: onLeave3 } = useAversion<HTMLDivElement>(
        containerRef,
        "#aversion-3",
        "#aversion-static-3",
        0.1,
    );

    const onMove: MouseEventHandler<HTMLDivElement> = (e) => {
        onMove1(e);
        onMove2(e);
        onMove3(e);
    };

    const onLeave: MouseEventHandler<HTMLDivElement> = (e) => {
        onLeave1(e);
        onLeave2(e);
        onLeave3(e);
    };

    return (
        <Card
            ref={containerRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={clsx(
                "group border-none bg-neutral-900/50 p-0",
                className,
            )}
            {...props}
        >
            <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden">
                <div className="absolute h-4/5 w-4/5">
                    <div className="relative h-full w-full">
                        <div id="aversion-1" className="absolute h-full w-full">
                            <div className="h-full w-full rounded-md bg-neutral-800 opacity-10 transition-all duration-300 ease-in-out group-hover:opacity-20" />
                        </div>

                        <div
                            id="aversion-static-1"
                            className="absolute h-full w-full opacity-50"
                        >
                            <div className="h-full w-full opacity-0" />
                        </div>
                    </div>
                </div>

                <div className="absolute h-3/5 w-3/5">
                    <div className="relative h-full w-full">
                        <div id="aversion-2" className="absolute h-full w-full">
                            <div className="h-full w-full rounded-md bg-neutral-800 opacity-13 transition-all duration-200 ease-in-out group-hover:opacity-25" />
                        </div>

                        <div
                            id="aversion-static-2"
                            className="absolute h-full w-full opacity-50"
                        >
                            <div className="h-full w-full opacity-0" />
                        </div>
                    </div>
                </div>

                <div className="absolute h-2/5 w-2/5">
                    <div className="relative h-full w-full">
                        <div id="aversion-3" className="absolute h-full w-full">
                            <div className="h-full w-full rounded-md bg-neutral-800 opacity-18 transition-all duration-100 ease-in-out group-hover:opacity-35" />
                        </div>

                        <div
                            id="aversion-static-3"
                            className="absolute h-full w-full opacity-50"
                        >
                            <div className="h-full w-full opacity-0" />
                        </div>
                    </div>
                </div>

                <div className="z-10 h-full w-full">{children}</div>
            </div>
        </Card>
    );
}
