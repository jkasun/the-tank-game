import * as AStar from './util/astar/main';

let matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0]
];

console.log(matrix[4][5]);

const grid = new AStar.Grid(matrix);
let startPos = [0, 0];
let goalPos = [7, 7];

const path = new AStar.AStarFinder(grid, false).findPath(startPos, goalPos);
console.log(path);