//----------------------------------------------------------------------
// Name: Alan Poblette
// File: grid.js
// Date: Spring 2021
// Desc: A script to generate a new grid-graph. The size is configured below.
//----------------------------------------------------------------------

// these control the size of the grid
const GRID_ROWS = 7;
const GRID_COLS = 10;

/* Function to destroy any existing network */
function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

/* Driver function to draw a grid graph with size GRID_ROWS x GRID_COLS */
function drawGrid() {
    destroy();

    var container = document.getElementById('myGraph');

    var data = getGridNetwork();

    var options = {
        physics: {
            stabilization: false,
        },
        layout: {
            randomSeed: "0.9017020639622615:1619057221383",
        },
    }

    network = new vis.Network(container, data, options);
}

/* Helper function that returns a data object used in vis.Network(container, data, options).
 * The object consists of nodes and edges, where there are GRID_COLS*GRID_ROWS nodes, and edges 
 * that make a grid.
 */
function getGridNetwork() {
    nodesArray = new vis.DataSet([]);
    edgesArray = new vis.DataSet([]);

    // make n nodes
    for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
        nodesArray.add({id: i, label: "Node " + i});
    }

    // populate row edges
    for (let j = 0; j < GRID_ROWS; j++) {
        for (let i = j*GRID_COLS; i % GRID_COLS < GRID_COLS-1; i++) {
            edgesArray.add({id: i+"-"+(i+1), from: i, to: i+1, label: 1});
        }
    }

    // populate column edges
    for (let j = 0; j < GRID_COLS; j++) {
        for (let i = j; i / GRID_COLS < GRID_ROWS-1; i = i + GRID_COLS) {
            edgesArray.add({id: i+"-"+(i+GRID_COLS), from: i, to: i+GRID_COLS, label: 1});
        }
    }
    
    nodes = nodesArray;
    edges = edgesArray;
    
    return { edges: edgesArray, nodes: nodesArray };
}