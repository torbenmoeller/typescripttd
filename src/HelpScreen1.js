var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen1 = (function (_super) {
        __extends(HelpScreen1, _super);
        function HelpScreen1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpScreen1.prototype.preload = function () {
            this.game.load.image("Help1", "assets/Textures/HelpScreens/Help1.jpg");
        };
        HelpScreen1.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help1");
            image.width = this.game.width;
            image.height = this.game.height;
        };
        HelpScreen1.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen1.prototype.onClick = function () {
            this.game.state.start('HelpScreen2');
        };
        return HelpScreen1;
    }(Phaser.State));
    TypeScriptTD.HelpScreen1 = HelpScreen1;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=HelpScreen1.js.map