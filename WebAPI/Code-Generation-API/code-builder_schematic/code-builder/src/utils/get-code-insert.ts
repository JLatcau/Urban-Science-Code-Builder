import { dasherize } from "@angular-devkit/core/src/utils/strings";

export function getCodeInsert(_options: any): string {
    let dashed = dasherize(_options.name);
    let string = "<app-" + dashed + "></app-" + dashed + ">";

    return string;
}