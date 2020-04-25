module TypeScriptTD {


    var width: number = 800;
    var height: number = 480;


    export class App extends Phaser.Game {
        constructor() {
            super(width, height, Phaser.AUTO, "TypeScript", null);

            this.state.add('MainMenuScreen', MainMenuScreen, false);
            this.state.add('LevelSelectScreen', LevelSelectScreen, false);
            this.state.add('GameScreen', GameScreen, false);
            this.state.add('HelpScreen1', HelpScreen1, false);
            this.state.add('HelpScreen2', HelpScreen2, false);
            this.state.add('HelpScreen3', HelpScreen3, false);
            this.state.add('HelpScreen4', HelpScreen4, false);
            this.state.add('DefeatScreen', DefeatScreen, false);
            this.state.add('VictoryScreen', VictoryScreen, false);

            this.state.start('MainMenuScreen');
        }


    }
}



