var TypeScriptTD;
(function (TypeScriptTD) {
    var Cell = (function () {
        function Cell(x, y) {
            this.X = x;
            this.Y = y;
            this.buildable = true;
        }
        Cell.prototype.setTower = function (towerInstance) {
            this.towerInstance = towerInstance;
            this.buildable = false;
        };
        return Cell;
    }());
    TypeScriptTD.Cell = Cell;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=Cell.js.map