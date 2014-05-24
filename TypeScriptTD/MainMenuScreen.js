var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var MainMenuScreen = (function (_super) {
        __extends(MainMenuScreen, _super);
        function MainMenuScreen() {
            _super.apply(this, arguments);
        }
        MainMenuScreen.prototype.preload = function () {
            this.game.load.spritesheet('button', 'assets/button.png', 193, 71);

            this.game.load.image('background', 'assets/Textures/Backgrounds/1-main.jpg');
        };

        MainMenuScreen.prototype.create = function () {
            this.game.add.sprite(0, 0, 'background');

            var style = { font: "25px Impact", fill: "#ffffff", align: "center" };

            this.playbutton = this.game.add.button(540, 144, 'button', this.playClick, this);
            this.playbutton.anchor.set(0.5, 0.5);
            this.helpbutton = this.game.add.button(540, 288, 'button', this.helpClick, this);
            this.helpbutton.anchor.set(0.5, 0.5);

            this.txtPlay = this.game.add.text(this.playbutton.x, this.playbutton.y, "Play", style);
            this.txtPlay.anchor.set(0.5, 0.5);
            this.txtHelp = this.game.add.text(this.helpbutton.x, this.helpbutton.y, "Help", style);
            this.txtHelp.anchor.set(0.5, 0.5);
        };

        MainMenuScreen.prototype.resumeClick = function () {
        };

        MainMenuScreen.prototype.playClick = function () {
            this.game.state.start('LevelSelectScreen');
        };

        MainMenuScreen.prototype.highscoreClick = function () {
        };

        MainMenuScreen.prototype.helpClick = function () {
            this.game.state.start('HelpScreen1');
            this.fx.play();
        };

        MainMenuScreen.prototype.quitClick = function () {
        };
        return MainMenuScreen;
    })(Phaser.State);
    TypeScriptTD.MainMenuScreen = MainMenuScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
