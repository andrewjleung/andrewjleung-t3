import { SiPaypal, SiRust } from "@icons-pack/react-simple-icons";
import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { Sparkle } from "lucide-react";
import type { ComponentProps } from "react";
import { useMouseTracking } from "@/components/Aversion";
import { Card } from "@/components/ui/card";
import { display } from "@/lib/stores";

export function DisplayItem({ className, ...props }: ComponentProps<"svg">) {
    const $display = useStore(display);

    if ($display === "default") {
        return <Sparkle className={className} {...props} />;
    } else if ($display === "rust") {
        return <SiRust className={clsx("", className)} />;
    } else if ($display === "paypal") {
        return <SiPaypal className={clsx("", className)} />;
    } else {
        return <Sparkle className={className} {...props} />;
    }
}

export function Display({ children, className }: ComponentProps<"div">) {
    useMouseTracking("#specimen", 5);

    return (
        <Card
            className={clsx(
                "m-0 flex h-32 w-32 items-center justify-center border-0 p-0",
                className,
            )}
        >
            <div id="specimen" className="">
                {children}
            </div>
        </Card>
    );
}
