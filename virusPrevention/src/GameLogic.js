
function removeZombies() {
    if (gameState.enemies.length > 0) {
        for (let i = 0; i < gameState.enemies.length;
            i++) {
            if (gameState.enemies[i].ignoreDestroy == true) {
                gameState.enemies[i].input.enabled = false;
                gameState.enemies[i].setVisible(false);
                gameState.enemies.splice(i, 1);
            }
        }
    }

    if (gameState.boss.length > 0) {
        for (let i = 0; i < gameState.boss.length; i++) {
            if (gameState.boss[i].isAlive() == false) {
                gameState.boss[i].kill();
                gameState.boss.splice(i, 1);
            }
        }
    }
}

function randomPositionX(sprite) {
    let gameWidth = this.sys.game.config.width; //gameScene.sys.game.config.width;
    let min = sprite.displayWidth / 2;
    return (min + Math.floor((gameWidth - 80) * Math.random()));
}

/*************************************************
 * CHANGE IMAGE SIZE
 * Purpose: Get the minimun and the maximun value
 *   for the Image and change it's size between
 *   the given value
 **************************************************/
function changeImgSize(sprite, min, max) {
    let check = 1; // Value that will scale the image
    let width = sprite.width;

    while (width < min) {
        width *= check;

        if (width < min) {
            check += 0.1;
        }

        else {
            sprite.setScale(check, check);
            return;
        }
    }


    while (width > max) {
        width *= check;

        if (width > max) {
            check -= 0.1;
        }

        else if (width < max) {
            sprite.setScale(check, check);
            sprite.width *= check;
            sprite.hight *= check;
            return;
        }
    }
}

function bottomRight(sprite, marge) {
    let gameWidth = this.sys.game.config.width;//gameScene.sys.game.config.width;
    let gameHeight = /*gameScene*/this.sys.game.config.height;
    let x = gameWidth - sprite.displayWidth / 2 - marge;
    let y = gameHeight - sprite.displayHeight / 2;
    sprite.setPosition(x, y);
}

function bottomLeft(sprite, marge) {
    let gameHeight = /*gameScene*/this.sys.game.config.height;
    let x = 0 + sprite.displayWidth / 2 + marge;
    let y = gameHeight - sprite.displayHeight / 2;
    sprite.setPosition(x, y);
}
