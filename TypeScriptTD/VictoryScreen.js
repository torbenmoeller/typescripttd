var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var VictoryScreen = (function (_super) {
        __extends(VictoryScreen, _super);
        function VictoryScreen() {
            _super.apply(this, arguments);
        }
        VictoryScreen.prototype.preload = function () {
            this.game.load.image("highscore", "assets/Textures/Backgrounds/4-highscores.jpg");
        };

        VictoryScreen.prototype.create = function () {
            this.game.add.image(0, 0, "highscore");
            var style = { font: "25px Impact", fill: "#ffffff", align: "center" };

            var vic = this.game.add.text(this.game.width / 2, this.game.height / 4, "You Are Victorious", style);
            vic.anchor.set(0.5, 0.5);
        };

        VictoryScreen.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        VictoryScreen.prototype.onClick = function () {
            this.game.state.start('MainMenuScreen');
        };
        return VictoryScreen;
    })(Phaser.State);
    TypeScriptTD.VictoryScreen = VictoryScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
