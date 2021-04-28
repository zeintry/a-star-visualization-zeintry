//----------------------------------------------------------------------
// Name: Alan Poblette
// File: random.js
// Date: Spring 2021
// Desc: A script to randomly generate a graph of size N. I use a probability
//   variable to connect the edges randomly (see implementation). The ideal graph
//   should be connected but it isn't guaranteed. The probabilty I chose gave graphs
//   that weren't completely connected (and cluttered) but also have the chance of 
//   being disconnected.
//----------------------------------------------------------------------

/* Function to destroy any existing network */
function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

/* Driver function to draw a random graph of size n */
function drawRandom() {
    destroy();
    var nodeCount = 15;

    var container = document.getElementById('myGraph');

    var data = getRandomNetwork(nodeCount);

    var options = {
        physics: {
            stabilization: false 
        },
    }

    network = new vis.Network(container, data, options);
}

/* Helper function that returns a data object used in vis.Network(container, data, options).
 * The object consists of nodes and edges, where there are n nodes, and a random amount of edges
 */
function getRandomNetwork(numberNodes) {
    nodesArray = new vis.DataSet([]);
    edgesArray = new vis.DataSet([]);
    let probability = 0.13;

    // make n nodes
    for (let i = 0; i < numberNodes; i++) {
        nodesArray.add({id: i, label: "Node " + i});
    }

    // populate edges
    for (let i = 0; i < numberNodes; i++) {
        for (let j = 0; j < numberNodes; j++) {
            if (Math.random() < probability) {
                if (i !== j && i < j && edgesArray.get(i + "-" + j) === null) {
                    edgesArray.add({id: i + "-" + j, from: i, to: j, label: "" + Math.ceil(Math.random() * numberNodes),});
                }
                else if (i !== j && j < i && edgesArray.get(j + "-" + i) === null) {
                    edgesArray.add({id: j + "-" + i, from: j, to: i, label: "" + Math.ceil(Math.random() * numberNodes),});
                }
            }
        }
    }

    nodes = nodesArray;
    edges = edgesArray;

    return { edges: edgesArray, nodes, nodesArray };
}