import * as rwc from 'random-weighted-choice';


abstract class Command {
    public type: string;
    public abstract getResponse(): string;
}

interface ExtendableCommand {
}

class StringCommand extends Command {
    public type = "string";
    constructor(public string: string) {
        super();
    };
    public getResponse() {
        return this.string;
    }
}

class RandomStringCommand extends Command implements ExtendableCommand {
    public type = "randomstring";
    constructor(public strings: WeightedString[]) {
        super()
    };
    public getResponse() {
        return rwc(this.strings.map(x => {return {weight: parseInt(x.weight), id: x.string}}));
    }
}

export function getClass(command: any): Command {
    switch (command.type) {
        case "string":
            return new StringCommand(command.string);

        case "randomstring":
            return new RandomStringCommand(command.strings);

        default:
            return undefined;
    }
}

export function getExtendable(command: any): ExtendableCommand & Command {
    let commandClass = getClass(command);
    if (!commandClass || commandClass.type !== "randomstring") return undefined;

    return commandClass;
}

class WeightedString {
    weight: string;
    string: string;
}