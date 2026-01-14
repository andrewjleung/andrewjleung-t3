import { Grip } from "lucide-react";
import {
    type HTMLMotionProps,
    hover,
    type MotionValue,
    motion,
    useScroll,
    useSpring,
    useTransform,
    type Variants,
} from "motion/react";
import {
    type ComponentProps,
    type MouseEventHandler,
    type RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import { Card, CardContent } from "@/components/ui/card";

function manhattan(
    a: { x: number; y: number },
    b: { x: number; y: number },
): { x: number; y: number } {
    return {
        x: b.x - a.x,
        y: b.y - a.y,
    };
}

function useParallaxLayer<T extends Element>(
    ref: RefObject<T | null>,
    mousePosition: { x: number; y: number },
    scale: number,
): Variants {
    const manhattanToRef = (ref: RefObject<T | null>) => {
        if (ref.current == null) {
            return null;
        }

        const boundingRect = ref.current?.getBoundingClientRect();
        const center = {
            x: boundingRect.x + boundingRect.width / 2,
            y: boundingRect.y + boundingRect.height / 2,
        };

        return manhattan(mousePosition, center);
    };

    const manhattanToLayer = manhattanToRef(ref) || { x: 0, y: 0 };

    return {
        initial: {},
        animate: {
            translateX: `${manhattanToLayer.x * scale}px`,
            translateY: `${manhattanToLayer.y * scale}px`,
            transition: {
                type: "tween",
                duration: 0.1,
                ease: "easeOut",
            },
        },
    };
}

export function CoolCard({
    className,
    children,
    ...props
}: HTMLMotionProps<"div">) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const layer1Ref = useRef<SVGSVGElement>(null);
    const layer2Ref = useRef<SVGSVGElement>(null);
    const layer3Ref = useRef<SVGSVGElement>(null);

    const layer1Data = useParallaxLayer(layer1Ref, mousePosition, 0.2);
    const layer2Data = useParallaxLayer(layer1Ref, mousePosition, 0.1);
    const layer3Data = useParallaxLayer(layer1Ref, mousePosition, 0.05);

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
            className="h-32 w-1/2"
        >
            <Card className="relative h-full overflow-hidden border-none bg-neutral-900/50">
                <CardContent className="">
                    <div className="absolute top-4 right-28">
                        <div className="relative">
                            <motion.div
                                {...layer1Data}
                                transition={{
                                    type: "tween",
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className="absolute h-24 w-24"
                            >
                                <Grip className="h-full w-full stroke-neutral-800/20" />
                            </motion.div>

                            <Grip
                                ref={layer1Ref}
                                className="absolute h-24 w-24 opacity-0"
                            />
                        </div>

                        <div className="relative">
                            <motion.div
                                {...layer2Data}
                                transition={{
                                    type: "tween",
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className="absolute h-20 w-20"
                            >
                                <Grip className="h-full w-full stroke-neutral-800/15" />
                            </motion.div>

                            <Grip
                                ref={layer2Ref}
                                className="absolute h-20 w-20 opacity-0"
                            />
                        </div>

                        <div className="relative">
                            <motion.div
                                {...layer3Data}
                                transition={{
                                    type: "tween",
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className="absolute h-16 w-16"
                            >
                                <Grip className="h-full w-full stroke-neutral-800/10" />
                            </motion.div>

                            <Grip
                                ref={layer3Ref}
                                className="absolute h-16 w-16 opacity-0"
                            />
                        </div>
                    </div>

                    <h2 className="text-midground text-xl">Resume</h2>
                </CardContent>
            </Card>
        </motion.div>
    );
}
