//----------------------------------------------------------------------
// Name: Alan Poblette
// File: buttonFunctions.js
// Date: Spring 2021
// Desc: A collection of functions used to select start/end nodes in Alan's
//   A* search project. Buttons are found in index.html
//----------------------------------------------------------------------

/* Function to set start Node and visually respresent it */
function selectStart() {
    var selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected.length === 0) {
        let e = new Error("Must select a start Node");
        console.error(e.message);
        return;
    }

    // check that selection isn't endNode
    if (selected[0] === destinationNode) {
        let e = new Error("Can't select end as start node.");
        console.error(e.message);
        return;
    }

    // check if there is a current start node, if there isn't then reset startnode color
    if (startNode !== null) {
        nodes.update([{ id: startNode, color: { background: '#97c2fc',
                                                    highlight: {
                                                        background: '#97c2fc',
                                                    }
                                                } }]);
        startNode = selected[0];
    }
    else {
        startNode = selected[0];
    }

    // change color to aquamarine
    nodes.update([{ id: startNode, color: { background: "aquamarine", 
                                                highlight: {
                                                    background: "aquamarine",
                                                    } } }]);

    // FIXME: add more functionality for packet sending later
}

/* Function to set end Node and visually respresent it */
function selectDestination() {
    let selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected.length === 0) {
        let e = new Error("Must select an end Node");
        console.error(e.message);
        return;
    }

    // check that selection isn't startNode
    if (selected[0] === startNode) {
        let e = new Error("Can't select start as end node.");
        console.error(e.message);
        return;
    }

    // check if there is a current end node, if there is then reset end node color and replace value
    if (destinationNode !== null) {
        nodes.update([{ id: destinationNode, color: { background: '#97c2fc',
                                                        highlight: {
                                                            background: '#97c2fc',
                                                            }
                                                        } }]);
        destinationNode = selected[0];
    }
    else {
        destinationNode = selected[0];
    }

    // change color to orange
    nodes.update([{ id: destinationNode, color: { background: "orange", 
                                                highlight: {
                                                    background: "orange",
                                                    } } }]);

    // FIXME: add more functionality for packet sending later
}