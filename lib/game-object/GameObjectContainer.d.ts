import { FrameTimer, Scene } from "..";
export declare abstract class GameObjectContainer {
    protected readonly scene: Scene;
    readonly GlobalType = "container";
    constructor(scene: Scene);
    update(_: FrameTimer): void;
}
