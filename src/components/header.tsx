import type { ComponentPropsWithoutRef } from "react";

export function Header({ className }: ComponentPropsWithoutRef<"div">) {
    return <nav className="flex flex-row items-center"></nav>;
}
