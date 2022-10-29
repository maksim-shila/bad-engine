import { CollisionHandler, Camera } from "..";
export class Scene {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this._objects = [];
        this._containers = [];
        this._colliders = new CollisionHandler();
        this.vx = 0;
        this.vx_default = 0;
        this._camera = new Camera(0, 0, width, height);
    }
    get colliders() {
        return this._colliders;
    }
    get particles() {
        return this._objects.filter(o => o.type === "particle");
    }
    get camera() {
        return this._camera;
    }
    set camera(value) {
        this._camera = value;
    }
    get sprites() {
        return this._objects.filter(o => ["enemy", "player"].includes(o.type));
    }
    get obstacles() {
        return this._objects.filter(o => o.type === "obstacle");
    }
    add(object) {
        switch (object.GlobalType) {
            case "object":
                this.addObject(object);
                break;
            case "container":
                this.addContainer(object);
                break;
        }
    }
    addObject(object) {
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
    addContainer(container) {
        this._containers.push(container);
    }
    update(frameTimer) {
        this._containers.forEach(container => container.update(frameTimer));
        this._objects.forEach(object => object.update(frameTimer));
        this._colliders.update();
        this._camera.update();
    }
    draw(context) {
        this._objects.forEach(object => object.draw(context));
    }
    destroy() {
    }
}
