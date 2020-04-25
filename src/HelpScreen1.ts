module TypeScriptTD {


    export class HelpScreen1 extends Phaser.State {

        preload() {
            this.game.load.image("Help1", "assets/Textures/HelpScreens/Help1.jpg");
        }

        create() {
            var image: Phaser.Image = this.game.add.image(0, 0, "Help1");
            image.width = this.game.width;
            image.height = this.game.height;
        }

        update() {
            this.game.input.onDown.add(this.onClick, this);
        }
        onClick() {
            this.game.state.start('HelpScreen2');

        }

    }
}



