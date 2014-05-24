var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var DefeatScreen = (function (_super) {
        __extends(DefeatScreen, _super);
        function DefeatScreen() {
            _super.apply(this, arguments);
        }
        DefeatScreen.prototype.preload = function () {
            this.game.load.image("loading", "assets/Textures/Backgrounds/3-loading.jpg");
        };

        DefeatScreen.prototype.create = function () {
            this.game.add.image(0, 0, "loading");
            var style = { font: "25px Impact", fill: "#ffffff", align: "center" };

            var vic = this.game.add.text(this.game.width / 2, this.game.height / 4, "You Have Been Defeated", style);
            vic.anchor.set(0.5, 0.5);
        };

        DefeatScreen.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        DefeatScreen.prototype.onClick = function () {
            this.game.state.start('MainMenuScreen');
        };
        return DefeatScreen;
    })(Phaser.State);
    TypeScriptTD.DefeatScreen = DefeatScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
