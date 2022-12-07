function Astar(startNode, endNode) {
  let openSet = [],
    closedSet = [],
    path = [];
  let visitedNodes = [];
  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      //   console.log(path);
      return { path, visitedNodes };
      //   console.log("Done!");
    }

    openSet = openSet.filter((elt) => elt !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  }
  return { path, visitedNodes, error: "No path found" };
}

function heuristic(a, b) {
  // BFS
  // let d = 1;

  // Manhattan distance
  // let d = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  // Eucledian distance
  let d = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
  return d;
}

export default Astar;
