import { GameObject } from "..";
export interface Collider {
    parent: GameObject;
    x: number;
    y: number;
    rx: number;
    ry: number;
    width: number;
    height: number;
    hasCollision(other: Collider): boolean;
    draw(context: CanvasRenderingContext2D, color?: string): void;
}
export declare class RectCollider implements Collider {
    readonly parent: GameObject;
    private offsetX;
    private offsetY;
    private offsetWidth;
    private offsetHeight;
    constructor(parent: GameObject, offsetX?: number, offsetY?: number, offsetWidth?: number, offsetHeight?: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get rx(): number;
    get ry(): number;
    get drawX(): number;
    get drawY(): number;
    get width(): number;
    get height(): number;
    draw(context: CanvasRenderingContext2D, color?: string): void;
    hasCollision(other: Collider): boolean;
}
