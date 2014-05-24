var TypeScriptTD;
(function (TypeScriptTD) {
    var Grid = (function () {
        function Grid(cellsX, cellsY) {
            this.CellsArray = [];
            this.cellSize = 35;
            this.Columns = cellsX;
            this.Rows = cellsY;
            this.Position = new TypeScriptTD.Vector2(67, 47);

            for (var i = 0; i < cellsX; i++) {
                for (var j = 0; j < cellsY; j++) {
                    this.CellsArray[cellsX * j + i] = new TypeScriptTD.Cell(i, j);
                }
            }
        }
        Grid.prototype.getCell = function (x, y) {
            return this.CellsArray[this.Columns * y + x];
        };

        Grid.prototype.draw = function (game) {
            for (var i = 0; i < this.Columns; i++) {
                for (var j = 0; j < this.Rows; j++) {
                    var g = game.add.graphics(0, 0);
                    g.lineStyle(2, 0x000000, 1);
                    g.drawRect(this.Position.x + i * this.cellSize, this.Position.y + j * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        };

        Grid.prototype.getCellCoordinate = function (cellX, cellY) {
            var x = this.Position.x + cellX * this.cellSize;
            var y = this.Position.y + cellY * this.cellSize;
            var v = new TypeScriptTD.Vector2(x, y);
            return v;
        };

        Grid.prototype.getCellCenter = function (cellX, cellY) {
            var x = this.Position.x + cellX * this.cellSize + this.cellSize / 2;
            var y = this.Position.y + cellY * this.cellSize + this.cellSize / 2;
            var v = new TypeScriptTD.Vector2(x, y);
            return v;
        };

        Grid.prototype.getCellAtPixel = function (pixelPosition) {
            var pos = pixelPosition.subtract(this.Position);
            var x = Math.floor(pos.x / this.cellSize);
            var y = Math.floor(pos.y / this.cellSize);
            return this.getCell(x, y);
        };

        Grid.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.Columns * this.cellSize;
            var boolY = y > this.Position.y && y < this.Position.y + this.Rows * this.cellSize;
            return (boolX && boolY);
        };
        return Grid;
    })();
    TypeScriptTD.Grid = Grid;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=Grid.js.map
