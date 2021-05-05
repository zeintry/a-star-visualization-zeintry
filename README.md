# A-star-visualization-zeintry
For a semester project I decided to implement A* (A star) search and visualize it through javascript and HTML/CSS for hosting on my website. I did most of my work in a seperate organizational repository but I moved all the files here so that I could make it public and host the site on github-pages.
# A* Pathfinding Explained
A* pathfinding was developed as a sort of extension to Dijkstra's algorithm. The main point of the algorithm is that it uses a heuristic function, H(x), to achieve a "smart" traversal of the graph. The idea is to use the heuristic function to augment Dijkstra's algorithm such that the nodes we look at first during the traversal are in some way closer to the destination than other nodes. This will mean that the algorithm will take a more direct route to the end. 
There are many heuristic functions that could be used but for my implementation I simply used the manhattan distance of a node to the end node. 
# Directions
The visualization is easy to use, you simply select a start and end node, and then press the run button! The algorithm will visualize which nodes have been visited as it hones in on it's desired target.

## Options
To make things more interesting, I decided to add in random graph generation to the visualizer on top of a grid graph, and the default graph I supplied. The different graphs can be selected from the dropdown menu.

You can also control the speed of the animation using the slider provided.
