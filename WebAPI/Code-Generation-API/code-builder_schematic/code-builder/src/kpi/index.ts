import { Rule, SchematicContext, Tree, mergeWith, chain } from '@angular-devkit/schematics';
import { addComponentToDashboardRule } from '../utils/add-component-to-dashboard-rule';
import { getTemplateParameterized } from '../utils/get-template-parameterized';

export function kpi(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    // Get the source template with its configurations
    const sourceTemplateParameterized = getTemplateParameterized(tree, _options);

    // Add the 2 different rules into 1 rule
    const rule = chain([
      mergeWith(sourceTemplateParameterized),
      addComponentToDashboardRule(_options, tree),
    ]);

    // Create a bar-chart component according to the sourceTemplateParameterized
    // and modify the dashboard.html file to accomodate for the new component
    return rule(tree, _context);
  };
}