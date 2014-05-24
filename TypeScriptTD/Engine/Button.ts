module TypeScriptTD {


    export class Button {

        public Position: Vector2;
        public Sprite: Phaser.Sprite;
        sizeX: number;
        sizeY: number;



        constructor(game: Phaser.Game, position: Vector2, pic: string) {
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, pic);
            this.Sprite = image;

            image.width = 35;
            image.height = 35;

            this.sizeX = image.width;
            this.sizeY = image.height;
            image.inputEnabled = true;
        }

        public wasClicked(x: number, y: number) {
            var boolX: boolean = x > this.Position.x && x < this.Position.x + this.sizeX;
            var boolY: boolean = y > this.Position.y && y < this.Position.y + this.sizeY;
            return (boolX && boolY);
        }


    }
}



