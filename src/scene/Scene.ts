import { CollisionHandler, Frame, GameObject, Camera } from "..";

export abstract class Scene {

    private _objects: GameObject[] = [];
    private _colliders = new CollisionHandler();
    private _camera: Camera;

    constructor(
        public readonly width: number,
        public readonly height: number
    ) {
        this._camera = new Camera(0, 0, width, height);
    }

    public get colliders(): CollisionHandler {
        return this._colliders;
    }

    public get particles(): GameObject[] {
        return this._objects.filter(o => o.type === "particle");
    }

    public get camera(): Camera {
        return this._camera;
    }

    protected set camera(value: Camera) {
        this._camera = value;
    }

    public get sprites(): GameObject[] {
        return this._objects.filter(o => ["enemy", "player"].includes(o.type));
    }

    public get obstacles(): GameObject[] {
        return this._objects.filter(o => o.type === "obstacle");
    }

    public add(object: GameObject, order?: number): void {
        if (order) {
            object.order = order;
        }
        this._objects.push(object);
        object.onDestroy(self => this._objects = this._objects.filter(o => o !== self));
        switch (object.type) {
            case "obstacle":
                this._colliders.watch(this.sprites, [object]);
                break;
            default:
                if (object.rigidBody) {
                    this._colliders.watch([object], this.obstacles);
                }
                break;
        }
    }

    public update(frameTimer: Frame): void {
        this._objects.forEach(object => object.update(frameTimer));
        this._colliders.update();
        this._camera.update();
    }

    public draw(context: CanvasRenderingContext2D): void {
        this._objects.sort((o1, o2) => o1.order > o2.order ? 1 : (o1.order < o2.order ? -1 : 0));
        this._objects.forEach(object => object.draw(context));
    }

    public destroy() {
    }
}