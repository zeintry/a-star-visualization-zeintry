var nodeIds, nodesArray, edgesArray;
var nodes = null;
var edges = null;
var network = null;
var startNode = null;
var destinationNode = null;

/* Function to destroy any existing network */
function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

// starter function for default graph
function initializeGraph() {
    destroy();

    // create an array of nodes
    // set position to custom start for Group 9 topology.
    nodesArray = [
        {id: 1, label: "Router 1"},
        {id: 2, label: "Router 2"},
        {id: 3, label: "Router 3"},
        {id: 4, label: "Router 4"},
        {id: 5, label: "Router 5"},
        {id: 6, label: "Router 6"},
        {id: 7, label: "Router 7"},
        {id: 8, label: "Router 8"},
        {id: 9, label: "Router 9"},
        {id: 10, label: "Router 10"},
        {id: 11, label: "Router 11"},
    ];
    nodes = new vis.DataSet(nodesArray);

    // create an array of edges
    edgesArray = [
        {id: "1-3", from: 1, to: 3, label: '6'},
        {id: "1-2", from: 1, to: 2, label: '3'},
        {id: "1-8", from: 1, to: 8, label: '10'},
        {id: "2-3", from: 2, to: 3, label: '2'},
        {id: "2-6", from: 2, to: 6, label: '6'},
        {id: "3-4", from: 3, to: 4, label: '5'},
        {id: "4-5", from: 4, to: 5, label: '7'},
        {id: "5-6", from: 5, to: 6, label: '8'},
        {id: "5-7", from: 5, to: 7, label: '9'},
        {id: "6-7", from: 6, to: 7, label: '3'},
        {id: "6-10", from: 6, to: 10, label: '4'},
        {id: "7-8", from: 7, to: 8, label: '5'},
        {id: "7-9", from: 7, to: 9, label: '4'},
        {id: "7-11", from: 7, to: 11, label: '1'},
        {id: "8-9", from: 8, to: 9, label: '2'},
        {id: "9-11", from: 9, to: 11, label: '7'},
    ];
    edges = new vis.DataSet(edgesArray);
    
    // Provide the data in the vis format
    let data = {
        nodes: nodes,
        edges: edges
    };

    // set options for the vis graph
    let options = {
        layout: {
            randomSeed: "0.9968069182323511:1618803734894",
        }
    }

    // create a graph by getting container
    let container = document.getElementById('myGraph');

    // initialize the graph
    network = new vis.Network(container, data, options);
}

initializeGraph();