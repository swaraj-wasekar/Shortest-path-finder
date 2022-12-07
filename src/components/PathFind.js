import { useEffect, useState } from "react";
import Node from "./Node";
import "./PathFind.css";
import Astar from "../algorithms/Astar";

const rows = 40,
  cols = 20;

const NODE_START_ROW = Math.floor(rows * Math.random()),
  NODE_START_COL = Math.floor(cols * Math.random()),
  NODE_END_ROW = Math.floor(rows * Math.random()) - 1,
  NODE_END_COL = Math.floor(cols * Math.random()) - 1;

const PathFind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    intializeGrid();
  }, []);

  // CREATES THE GRID
  const intializeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);
    setGrid(grid);
    addNeighbours(grid);
    const startNode = grid[NODE_START_ROW][NODE_START_COL],
      endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  // CREATES THE SPOT
  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  //Add Neighbours
  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };

  // SPOT CONSTRUCTOR
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.isWall = false;
    if (Math.random(1) < 0.3) {
      if (this.isStart === false && this.isEnd === false) this.isWall = true;
    }
    this.previous = undefined;
    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  //GRID WITH NODE
  const gridwithNode = (
    <div className="rowWrapper">
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizePath = () => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 100 * i);
      } else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 100 * i);
      }
    }
  };

  return (
    <div className="Wrapper">
      <button onClick={visualizePath}>Visualize Path</button>
      <h1>PathFind Component</h1>
      {gridwithNode}
    </div>
  );
};

export default PathFind;
