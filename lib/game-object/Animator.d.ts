import { FrameTimer } from "../utils/FrameTimer";
export declare class Animator {
    private readonly _width;
    private readonly _height;
    private readonly _image;
    private readonly _sw;
    private readonly _sh;
    private _frameX;
    private _frameY;
    private _fps;
    private _frameInterval;
    private _currentFrameInterval;
    animation: Animation | null;
    constructor(imageId: string, _width: number, _height: number, sw?: number, sh?: number);
    get fps(): number;
    set fps(value: number);
    update(frameTimer: FrameTimer): void;
    draw(context: CanvasRenderingContext2D, x: number, y: number): void;
}
interface Frame {
    x: number;
    y: number;
}
export interface Animation {
    nextFrame: Frame;
    isMaxFrame: boolean;
    reset(): void;
}
export declare class AnimationRow implements Animation {
    private readonly _frameY;
    private readonly _framesXCount;
    private _frameX;
    constructor(_frameY: number, _framesXCount: number);
    get nextFrame(): Frame;
    get isMaxFrame(): boolean;
    reset(): void;
}
export {};
