import { DirEntry, SchematicsException, Tree } from "@angular-devkit/schematics";

export interface AddComponentToDashboardContext {
    path: string; // path to the dashboard.component.html
    row: string;
    col: string;
    toAdd: string;
    dashboardComponentFileName: string;
}

// Creates context to the change being requested. Allows a lot of information to be passed to other
// functions within a single object
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

// locates a file in the host directory or specified directory and returns the relative path
// in terms of the Angular projects root.
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