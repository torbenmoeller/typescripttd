﻿var TypeScriptTD;
(function (TypeScriptTD) {
    var TowerButton = (function () {
        function TowerButton(game, position, towerId) {
            this.TowerId = towerId;
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, "HUD-" + towerId);

            image.width = 35;
            image.height = 35;

            this.sizeX = image.width;
            this.sizeY = image.height;
            image.inputEnabled = true;
        }
        TowerButton.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.sizeX;
            var boolY = y > this.Position.y && y < this.Position.y + this.sizeY;
            return (boolX && boolY);
        };
        return TowerButton;
    })();
    TypeScriptTD.TowerButton = TowerButton;
})(TypeScriptTD || (TypeScriptTD = {}));
