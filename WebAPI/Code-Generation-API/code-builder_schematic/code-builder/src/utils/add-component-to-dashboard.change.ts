import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { AddComponentToDashboardContext } from './add-component-to-dashboard.context'

import { Change, InsertChange } from '@schematics/angular/utility/change'

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export function addComponentToDashboardChange (context: AddComponentToDashboardContext, tree: Tree): Change {

    let text = tree.read(context.dashboardComponentFileName);
    if (!text) throw new SchematicsException(`File does not exist HERE.`);

    let position = context.row + context.col;
    console.log("Position " + position);
    let sourceText = text.toString('utf-8');

    const dom = new JSDOM(sourceText, { includeNodeLocations: true});
    let query = '[cellLocation="' + position + '"]';
    const element = dom.window.document.getElementById(position);
    const locations = dom.nodeLocation(element);
    if(!locations) throw new SchematicsException('<div> could not be found. Query: ' + query);

    let toAdd = context.toAdd;

    return new InsertChange(context.dashboardComponentFileName, locations.endTag.startOffset, toAdd);
}