/* Priority queue implementation from: https://www.geeksforgeeks.org/implementation-priority-queue-javascript/ 
*/

//----------------------------------------------------------------------
// Name: Alan Poblette
// File: astar.js
// Date: Spring 2021
// Desc: A collection of back-end functions to accomplish A* pathfinding
//   with vis.js as the front-end.
//----------------------------------------------------------------------

// class to store element and its priority
class QElement {
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}
  
// PriorityQueue class for a* search
class PriorityQueue {
  
    // An array is used to implement priority
    constructor() {
        this.items = [];
    }
  
    enqueue(element, priority) {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    front() {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    contains(element) {
        // return true if the queue contains element
        let contains = false;

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element === element) {
                contains = true;
            }
        }

        return contains;
    }
}

/* Function that runs a* search from the start/end nodes */
async function astar() {
    recolorNetwork();
    
    let start = startNode;
    let end = destinationNode;

    // shouldn't be possible the way I programmed it, so just exit.
    if (startNode == destinationNode) {
        console.log("Select proper start and end nodes");
        return;
    }

    // distance and parent maps
    let dist = new Map();
    let parent = new Map();

    // functions.
    // f = g + h where g is the cost to the node
    // h is the heuristic (manhattan distance in our case).
    let f = [];
    let g = [];
    let h = [];
    
    // visited array
    let visited = [];

    // initialize arrays

    // extra check because the default graph is not 0-indexed so we need to make more slots in our arrays than usual
    if (document.getElementById('dropdownLabel').innerHTML === '' || document.getElementById('dropdownLabel').innerHTML === "Selected Graph: Default Graph") {
        for (let i = 0; i <= nodes.length; i++) {
            dist.set(i, Infinity);
            parent.set(i, -1);
            f.push(Infinity);
            g.push(Infinity);
            h.push(Infinity);
            visited.push(false);
        }
    }
    else {
        for (let i = 0; i < nodes.length; i++) {
            dist.set(i, Infinity);
            parent.set(i, -1);
            f.push(Infinity);
            g.push(Infinity);
            h.push(Infinity);
            visited.push(false);
        }
    }

    // initialize starting point to '0'
    dist[start] = 0;
    parent[start] = -1;
    f[start] = 0;
    g[start] = 0;
    h[start] = 0;
    visited[start] = true;

    // start open list, initialize with start
    // the format for each entry is [node, f()].
    let openList = new PriorityQueue();
    openList.enqueue(start, 0);


    while (!openList.isEmpty()) {
        // pop next node off priorityQueue
        let topNode = openList.dequeue();
        let topNodeId = topNode.element;

        // visualize which node we are one
        nodes.update([{id: topNodeId, color: { border: 'red'}}]);

        // if we found the end, return the reconstructed path
        if (topNodeId === end) {
            // devisualize which node we are on
            nodes.update([{id: topNodeId, color: { border: '#2B7CE9'}}]);
            
            animatePath(reconstructPath(parent, topNodeId));
            break;
        }

        // get neighbors:
        let neighbors = network.getConnectedNodes(topNodeId);

        // visit the neighbors
        for (let adjNode of neighbors) {
            let tmp_g_score = g[topNodeId] + calc_w(topNodeId, adjNode);
            
            // need to animate the edge color change
            await animateEdgeColorVisited(topNodeId, adjNode, visited);

            if (tmp_g_score < g[adjNode]) {
                // This path to neighbor is better than any previous one
                parent[adjNode] = topNodeId;
                g[adjNode] = tmp_g_score;
                h[adjNode] = calc_h(adjNode, end);

                // calculate new f()
                f[adjNode] = g[adjNode] + h[adjNode];

                // insert adjNode into priority queue
                if (!openList.contains(adjNode)) {
                    openList.enqueue(adjNode, f[adjNode]);
                    visited[adjNode] = true;
                    
                    // change color to blue
                    if (adjNode !== startNode && adjNode !== destinationNode) {
                        nodes.update([{id: adjNode, color: { background: 'blue', }}]);
                    }
                }
            }
        }

        // devisualize which node we are on
        nodes.update([{id: topNodeId, color: { border: '#2B7CE9'}}]);
    }
}

/* Function to calculate the edge weight from curr to adj */
function calc_w(curr, adj) {
    
    if (curr < adj) {
        return parseInt(edges.get(curr+'-'+adj).label);
    }
    else {
        return parseInt(edges.get(adj+'-'+curr).label);
    }
}

/* Calculates the manhattan distance for our heuristic */
function calc_h(currNodeId) {
    let curr = network.getPosition(currNodeId);
    let end = network.getPosition(destinationNode);

    return (Math.abs(curr.x - end.x) + Math.abs(curr.y - end.y));
}

/* Function to change the color of the edge between curr and adj as visited (aka RED)*/
async function animateEdgeColorVisited(curr, adj, visited) {

    // needed to get proper edge id for the edge
    let edgeIdString = null;

    if (curr < adj) {
        edgeIdString = curr+"-"+adj;
    }
    else {
        edgeIdString = adj+"-"+curr;
    }
    
    // turn edge color red
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'red'}}]);
    
    // mark adj node as visited (unless end/start)
    if (adj !== destinationNode && adj !== startNode) {
        nodes.update([{id: adj, color: { background: 'grey', }}]);
    }

    // wait a few seconds and turn off color
    await sleep(5000*(algoSpeed/100));
    
    if (visited[adj]) {
        // change color back to blue
        if (adj !== startNode && adj !== destinationNode) {
            nodes.update([{id: adj, color: { background: 'blue', }}]);
        }
    }
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'white'}}]);
}

/* Function to change the color of the edge between curr and adj as shortest path (aka GREEN) */
function animateEdgeColorFinal(curr, adj) {
    // needed to get proper edge id for the edge
    let edgeIdString = null;

    if (curr < adj) {
        edgeIdString = curr+"-"+adj;
    }
    else {
        edgeIdString = adj+"-"+curr;
    }
    
    edges.update([{id: edgeIdString, background: {enabled: true, color: 'lime'}}]);
}

/* Function to rebuild the path using parent mappings */
function reconstructPath(parent, current) {
    let total_path = [current];
    while (current > -1) {
        current = parent[current];
        total_path.unshift(current);
    }

    return total_path;
}

/* Function to color the final path after finding the shortest path */
function animatePath(shortestPath) {
    for (let i = 1; i < shortestPath.length - 1; i++) {
        animateEdgeColorFinal(shortestPath[i], shortestPath[i+1]);
    }
}

/* Basic sleep utility function */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Function to reset the colors of the network at the beginning of every round of astar() */
function recolorNetwork() {
    // reset colors to visjs blue
    let nodeIds = nodes.getIds();
    for (let i = 0; i < nodeIds.length; i++) {
        nodes.update([{ id: nodeIds[i], color: { background: '#97c2fc' } }]);
    }

    // reset edge colors
    let edgeIds = edges.getIds();
    for (let i = 0; i < edgeIds.length; i++) {
        edges.update([{id: edgeIds[i], background: {enabled: true, color: 'white'}}]);
    }

    // recolor start/end
    if (startNode) {
        nodes.update([{ id: startNode, color: { background: "aquamarine" } }]);
    }
    if (destinationNode) {
        nodes.update([{ id: destinationNode, color: { background: "orange" } }]);
    }
}