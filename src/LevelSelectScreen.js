var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var LevelSelectScreen = (function (_super) {
        __extends(LevelSelectScreen, _super);
        function LevelSelectScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentMap = 1;
            return _this;
        }
        LevelSelectScreen.prototype.preload = function () {
            this.game.load.image('background-level-select', 'assets/Textures/Backgrounds/2-level-select.jpg');
            this.game.load.spritesheet('previousbutton', 'assets/Textures/Buttons/back-previous.png', 35, 35);
            this.game.load.spritesheet('nextbutton', 'assets/Textures/Buttons/next.png', 35, 35);
            this.game.load.spritesheet('playbutton', 'assets/Textures/Buttons/HUD-button-play.png', 55, 55);
            for (var i = 1; i <= 5; i++)
                this.game.load.spritesheet('map' + i, 'assets/Textures/Maps/Map' + i + '.jpg', 800, 460);
        };
        LevelSelectScreen.prototype.create = function () {
            this.game.add.sprite(0, 0, 'background-level-select');
            this.map = this.game.add.image(this.game.width / 2, this.game.width / 4, 'map1');
            this.map.anchor.set(0.5, 0.5);
            this.map.scale.set(0.5, 0.5);
            this.previousbutton = this.game.add.button(this.game.width / 100 * 16, 220, 'previousbutton', this.previousClick, this);
            this.previousbutton.anchor.set(0.5, 0.5);
            this.nextbutton = this.game.add.button(this.game.width / 100 * 84, 220, 'nextbutton', this.nextClick, this);
            this.nextbutton.anchor.set(0.5, 0.5);
            this.playbutton = this.game.add.button(this.game.width / 2, this.game.height / 4 * 3, 'playbutton', this.playClick, this);
            this.playbutton.anchor.set(0.5, 0.5);
        };
        LevelSelectScreen.prototype.previousClick = function () {
            this.currentMap--;
            if (this.currentMap == 0)
                this.currentMap = 5;
            this.map.parent.removeChild(this.map);
            this.map = this.game.add.image(this.game.width / 2, this.game.width / 4, 'map' + this.currentMap);
            this.map.anchor.set(0.5, 0.5);
            this.map.scale.set(0.5, 0.5);
        };
        LevelSelectScreen.prototype.nextClick = function () {
            this.currentMap++;
            if (this.currentMap == 6)
                this.currentMap = 1;
            this.map.parent.removeChild(this.map);
            this.map = this.game.add.image(this.game.width / 2, this.game.width / 4, 'map' + this.currentMap);
            this.map.anchor.set(0.5, 0.5);
            this.map.scale.set(0.5, 0.5);
        };
        LevelSelectScreen.prototype.playClick = function () {
            LevelSelectScreen.mapChosen = this.currentMap;
            this.game.state.start('GameScreen');
        };
        return LevelSelectScreen;
    }(Phaser.State));
    LevelSelectScreen.mapChosen = 1;
    TypeScriptTD.LevelSelectScreen = LevelSelectScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=LevelSelectScreen.js.map