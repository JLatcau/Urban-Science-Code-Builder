import { Rule, Tree } from '@angular-devkit/schematics';
import { addComponentToDashboardChange } from './add-component-to-dashboard.change';
import { createAddComponentToDashboardContext } from './add-component-to-dashboard.context';
import { InsertChange } from '@schematics/angular/utility/change'

export function addComponentToDashboardRule (_options: any, host: Tree): Rule {
    return (tree: Tree) => {
        let context = createAddComponentToDashboardContext(_options, host);
        let change = addComponentToDashboardChange(context, tree);
        
        const declarationRecorder = tree.beginUpdate(context.dashboardComponentFileName);
        console.log(declarationRecorder);
        
        if(change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
        tree.commitUpdate(declarationRecorder)

        return tree;
    }
}