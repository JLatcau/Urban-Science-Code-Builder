//import { dasherize } from "@angular-devkit/core/src/utils/strings";
import { DirEntry, SchematicsException, Tree } from "@angular-devkit/schematics";

export interface AddComponentToDashboardContext {
    path: string; // path to the dashboard.component.html
    row: string;
    col: string;
    toAdd: string;
    dashboardComponentFileName: string;
}

export function createAddComponentToDashboardContext(_options: any, tree: Tree): AddComponentToDashboardContext {

    let path = '/dashboard/dashboard.component.html';
    let row = _options.row;
    let col = _options.col;
    let toAdd = _options.toAdd;
    let dashboardComponentFileName = findFileByName('dashboard/dashboard.component.html', _options.path || '/', tree);

    return {
        path,
        row,
        col,
        toAdd,
        dashboardComponentFileName
    }
}

/*
function constructDestinationPath(_options: any): string {
    return '/' + (_options.sourceDir? _options.sourceDir + '/' : '') + (_options.path || '') + (_options.flat ? '' : '/' + dasherize(_options.name))
} */

function findFileByName(file: string, path: string, host: Tree): string {
    let dir: DirEntry | null = host.getDir(path);

    while(dir) {
        let dashboardComponentFileName = dir.path + '/' + file;
        if (host.exists(dashboardComponentFileName)) {
            return dashboardComponentFileName;
        }
        dir = dir.parent;
    }

    throw new SchematicsException(`File ${file} not found in ${path} or in it's ancestors`)
}