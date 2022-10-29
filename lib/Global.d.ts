interface GlobalConfig {
    debug: boolean;
    window: GameWindow;
    cheats: {
        [key: string]: unknown;
    };
}
export interface GameWindow {
    width: number;
    height: number;
}
export declare const Global: GlobalConfig;
export {};
