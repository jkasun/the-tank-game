import { Pos } from "../../core/position";

export class Node {
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