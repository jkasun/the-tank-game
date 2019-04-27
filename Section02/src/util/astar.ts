import { Pos } from "../core/position";
import * as _ from 'lodash';

class Node {
    // calculated distance form the start node
    f: number;
    g: number;
    h: number;

    parent: Node;

    constructor(public position: Pos) {
    }

    equals(node: Node): boolean {
        return this.position.x == node.position.x
            && this.position.y === node.position.y;
    }

    // heuristic value
    setH(endNode: Node) {
        this.h = Math.pow(this.position.x - endNode.position.x, 2)
            + Math.pow(this.position.y - endNode.position.y, 2)
    }
}

export const findPath = (matrix, start, goal): any => {
    const openList: Node[] = [];
    const closedList: Node[] = [];

    const width = matrix.length;
    const height = matrix[0].length;

    const startNode = new Node({
        x: start[0],
        y: start[1]
    });

    startNode.f = 0;
    startNode.g = 0;

    const endNode = new Node({
        x: goal[0],
        y: goal[1]
    });

    openList.push(startNode);

    while (openList.length > 0) {
        const q: Node = _.minBy(openList, 'f');

        const x = q.position.x;
        const y = q.position.y;

        const successors: Node[] = [];

        if (x - 1 >= 0 && matrix[x - 1][y] === 0) {
            const upNode = new Node({ x: x - 1, y: y });
            successors.push(upNode);
        }

        if (x + 1 < width && matrix[x + 1][y] === 0) {
            const downNode = new Node({ x: x + 1, y: y });
            successors.push(downNode);
        }

        if (y - 1 >= 0 && matrix[x][y + 1] === 0) {
            const rightNode = new Node({ x: x, y: y + 1 });
            successors.push(rightNode);
        }

        if (y + 1 < height && matrix[x][y - 1] === 0) {
            const leftNode = new Node({ x: x, y: y - 1 });
            successors.push(leftNode);
        }

        for (let successor of successors) {
            if (successor.equals(endNode)) {
                console.log('We have found the last node');

                const path = [];
                let n = q;

                while (n.parent) {
                    path.push([n.position.x, n.position.y]);
                    n = n.parent;
                }

                return _.reverse(path);
            }

            successor.parent = q;
            successor.g = q.g + 1;
            successor.setH(endNode);
            successor.f = successor.g + successor.h;

            let oldSuccessor: Node = _.find(openList, (node) => {
                return successor.equals(node);
            });

            if (oldSuccessor && oldSuccessor.f < successor.f) {
                continue;
            }

            oldSuccessor = _.find(closedList, (node) => {
                return successor.equals(node);
            });

            if (oldSuccessor && oldSuccessor.f < successor.f) {
                continue;
            }

            openList.push(successor);
        }

        _.remove(openList, q);
        closedList.push(q);
    }

    return [];
}