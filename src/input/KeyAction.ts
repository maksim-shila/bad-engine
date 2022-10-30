import { InputType } from "./Input";

type KeyBinding = {
    inputType: InputType;
    codes: string[]
}

export class KeyAction {
    private readonly _bindings: KeyBinding[] = [
        { inputType: "keyboard", codes: [] },
        { inputType: "xbox", codes: [] }
    ];

    constructor(public readonly name: string) { }

    public bind(type: InputType, codes: string[]) {
        const binding = this.getBinding(type);
        codes.forEach(code => {
            if (!binding.codes.includes(code)) {
                binding.codes.push(code);
            }
        });
    }

    public getBindings(type: InputType): string[] {
        const binding = this.getBinding(type);
        return binding.codes;
    }

    private getBinding(type: InputType): KeyBinding {
        const binding = this._bindings.find(b => b.inputType === type);
        if (!binding) {
            throw new Error(`Unknown input type: ${type}`);
        }
        return binding;
    }
}