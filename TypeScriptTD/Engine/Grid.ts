module TypeScriptTD {


    export class Grid {

        Position: Vector2;

        public Columns: number;
        public Rows: number;
        public CellsArray: Cell[] = [];

        public cellSize: number = 35;

        constructor(cellsX: number, cellsY: number) {
            this.Columns = cellsX;
            this.Rows = cellsY;
            this.Position = new Vector2(67, 47);

            for (var i: number = 0; i < cellsX; i++) {
                for (var j: number = 0; j < cellsY; j++) {
                    this.CellsArray[cellsX * j + i] = new Cell(i, j);
                }
            }
        }

        getCell(x: number, y: number) {
            return this.CellsArray[this.Columns * y + x];
        }

        draw(game: Phaser.Game) {
            for (var i: number = 0; i < this.Columns; i++) {
                for (var j: number = 0; j < this.Rows; j++) {
                    var g = game.add.graphics(0, 0);
                    g.lineStyle(2, 0x000000, 1);
                    g.drawRect(this.Position.x + i * this.cellSize,
                        this.Position.y + j * this.cellSize,
                        this.cellSize,
                        this.cellSize);

                }
            }
        }


        getCellCoordinate(cellX: number, cellY: number) {
            var x = this.Position.x + cellX * this.cellSize;
            var y = this.Position.y + cellY * this.cellSize;
            var v: Vector2 = new Vector2(x, y);
            return v;
        }

        getCellCenter(cellX: number, cellY: number) {
            var x = this.Position.x + cellX * this.cellSize + this.cellSize / 2;
            var y = this.Position.y + cellY * this.cellSize + this.cellSize / 2;
            var v: Vector2 = new Vector2(x, y);
            return v;
        }


        getCellAtPixel(pixelPosition: Vector2) {
            var pos: Vector2 = pixelPosition.subtract(this.Position);
            var x: number = Math.floor(pos.x / this.cellSize);
            var y: number = Math.floor(pos.y / this.cellSize);
            return this.getCell(x, y);

        }


        public wasClicked(x: number, y: number) {
            var boolX: boolean = x > this.Position.x && x < this.Position.x + this.Columns * this.cellSize;
            var boolY: boolean = y > this.Position.y && y < this.Position.y + this.Rows * this.cellSize;
            return (boolX && boolY);
        }

    }
}



