var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var width = 800;
    var height = 480;
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            var _this = _super.call(this, width, height, Phaser.AUTO, "TypeScript", null) || this;
            _this.state.add('MainMenuScreen', TypeScriptTD.MainMenuScreen, false);
            _this.state.add('LevelSelectScreen', TypeScriptTD.LevelSelectScreen, false);
            _this.state.add('GameScreen', TypeScriptTD.GameScreen, false);
            _this.state.add('HelpScreen1', TypeScriptTD.HelpScreen1, false);
            _this.state.add('HelpScreen2', TypeScriptTD.HelpScreen2, false);
            _this.state.add('HelpScreen3', TypeScriptTD.HelpScreen3, false);
            _this.state.add('HelpScreen4', TypeScriptTD.HelpScreen4, false);
            _this.state.add('DefeatScreen', TypeScriptTD.DefeatScreen, false);
            _this.state.add('VictoryScreen', TypeScriptTD.VictoryScreen, false);
            _this.state.start('MainMenuScreen');
            return _this;
        }
        return Boot;
    }(Phaser.Game));
    TypeScriptTD.Boot = Boot;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=Boot.js.map