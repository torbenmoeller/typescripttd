﻿module TypeScriptTD {


    export class HelpScreen4 extends Phaser.State {

        preload() {
            this.game.load.image("Help4", "assets/Textures/HelpScreens/Help4.jpg");
        }

        create() {
            var image: Phaser.Image = this.game.add.image(0, 0, "Help4");
            image.width = this.game.width;
            image.height = this.game.height;
        }

        update() {
            this.game.input.onDown.add(this.onClick, this);
        }
        onClick() {
            this.game.state.start('MainMenuScreen');

        }

    }
}



