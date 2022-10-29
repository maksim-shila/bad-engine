export class RectCollider {
    constructor(parent, offsetX = 0, offsetY = 0, offsetWidth = 0, offsetHeight = 0) {
        this.parent = parent;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetWidth = offsetWidth;
        this.offsetHeight = offsetHeight;
    }
    get x() {
        return this.parent.x + this.offsetX;
    }
    set x(value) {
        this.parent.x = value - this.offsetX;
    }
    get y() {
        return this.parent.y + this.offsetY;
    }
    set y(value) {
        this.parent.y = value - this.offsetY;
    }
    get rx() {
        return this.x + this.width;
    }
    get ry() {
        return this.y + this.height;
    }
    get drawX() {
        return this.parent.drawX + this.offsetX;
    }
    get drawY() {
        return this.parent.drawY + this.offsetY;
    }
    get width() {
        return this.parent.width + this.offsetWidth;
    }
    get height() {
        return this.parent.height + this.offsetHeight;
    }
    draw(context, color = "white") {
        context.save();
        context.lineWidth = 2;
        context.strokeStyle = color;
        context.strokeRect(this.drawX, this.drawY, this.width, this.height);
        context.restore();
    }
    hasCollision(other) {
        return other.x <= this.rx &&
            other.rx >= this.x &&
            other.y <= this.ry &&
            other.ry >= this.y;
    }
}
