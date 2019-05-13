import { Game } from "./game";

/*
A game is a collection of game objects,

GameObject should only handle visual rendering (do not handle
things like collision here)
*/
export abstract class GameObject {
    private events: any[] = [];

    constructor(public game: Game) {

    }

    addEvent(event: Function, timeout: number) {
        let e = setInterval(() => {
            if (event) {
                event();
            }
        }, timeout);

        this.events.push(e);
        return e;
    }

    stopEvents() {
        for(let e of this.events) {
            if (e) {
                clearInterval(e);
            }
        }
    }

    // drawing game object should implement here
    beforeRender() {
    }

    abstract onRender();

    afterRender() {
    }

    beforeInit() {
    }

    // on init
    onInit() {
    }

    afterInit() {
    }

    onCollision(x, y, gameObject: GameObject) {
    }
}