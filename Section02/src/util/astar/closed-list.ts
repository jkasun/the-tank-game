import { Node } from './node';

export class ClosedList {
    private list: any = {};

    add(x, y, node: Node) {
        if (!this.list[x]) {
            this.list[x] = {};
        }

        this.list[x][y] = node;
    }

    get(x, y): Node {
        if (!this.list[x]) {
            return null;
        }

        const node = this.list[x][y];

        if (node) {
            return node;
        }

        return null;
    }
}