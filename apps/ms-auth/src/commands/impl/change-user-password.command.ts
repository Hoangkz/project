
export class ChangeUserPasswordCommand {
    constructor(public readonly id: string, public readonly password: string) {

    }
}