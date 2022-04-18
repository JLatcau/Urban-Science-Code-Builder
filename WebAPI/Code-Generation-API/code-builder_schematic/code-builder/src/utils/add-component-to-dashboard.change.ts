import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { AddComponentToDashboardContext } from './add-component-to-dashboard.context'

import { Change, InsertChange } from '@schematics/angular/utility/change'

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Finds the location of where to put the newly created component. 
export function addComponentToDashboardChange (context: AddComponentToDashboardContext, tree: Tree): Change {

    // Read in the contents of the dashboard.html file
    let text = tree.read(context.dashboardComponentFileName);
    if (!text) throw new SchematicsException(`File does not exist HERE.`);

    let position = context.row + context.col;
    let sourceText = text.toString('utf-8');

    // Create a JSDOM object using the text that was read and include node locations
    const dom = new JSDOM(sourceText, { includeNodeLocations: true});
    
    // Find the element in the text using the position
    const element = dom.window.document.getElementById(position);

    // Get the node location of the element found above
    const locations = dom.nodeLocation(element);

    let query = '[cellLocation="' + position + '"]';
    if(!locations) throw new SchematicsException('<div> could not be found. Query: ' + query);

    let toAdd = context.toAdd;

    // Return an InsertChange object for the html code for the newly 
    // created component just after the node location found above
    return new InsertChange(context.dashboardComponentFileName, locations.endTag.startOffset, toAdd);
}