import { Node } from './node';
import * as _ from 'lodash';

export class OpenList {
    private map: any = {};
    private list: Node[] = [];

    add(node: Node) {
        const x = node.position.x;
        const y = node.position.y;

        this.list.push(node);

        if (!this.map[x]) {
            this.map[x] = [];
        }

        this.map[x][y] = node;
    }

    get(x, y) {
        if (!this.map[x]) {
            return null;
        }

        const node = this.map[x][y];

        if (node) {
            return node;
        }

        return null;
    }

    getMin() {
        return _.minBy(this.list, 'f');
    }

    remove(node: Node) {
        const x = node.position.x;
        const y = node.position.y;

        this.map[x][y] = undefined;

        _.remove(this.list, node);
    }

    isEmpty() {
        return this.list.length === 0;
    }
}