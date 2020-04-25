var TypeScriptTD;
(function (TypeScriptTD) {
    var Button = (function () {
        function Button(game, position, pic) {
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, pic);
            this.Sprite = image;
            image.width = 35;
            image.height = 35;
            this.sizeX = image.width;
            this.sizeY = image.height;
            image.inputEnabled = true;
        }
        Button.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.sizeX;
            var boolY = y > this.Position.y && y < this.Position.y + this.sizeY;
            return (boolX && boolY);
        };
        return Button;
    }());
    TypeScriptTD.Button = Button;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=Button.js.map