var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen3 = (function (_super) {
        __extends(HelpScreen3, _super);
        function HelpScreen3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpScreen3.prototype.preload = function () {
            this.game.load.image("Help3", "assets/Textures/HelpScreens/Help3.jpg");
        };
        HelpScreen3.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help3");
            image.width = this.game.width;
            image.height = this.game.height;
        };
        HelpScreen3.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen3.prototype.onClick = function () {
            this.game.state.start('HelpScreen4');
        };
        return HelpScreen3;
    }(Phaser.State));
    TypeScriptTD.HelpScreen3 = HelpScreen3;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=HelpScreen3.js.map