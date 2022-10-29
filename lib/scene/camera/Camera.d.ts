import { GameObject } from "../../game-object/GameObject";
declare class DeadZone {
    x: number;
    y: number;
    rx: number;
    ry: number;
    constructor(x?: number, y?: number, rx?: number, ry?: number);
}
export declare enum FollowStrategy {
    Centered = 0
}
export declare class Camera {
    x: number;
    y: number;
    readonly width: number;
    readonly height: number;
    private _followed;
    private _dx;
    private _dy;
    private _lastX;
    private _lastY;
    deadZone: DeadZone;
    followStrategy: FollowStrategy;
    constructor(x?: number, y?: number, width?: number, height?: number);
    get rx(): number;
    get ry(): number;
    get cx(): number;
    get cy(): number;
    get dx(): number;
    get dy(): number;
    update(): void;
    follow(gameObject: GameObject): void;
}
export {};
