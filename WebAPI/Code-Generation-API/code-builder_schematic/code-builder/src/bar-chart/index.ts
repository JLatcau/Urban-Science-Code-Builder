import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree, apply, url, template, mergeWith, SchematicsException, move, chain } from '@angular-devkit/schematics';

import { parseName } from '@schematics/angular/utility/parse-name'
import { addComponentToDashboardRule } from '../utils/add-component-to-dashboard-rule';

// TO DO: Make getCode() a helper util function //

function getCode(_options: any): string {
  let dashed = dasherize(_options.name);
  let string = "<app-" + dashed + "></app-" + dashed + ">";

  return string;
}

export function barChart(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const workspaceAsBuffer = tree.read('angular.json');
    if(!workspaceAsBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }

    // Might be able to make this a helper util too //
    // START // 
    const workspace = JSON.parse(workspaceAsBuffer.toString());
    
    const projectName = workspace.defaultProject;
    const project = workspace.projects[projectName];

    const path = `${project.sourceRoot}/${project.projectType === 'application' ? 'app' : 'lib'}`

    const parsed = parseName(path, _options.name);

    _options.name = parsed.name;

    _options.path = parsed.path;

    // END (1) - can either end here or at 2 //

    _options.toAdd = getCode(_options);

    // END (2) // 

    const sourceTemplate = url(`./files`);
    const sourceTemplateParametrized = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings
      }),
      move(parsed.path)
    ]);

    const rule = chain([
      mergeWith(sourceTemplateParametrized),
      addComponentToDashboardRule(_options, tree),
    ]);

    return rule(tree, _context);
  };
}
