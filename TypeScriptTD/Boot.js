var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var width = 800;
    var height = 480;

    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this, width, height, Phaser.AUTO, "TypeScript", null);

            this.state.add('MainMenuScreen', TypeScriptTD.MainMenuScreen, false);
            this.state.add('LevelSelectScreen', TypeScriptTD.LevelSelectScreen, false);
            this.state.add('GameScreen', TypeScriptTD.GameScreen, false);
            this.state.add('HelpScreen1', TypeScriptTD.HelpScreen1, false);
            this.state.add('HelpScreen2', TypeScriptTD.HelpScreen2, false);
            this.state.add('HelpScreen3', TypeScriptTD.HelpScreen3, false);
            this.state.add('HelpScreen4', TypeScriptTD.HelpScreen4, false);
            this.state.add('DefeatScreen', TypeScriptTD.DefeatScreen, false);
            this.state.add('VictoryScreen', TypeScriptTD.VictoryScreen, false);

            this.state.start('MainMenuScreen');
        }
        return Boot;
    })(Phaser.Game);
    TypeScriptTD.Boot = Boot;
})(TypeScriptTD || (TypeScriptTD = {}));
