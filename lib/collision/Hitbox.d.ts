import { GameObject } from "../game-object/GameObject";
import { Collider } from "./Collider";
export declare class Hitbox {
    private readonly _hitboxes;
    constructor(gameObject?: GameObject);
    add(collider: Collider, name?: string): void;
    hasCollision(other: Hitbox | null): boolean;
    draw(context: CanvasRenderingContext2D): void;
}
