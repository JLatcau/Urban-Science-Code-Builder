import { Rule, Tree } from '@angular-devkit/schematics';
import { addComponentToDashboardChange } from './add-component-to-dashboard.change';
import { createAddComponentToDashboardContext } from './add-component-to-dashboard.context';
import { InsertChange } from '@schematics/angular/utility/change'

// Returns the tree with the updated dashboard.html file after inserting component
export function addComponentToDashboardRule (_options: any, host: Tree): Rule {
    return (tree: Tree) => {
        let context = createAddComponentToDashboardContext(_options, host);
        let change = addComponentToDashboardChange(context, tree);
        
        // Creates an UpdateRecorder instance
        const declarationRecorder = tree.beginUpdate(context.dashboardComponentFileName);
        
        // If change is valid, insert changes into a 'copy' dashboard.html
        if(change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }

        // Update the actual dashboard.html
        tree.commitUpdate(declarationRecorder)

        return tree;
    }
}