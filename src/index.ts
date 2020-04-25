'use strict';
import GameScreen = TypeScriptTD.GameScreen;

/** Imports */
// Import global dependencies. (I remind you, webpack create separate chunk file for them).
require('pixi');    // Because Phaser use PIXI and p2 as global variables, they must be imported first.
require('p2');
require('phaser');  // So, in my case, TypeScript breaks if i import it as `import 'phaser';`. ¯\_(ツ)_/¯

import 'styles/style.styl'; // Registering styles for the page; They will automatically inject.

import DefeatScreen = TypeScriptTD.DefeatScreen;
import VictoryScreen = TypeScriptTD.VictoryScreen;
import LevelSelectScreen = TypeScriptTD.LevelSelectScreen;
import MainMenuScreen = TypeScriptTD.MainMenuScreen;
import HelpScreen2 = TypeScriptTD.HelpScreen2;
import HelpScreen1 = TypeScriptTD.HelpScreen1;
import HelpScreen4 = TypeScriptTD.HelpScreen4;
import HelpScreen3 = TypeScriptTD.HelpScreen3;


// The main class of our application
export default class App extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super(config);

    this.state.add('MainMenuScreen', MainMenuScreen, false);
    this.state.add('LevelSelectScreen', LevelSelectScreen, false);
    this.state.add('GameScreen', GameScreen, false);
    this.state.add('HelpScreen1', HelpScreen1, false);
    this.state.add('HelpScreen2', HelpScreen2, false);
    this.state.add('HelpScreen3', HelpScreen3, false);
    this.state.add('HelpScreen4', HelpScreen4, false);
    this.state.add('DefeatScreen', DefeatScreen, false);
    this.state.add('VictoryScreen', VictoryScreen, false);

    // this.state.start('MainMenuScreen');
    // this.state.add('boot', BootState);
    // this.state.add('preloader', PreloaderState);
    // this.state.add('main', MainState); // Add `main` state into game
    //
    // this.state.start('boot'); // Initialize and start `boot` state
  }
}


// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
  window.onload = () => {
    const config: Phaser.IGameConfig = {
      width:           800, // width of canvas
      height:          600, // height of canvas
      renderer:        Phaser.AUTO, // rendering context. The recommended parameter is Phaser.AUTO
      parent:          '',
      resolution:      1,
      forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
    };

    new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
  };
}
