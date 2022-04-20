import { Rule, SchematicContext, Tree, mergeWith } from '@angular-devkit/schematics';
import { getTemplateParameterized } from '../utils/get-template-parameterized';

export function dashboard(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    // Get the source template with its configurations
    const sourceTemplateParameterized = getTemplateParameterized(tree, _options);

    // Create the dashboard component according to the sourceTemplateParametrized
    return mergeWith(sourceTemplateParameterized)(tree, _context);
  };
}
