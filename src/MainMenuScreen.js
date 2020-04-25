var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var MainMenuScreen = (function (_super) {
        __extends(MainMenuScreen, _super);
        function MainMenuScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenuScreen.prototype.preload = function () {
            this.game.load.spritesheet('button', 'assets/button.png', 193, 71);
            //this.game.load.spritesheet('resumebutton', 'assetsphaser/button_sprite_sheet.png', 193, 71);
            //this.game.load.spritesheet('playbutton', 'assetsphaser/playbutton.png', 193, 71);
            //this.game.load.spritesheet('highscoresbutton', 'assetsphaser/button_sprite_sheet.png', 193, 71);
            //this.game.load.spritesheet('helpbutton', 'assetsphaser/button_sprite_sheet.png', 193, 71);
            //this.game.load.spritesheet('quitbutton', 'assetsphaser/button_sprite_sheet.png', 193, 71);
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
            //this.resumebutton = this.game.add.button(440, 72, 'resumebutton', this.resumeClick, this, 2, 1, 0);
            //this.highscoresbutton = this.game.add.button(440, 216, 'highscoresbutton', this.highscoreClick, this, 2, 1, 0);
            //this.quitbutton = this.game.add.button(440, 360, 'quitbutton', this.quitClick, this, 2, 1, 0);
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
    }(Phaser.State));
    TypeScriptTD.MainMenuScreen = MainMenuScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=MainMenuScreen.js.map