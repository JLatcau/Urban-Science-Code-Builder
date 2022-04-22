import { dasherize } from "@angular-devkit/core/src/utils/strings";

// Returns the html code snippet for the newly created component to be inserted
// into dashboard.html
export function getCodeInsert(_options: any): string {
    let dashed = dasherize(_options.name);
    let string = "<app-card><app-" + dashed + "></app-" + dashed + "></app-card>";

    return string;
}