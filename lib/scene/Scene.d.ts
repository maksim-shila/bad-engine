import { CollisionHandler, FrameTimer, GameObject, GameObjectContainer, Camera } from "..";
export declare abstract class Scene {
    readonly width: number;
    readonly height: number;
    private _objects;
    private _containers;
    private _colliders;
    private _camera;
    vx: number;
    vx_default: number;
    constructor(width: number, height: number);
    get colliders(): CollisionHandler;
    get particles(): GameObject[];
    get camera(): Camera;
    protected set camera(value: Camera);
    get sprites(): GameObject[];
    get obstacles(): GameObject[];
    add(object: GameObject | GameObjectContainer): void;
    addObject(object: GameObject): void;
    addContainer(container: GameObjectContainer): void;
    update(frameTimer: FrameTimer): void;
    draw(context: CanvasRenderingContext2D): void;
    destroy(): void;
}
