import { Input } from "./Input";

export class KeyboardInput extends Input {

    public maxSequenceLength = 10;
    public leaveDefaultCodes = ["F4"];

    private _sequence = "";
    private _sequences: { sequence: string, callback: () => unknown }[] = [];

    constructor() {
        super("keyboard");
        window.addEventListener("keydown", e => {
            if (!this.leaveDefaultCodes.includes(e.code)) {
                e.preventDefault();
            }
            this.onKeyDown(e.code);

            this._sequence += e.key;
            if (this._sequence.length > this.maxSequenceLength) {
                this._sequence = this._sequence.substring(1);
            }
            const matches = this._sequences.filter(pair => this._sequence.includes(pair.sequence));
            if (matches.length > 0) {
                matches.forEach(pair => pair.callback());
                this._sequence = "";
            }
        });
        window.addEventListener("keyup", e => {
            e.preventDefault();
            this.onKeyUp(e.code);
        })
    }

    public onSequence(sequence: string, callback: () => unknown): void {
        this._sequences.push({ sequence, callback });
    }
}