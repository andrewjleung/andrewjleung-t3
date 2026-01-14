import clsx from "clsx";
import { Asterisk } from "lucide-react";
import { motion } from "motion/react";
import { type ComponentProps, type MouseEventHandler, useState } from "react";
import { Aversion } from "@/components/Aversion";
import { Card } from "@/components/ui/card";

export function CoolCard({
    className,
    children,
    ...props
}: ComponentProps<"div">) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const onMove: MouseEventHandler<HTMLDivElement> = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        setMousePosition({ x, y });
    };

    return (
        <motion.div
            initial="initial"
            animate="initial"
            onMouseMove={onMove}
            whileHover="animate"
            className={clsx("h-32 w-1/2", className)}
        >
            <Card className="relative h-full flex-row items-center justify-center gap-0 overflow-hidden border-none bg-neutral-900/50">
                <Aversion
                    mousePosition={mousePosition}
                    scale={0.4}
                    className="h-24 w-24"
                >
                    <Asterisk className="h-full w-full stroke-neutral-800 opacity-40" />
                </Aversion>

                <Aversion
                    mousePosition={mousePosition}
                    scale={0.3}
                    className="h-20 w-20"
                >
                    <Asterisk className="h-full w-full stroke-neutral-800 opacity-30" />
                </Aversion>

                <Aversion
                    mousePosition={mousePosition}
                    scale={0.2}
                    className="h-16 w-16"
                >
                    <Asterisk className="h-full w-full stroke-neutral-800 opacity-20" />
                </Aversion>

                <Aversion
                    mousePosition={mousePosition}
                    scale={0.1}
                    className="h-12 w-12"
                >
                    <Asterisk className="h-full w-full stroke-neutral-800 opacity-10" />
                </Aversion>

                <div className="absolute left-8 mb-8" {...props}>
                    {children}
                </div>
            </Card>
        </motion.div>
    );
}
