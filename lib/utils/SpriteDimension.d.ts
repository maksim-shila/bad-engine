export declare class SpriteDimension {
    readonly imageId: string;
    readonly sw: number;
    readonly sh: number;
    readonly scale: number;
    readonly image: CanvasImageSource;
    constructor(imageId: string, sw: number, sh: number, scale: number);
    get width(): number;
    get height(): number;
}
