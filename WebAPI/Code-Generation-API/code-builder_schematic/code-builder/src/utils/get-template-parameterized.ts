import { strings } from '@angular-devkit/core';
import { Tree, apply, url, template, SchematicsException, move, Source } from '@angular-devkit/schematics';

import { parseName } from '@schematics/angular/utility/parse-name'
import { getCodeInsert } from './get-code-insert';

export function getTemplateParameterized(tree: Tree, _options: any): Source {
    // Check if the currenty workspace is an Angular project
    const workspaceAsBuffer = tree.read('angular.json');
    if (!workspaceAsBuffer) {
        throw new SchematicsException('Not an Angular CLI workspace');
    }

    // Gets the current workspace as a JSON object
    const workspace = JSON.parse(workspaceAsBuffer.toString());

    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];

    // Returns the path to the app folder of the project if the project type is an application
    // If not an application, returns the path to the lib folder
    const path = `${project.sourceRoot}/${project.projectType === 'application' ? 'app' : 'lib'}`


    // Reset's the name to the new name in path form after it's been normalized (ex: dashboard -> /dashboard)
    const parsed = parseName(path, _options.name);
    _options.name = parsed.name;

    if ('path' in _options)
    {
        _options.path = parsed.path;

        _options.toAdd = getCodeInsert(_options);
    }

    // Sets sourceTemplate equal to the template files
    const sourceTemplate = url(`./files`);

    // Adds additional configurations to sourceTemplate
    // Combines sourceTemplate, the additional options provided, 
    // and the move() function, which will position the newly 
    // created component properly in the user's project
    const sourceTemplateParametrized = apply(sourceTemplate, [
        template({
            ..._options,
            ...strings
        }),
        move(parsed.path)
    ]);

    return sourceTemplateParametrized;
}