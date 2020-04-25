var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen2 = (function (_super) {
        __extends(HelpScreen2, _super);
        function HelpScreen2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HelpScreen2.prototype.preload = function () {
            this.game.load.image("Help2", "assets/Textures/HelpScreens/Help2.jpg");
        };
        HelpScreen2.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help2");
            image.width = this.game.width;
            image.height = this.game.height;
        };
        HelpScreen2.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen2.prototype.onClick = function () {
            this.game.state.start('HelpScreen3');
        };
        return HelpScreen2;
    }(Phaser.State));
    TypeScriptTD.HelpScreen2 = HelpScreen2;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=HelpScreen2.js.map