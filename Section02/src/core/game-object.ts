import { Game } from "./game";

/*
A game is a collection of game objects,

GameObject should only handle visual rendering (do not handle
things like collision here)
*/
export abstract class GameObject {
    constructor(public game: Game) {

    }

    abstract render();
    
    onCollision(x, y, gameObject: GameObject) {

    }
}