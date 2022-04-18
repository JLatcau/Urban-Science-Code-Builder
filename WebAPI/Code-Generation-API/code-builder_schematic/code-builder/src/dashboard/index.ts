import { strings } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree, apply, url, template, mergeWith, SchematicsException, move } from '@angular-devkit/schematics';

import { parseName } from '@schematics/angular/utility/parse-name'


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function dashboard(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const workspaceAsBuffer = tree.read('angular.json');
    if(!workspaceAsBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }

    const workspace = JSON.parse(workspaceAsBuffer.toString());
    
    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];

    const path = `${project.sourceRoot}/${project.projectType === 'application' ? 'app' : 'lib'}`

    const parsed = parseName(path, _options.name);

    _options.name = parsed.name;


    const sourceTemplate = url(`./files`);
    const sourceTemplateParametrized = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings
      }),
      move(parsed.path)
    ]);

    return mergeWith(sourceTemplateParametrized)(tree, _context);
  };
}
