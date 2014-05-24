module TypeScriptTD {


    export class TowerButton {

        public TowerId: string;
        public Position: Vector2;
        sizeX: number;
        sizeY: number;



        constructor(game: Phaser.Game, position: Vector2, towerId: string) {
            this.TowerId = towerId;
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, "HUD-" + towerId);
            
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



