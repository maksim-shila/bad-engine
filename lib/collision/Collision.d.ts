import { Collider, GameObject } from "..";
export declare type CollisionDirection = "left" | "right" | "top" | "bottom";
export declare class Collision {
    readonly left: Collider;
    readonly right: Collider;
    private _direction;
    constructor(left: Collider, right: Collider);
    other(self: GameObject): GameObject;
    get direction(): CollisionDirection;
    computeDirection(): CollisionDirection;
    equals(other: Collision): boolean;
    containsBoth(left: Collider, right: Collider): boolean;
}
