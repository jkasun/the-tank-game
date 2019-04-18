document.onkeyup = (event) => {
    if (event.key === 'w') {
        moveUp();
    }

    if (event.key === 's') {
        moveDown();
    }

    if (event.key === 'd') {
        moveRight();
    }

    if (event.key === 'a') {
        moveLeft();
    }
}