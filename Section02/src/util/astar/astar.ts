import * as _ from 'lodash';
import { Node } from './node';
import { ClosedList } from './closed-list';
import { OpenList } from './open-list';

export const findPath = (matrix, start, goal): any => {
    const openList = new OpenList();
    const closedList = new ClosedList();

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

    openList.add(startNode);

    while (!openList.isEmpty()) {
        const q: Node = openList.getMin();

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
            // Return path if successor is the goal node
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

            let oldSuccessor: Node = openList.get(successor.position.x, successor.position.y);

            if (oldSuccessor && oldSuccessor.f < successor.f) {
                continue;
            }

            oldSuccessor = closedList.get(successor.position.x, successor.position.y);

            if (oldSuccessor && oldSuccessor.f < successor.f) {
                continue;
            }

            openList.add(successor);
        }

        openList.remove(q);
        closedList.add(q.position.x, q.position.y, q);
    }

    return [];
}