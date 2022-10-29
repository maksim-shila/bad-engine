import { Collision, GameObject } from "..";
declare type WatchPair = {
    left: GameObject;
    right: GameObject;
};
export declare class CollisionHandler {
    private _watchObjects;
    private _watchPairs;
    private _collisions;
    get watchObjects(): GameObject[];
    get watchPairs(): WatchPair[];
    get collisions(): Collision[];
    watch(leftSet: GameObject[], rightSet: GameObject[]): void;
    remove(gameObject: GameObject): void;
    update(): void;
    private watchObject;
    private handle;
    private handlePhysics;
}
export {};
