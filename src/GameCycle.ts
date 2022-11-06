import { Frame, Inputs } from ".";

export class GameCycle {
    private _fps = 60;
    private _frameInterval = 1000 / this._fps;
    private _lastFrameTs = 0;

    public get fps(): number {
        return this._fps;
    }

    public set fps(value: number) {
        this._fps = value;
        this._frameInterval = 1000 / this._fps;
    }

    public start(): void {
        this.animate(0);
    }

    private animate(timeStamp: number) {
        const deltaTime = timeStamp - this._lastFrameTs;
        this._lastFrameTs = timeStamp;
        const correction = deltaTime / this._frameInterval;
        const frame = { timeStamp, deltaTime, correction }

        Inputs.Gamepads.update();
        this.tick(frame);

        requestAnimationFrame(this.animate.bind(this));
    }

    public tick: (frame: Frame) => unknown = () => { };
}