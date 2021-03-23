#include <queue>
#include <tuple>
#include <set>
#include <math>
#include <iostream>
#include <stack>
#include <vector>

typedef std::pair<int, int> Pair;
typedef std::tuple<double, int, int> Tuple;

struct node
{
	Pair parent;

	double f, g, h;
	cell()
		: parent(-1, -1)
		, f(-1)
		, g(-1)
		, h(-1)
	{}
};

template<size_t ROW, size_t COL>
bool isValid(const int[ROW][COL] grid, const Pair& node)
{
	if (ROW > 0 && COL > 0)
		return (node.first >= 0) && (node.first < ROW)
			&& (node.second >= 0) && (node.second < COL)
	return false;
}

template <size_t ROW, size_t COL>
bool isUnblocked(const int[ROW][COL] grid, const Pair& node)
{
	return isValid(grid, node) && grid[node.first][node.second] == 1;
}

bool isDestination(const Pair& node, const Pair& dest)
{
	return node == dest;
}

double calcHValue(const Pair& src, const Pair& dest)
{
	return std::sqrt(std::pow(src.first - dest.first), 2) + 
		std::pow(src.second - dest.second), 2));
}

template <size_t ROW, size_t COL>
void tracePath(
    const int[ROW][COL] cellDetails,
    const Pair& dest)
{
    printf("\nThe Path is ");

    stack<Pair> Path;

    int row = dest.second;
    int col = dest.second;
    Pair next_node = cellDetails[row][col].parent;
    do {
        Path.push(next_node);
        next_node = cellDetails[row][col].parent;
        row = next_node.first;
        col = next_node.second;
    } while (cellDetails[row][col].parent != next_node);

    Path.emplace(row, col);
    while (!Path.empty()) {
        Pair p = Path.top();
        Path.pop();
        printf("-> (%d,%d) ", p.first, p.second);
    }
}

template <size_t ROW, size_t COL>
void aStarSearch(const int[ROW][COL] grid, const Pair& src, const Pair& dest)
{
    // If the source is out of range
    if (!isValid(grid, src)) {
        printf("Source is invalid\n");
        return;
    }

    // If the destination is out of range
    if (!isValid(grid, dest)) {
        printf("Destination is invalid\n");
        return;
    }

    // Either the source or the destination is blocked
    if (!isUnBlocked(grid, src)
        || !isUnBlocked(grid, dest)) {
        printf("Source or the destination is blocked\n");
        return;
    }

    // If the destination cell is the same as source cell
    if (isDestination(src, dest)) {
        printf("We are already at the destination\n");
        return;
    }

    bool closedList[ROW][COL];
    std::memset(closedList, false, sizeof(closedList));

    int cellDetails[ROW][COL];

    int i, j;
    i = src.first;
    j = src.second;
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent = { i, j };

    std::priority_queue<Tuple, std::vector<Tuple>, std::greater<Tuple>> openList;
    openList.emplace(0.0, i, j);

    while (!openList.empty())
    {
        const Tuple& p = openList.top();

        i = get<1>(p);
        j = get<2>(p);

        openList.pop();
        closedList[i][j] = true;

        for (int add_x = -1; add_x <= 1; add_x++) {
            for (int add_y = -1; add_y <= 1; add_y++) {
                Pair neighbour(i + add_x, j + add_y);
                // Only process this cell if this is a valid
                // one
                if (isValid(grid, neighbour)) {
                    // If the destination cell is the same
                    // as the current successor
                    if (isDestination(
                        neighbour,
                        dest)) { // Set the Parent of
                                 // the destination cell
                        cellDetails[neighbour.first]
                            [neighbour.second]
                        .parent
                            = { i, j };
                        printf("The destination cell is "
                            "found\n");
                        tracePath(cellDetails, dest);
                        return;
                    }
                    // If the successor is already on the
                    // closed list or if it is blocked, then
                    // ignore it.  Else do the following
                    else if (!closedList[neighbour.first]
                        [neighbour.second]
                    && isUnBlocked(grid,
                        neighbour)) {
                        double gNew, hNew, fNew;
                        gNew = cellDetails[i][j].g + 1.0;
                        hNew = calculateHValue(neighbour,
                            dest);
                        fNew = gNew + hNew;

                        // If it isn’t on the open list, add
                        // it to the open list. Make the
                        // current square the parent of this
                        // square. Record the f, g, and h
                        // costs of the square cell
                        //             OR
                        // If it is on the open list
                        // already, check to see if this
                        // path to that square is better,
                        // using 'f' cost as the measure.
                        if (cellDetails[neighbour.first]
                            [neighbour.second]
                        .f
                            == -1
                            || cellDetails[neighbour.first]
                            [neighbour.second]
                        .f
                                   > fNew) {
                            openList.emplace(
                                fNew, neighbour.first,
                                neighbour.second);

                            // Update the details of this
                            // cell
                            cellDetails[neighbour.first]
                                [neighbour.second]
                            .g
                                = gNew;
                            cellDetails[neighbour.first]
                                [neighbour.second]
                            .h
                                = hNew;
                            cellDetails[neighbour.first]
                                [neighbour.second]
                            .f
                                = fNew;
                            cellDetails[neighbour.first]
                                [neighbour.second]
                            .parent
                                = { i, j };
                        }
                    }
                }
            }
        }
    }
}

int main()
{
    /* Description of the Grid-
    1--> The cell is not blocked
    0--> The cell is blocked */
    int grid = {
        { { { 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 } },
          { { 1, 1, 1, 0, 1, 1, 1, 0, 1, 1 } },
          { { 1, 1, 1, 0, 1, 1, 0, 1, 0, 1 } },
          { { 0, 0, 1, 0, 1, 0, 0, 0, 0, 1 } },
          { { 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 } },
          { { 1, 0, 1, 1, 1, 1, 0, 1, 0, 0 } },
          { { 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 } },
          { { 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 } },
          { { 1, 1, 1, 0, 0, 0, 1, 0, 0, 1 } } }
    };

    // Source is the left-most bottom-most corner
    Pair src(8, 0);

    // Destination is the left-most top-most corner
    Pair dest(0, 0);

    aStarSearch(grid, src, dest);

    return 0;
}

