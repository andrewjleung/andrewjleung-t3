import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import {
    type MouseEvent,
    type MouseEventHandler,
    type RefObject,
    useRef,
} from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Observer);

function manhattan(
    a: { x: number; y: number },
    b: { x: number; y: number },
): { x: number; y: number } {
    return {
        x: b.x - a.x,
        y: b.y - a.y,
    };
}

export function useMouseTracking(selector: string, scale: number) {
    const { onMove } = useRelativeMouseTracking(document, selector, scale);

    useGSAP(() => {
        Observer.create({
            target: document,
            type: "pointer",
            onMove: (e) => {
                if (e.x && e.y) {
                    onMove(e.x, e.y);
                }
            },
        });
    }, []);
}

export function useRelativeMouseTracking(
    containerSelector: Parameters<typeof gsap.utils.selector>[0],
    selector: string,
    scale: number,
) {
    const xRotationTo = useRef<gsap.QuickToFunc>(null);
    const yRotationTo = useRef<gsap.QuickToFunc>(null);
    const q = gsap.utils.selector(containerSelector);

    const { contextSafe } = useGSAP(() => {
        xRotationTo.current = gsap.quickTo(selector, "rotationX", {
            duration: 0.2,
            ease: "power2.out",
        });

        yRotationTo.current = gsap.quickTo(selector, "rotationY", {
            duration: 0.2,
            ease: "power2.out",
        });
    });

    const onMove = contextSafe((clientX: number, clientY: number) => {
        const targets = q(selector);

        if (targets.length < 1) {
            return;
        }

        const boundingRect = targets[0].getBoundingClientRect();
        const center = {
            x: boundingRect.x + boundingRect.width / 2,
            y: boundingRect.y + boundingRect.height / 2,
        };

        const { x, y } = manhattan({ x: clientX, y: clientY }, center);

        if (xRotationTo.current && yRotationTo.current) {
            const xr = gsap.utils.interpolate(
                0,
                1 * scale,
                y / boundingRect.width / 2,
            );

            const yr = -gsap.utils.interpolate(
                0,
                1 * scale,
                x / boundingRect.height / 2,
            );

            xRotationTo.current(xr);
            yRotationTo.current(yr);
        }
    });

    const onLeave = contextSafe(() => {
        if (xRotationTo.current && yRotationTo.current) {
            xRotationTo.current(0);
            yRotationTo.current(0);
        }
    });

    return {
        onMove,
        onLeave,
    };
}

export function useAversion<Container extends Element>(
    containerRef: RefObject<Container | null>,
    averseSelector: string,
    staticSelector: string,
    scale: number,
) {
    const xTo = useRef<gsap.QuickToFunc>(null);
    const yTo = useRef<gsap.QuickToFunc>(null);
    const q = gsap.utils.selector(containerRef);

    const { contextSafe } = useGSAP(
        () => {
            xTo.current = gsap.quickTo(averseSelector, "x", {
                duration: 0.2,
                ease: "power2.out",
            });

            yTo.current = gsap.quickTo(averseSelector, "y", {
                duration: 0.2,
                ease: "power2.out",
            });
        },
        { scope: containerRef },
    );

    const onMove: MouseEventHandler<Container> = contextSafe(
        (e: MouseEvent) => {
            const static_ = q(staticSelector);

            if (static_.length < 1) {
                return;
            }

            const mousePosition = {
                x: e.clientX,
                y: e.clientY,
            };

            const boundingRect = static_[0].getBoundingClientRect();
            const center = {
                x: boundingRect.x + boundingRect.width / 2,
                y: boundingRect.y + boundingRect.height / 2,
            };

            const { x, y } = manhattan(mousePosition, center);

            if (xTo.current && yTo.current) {
                xTo.current(x * scale);
                yTo.current(y * scale);
            }
        },
    );

    const onLeave: MouseEventHandler<Container> = contextSafe(() => {
        if (xTo.current && yTo.current) {
            xTo.current(0);
            yTo.current(0);
        }
    });

    return {
        onMove,
        onLeave,
    };
}
