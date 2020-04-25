var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen4 = (function (_super) {
        __extends(HelpScreen4, _super);
        function HelpScreen4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpScreen4.prototype.preload = function () {
            this.game.load.image("Help4", "assets/Textures/HelpScreens/Help4.jpg");
        };
        HelpScreen4.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help4");
            image.width = this.game.width;
            image.height = this.game.height;
        };
        HelpScreen4.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen4.prototype.onClick = function () {
            this.game.state.start('MainMenuScreen');
        };
        return HelpScreen4;
    }(Phaser.State));
    TypeScriptTD.HelpScreen4 = HelpScreen4;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=HelpScreen4.js.map