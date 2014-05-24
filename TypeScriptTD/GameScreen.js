var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var GameScreen = (function (_super) {
        __extends(GameScreen, _super);
        function GameScreen() {
            _super.apply(this, arguments);
            this.TowerButtons = Array();
            this.buildMode = false;
            this.IsInProgress = false;
            this.Grid = new TypeScriptTD.Grid(19, 11);
            this.Towers = Array();
            this.Enemies = Array();
            this.Paths = new TypeScriptTD.PathPlanner();
            this.MapId = 1;
            this.towerIds = new Array("tower-gun", "tower-laser", "tower-missile", "tower-quake-wave", "tower-rocket");
            this.weaponIds = new Array("fx-small-round", "fx-laser", "fx-missile", "fx-quake-wave", "fx-rocket");
            this.creepIds = new Array("flyer-fast", "flyer-slow", "land-basic", "land-fast", "land-slow");
        }
        GameScreen.prototype.preload = function () {
            var _this = this;
            this.game.stage.disableVisibilityChange = true;
            this.MapId = TypeScriptTD.LevelSelectScreen.mapChosen;

            this.game.load.text("map", "assets/Data/Maps/map-" + this.MapId + ".json");

            this.game.load.spritesheet("background", "assets/Textures/Maps/" + "Map" + this.MapId + ".jpg", 800, 460);
            this.game.load.image("playscreen", "assets/Textures/Backgrounds/" + "playscreen.png");

            for (var c in this.creepIds) {
                this.game.load.image(this.creepIds[c], "assets/Textures/Creeps/" + this.creepIds[c] + ".png");
                this.game.load.text(this.creepIds[c] + "data", "assets/Data/Enemies/" + this.creepIds[c] + ".json");
            }

            this.game.load.spritesheet("explosion", "assets/Textures/HitEffects/explosion.png", 35, 35);

            for (var t in this.towerIds) {
                this.game.load.image(this.towerIds[t], "assets/Textures/Towers/" + this.towerIds[t] + ".png");
                this.game.load.image("HUD-" + this.towerIds[t], "assets/Textures/Towers/" + "HUD-" + this.towerIds[t] + ".png");
                for (var i = 1; i < 5; i++) {
                    this.game.load.image(this.towerIds[t] + i, "assets/Textures/Towers/" + this.towerIds[t] + i + ".png");
                }
                for (var i = 0; i < 3; i++) {
                    this.game.load.text(this.towerIds[t] + "data" + "-" + i, "assets/Data/Towers/" + this.towerIds[t] + "-" + i + ".json");
                }
            }

            for (var w in this.weaponIds) {
                this.game.load.image(this.weaponIds[w], "assets/Textures/Weapons/" + this.weaponIds[w] + ".png");
            }

            this.game.load.image("Disable", "assets/Disable.png");
            this.game.load.image("Sell", "assets/Textures/Buttons/HUD-button-sell.png");
            this.game.load.image("Upgrade", "assets/Textures/Buttons/HUD-button-upgrade.png");
            this.game.load.image("Pause", "assets/Textures/Buttons/HUD-button-pause.png");
            this.game.load.image("Play", "assets/Textures/Buttons/HUD-button-play.png");
            this.game.load.image("X1", "assets/Textures/Buttons/X1.png");
            this.game.load.image("X2", "assets/Textures/Buttons/X2.png");
            this.game.load.image("X3", "assets/Textures/Buttons/X3.png");
            this.game.load.image("NextWave", "assets/Textures/Buttons/next-wave2.png");

            this.game.load.image("enter", "assets/Textures/Buttons/Enter.png");
            this.game.load.image("exit", "assets/Textures/Buttons/Exit.png");
        };

        GameScreen.prototype.create = function () {
            this.IsInProgress = false;
            this.Grid = new TypeScriptTD.Grid(19, 11);
            this.buildMode = false;
            this.Speed = 1;
            this.CurrentPoints = 0;
            this.Towers = Array();
            this.Enemies = Array();
            this.TowerButtons = Array();
            this.buildMode = false;

            this.game.add.sprite(0, 20, 'background');
            this.game.add.image(0, 0, "playscreen");

            var style = { font: "25px Impact", fill: "#ffffff", align: "center" };
            this.txtCash = this.game.add.text(20, 8, "Cash:", style);
            this.txtLives = this.game.add.text(220, 8, "Lives:", style);
            this.txtPoints = this.game.add.text(420, 8, "Points:", style);
            this.txtWave = this.game.add.text(620, 8, "Wave:", style);

            this.Map = TypeScriptTD.MapData.fromJson(this.cache.getText("map").toString());

            this.setTxtCash(this.Map.StartingCash);
            this.setTxtLives(this.Map.NumLives);
            this.setTxtWave(0);
            this.CurrentWave = this.Map.Waves[this._waveIndex];
            this.TimeToWaveSpawn = this.CurrentWave.WarmUpTime;
            this.setTxtPoints(0);

            this.Spawner = new TypeScriptTD.Spawner(this);

            var start = this.Grid.getCellCenter(this.Map.StartX, this.Map.StartY);
            this.entry = this.game.add.sprite(start.x - 55, start.y, "enter");
            this.entry.anchor.set(0.5, 0.5);
            var end = this.Grid.getCellCenter(this.Map.EndX, this.Map.EndY);
            this.exit = this.game.add.sprite(end.x + 55, end.y, "exit");
            this.exit.anchor.set(0.5, 0.5);

            this.Grid.draw(this.game);

            this.TowerButtons[0] = new TypeScriptTD.TowerButton(this.game, new TypeScriptTD.Vector2(535, 445), this.towerIds[0]);
            this.TowerButtons[1] = new TypeScriptTD.TowerButton(this.game, new TypeScriptTD.Vector2(590, 445), this.towerIds[1]);
            this.TowerButtons[2] = new TypeScriptTD.TowerButton(this.game, new TypeScriptTD.Vector2(645, 445), this.towerIds[2]);
            this.TowerButtons[3] = new TypeScriptTD.TowerButton(this.game, new TypeScriptTD.Vector2(700, 445), this.towerIds[3]);
            this.TowerButtons[4] = new TypeScriptTD.TowerButton(this.game, new TypeScriptTD.Vector2(755, 445), this.towerIds[4]);
            this.DisableButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(470, 445), "Disable");
            this.PauseButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(10, 437), "Play");

            this.SpeedButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(70, 437), "X1");
            this.NextWaveButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(120, 437), "NextWave");

            this.IsInProgress = true;

            this.UpgradeButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(0, 0), "Upgrade");
            this.UpgradeButton.Sprite.visible = false;
            this.SellButton = new TypeScriptTD.Button(this.game, new TypeScriptTD.Vector2(0, 0), "Sell");
            this.SellButton.Sprite.visible = false;

            this.Paths.InitNodes(this.Grid);

            this.game.input.onDown.add(this.onClick, this);
        };

        GameScreen.prototype.onClick = function () {
            if (this.TowerButtons[0].wasClicked(this.game.input.x, this.game.input.y))
                this.onTowerButtonClick(this.TowerButtons[0].TowerId);
            else if (this.TowerButtons[1].wasClicked(this.game.input.x, this.game.input.y))
                this.onTowerButtonClick(this.TowerButtons[1].TowerId);
            else if (this.TowerButtons[2].wasClicked(this.game.input.x, this.game.input.y))
                this.onTowerButtonClick(this.TowerButtons[2].TowerId);
            else if (this.TowerButtons[3].wasClicked(this.game.input.x, this.game.input.y))
                this.onTowerButtonClick(this.TowerButtons[3].TowerId);
            else if (this.TowerButtons[4].wasClicked(this.game.input.x, this.game.input.y))
                this.onTowerButtonClick(this.TowerButtons[4].TowerId);
            else if (this.DisableButton.wasClicked(this.game.input.x, this.game.input.y))
                this.onDisableClick();
            else if (this.UpgradeButton.wasClicked(this.game.input.x, this.game.input.y))
                this.upgradeTower();
            else if (this.SellButton.wasClicked(this.game.input.x, this.game.input.y))
                this.sellTower();
            else if (this.PauseButton.wasClicked(this.game.input.x, this.game.input.y))
                this.pausegame();
            else if (this.SpeedButton.wasClicked(this.game.input.x, this.game.input.y))
                this.changeSpeed();
            else if (this.NextWaveButton.wasClicked(this.game.input.x, this.game.input.y))
                this.nextwave();
            else if (this.Grid.wasClicked(this.game.input.x, this.game.input.y))
                this.onGridClick();
        };

        GameScreen.prototype.nextwave = function () {
            this.TimeToWaveSpawn = 0.001;
            this.setTxtWave(this._waveIndex + 1);
            if (this._waveIndex < this.Map.Waves.length) {
                this.CurrentWave = this.Map.Waves[this._waveIndex];
            }
        };

        GameScreen.prototype.changeSpeed = function () {
            this.Speed = this.Speed + 1;
            if (this.Speed == 4)
                this.Speed = 1;
            this.SpeedButton.Sprite.parent.removeChild(this.SpeedButton.Sprite);
            var image = this.game.add.sprite(this.SpeedButton.Position.x, this.SpeedButton.Position.y, "X" + this.Speed);
            image.width = 35;
            image.height = 35;
            this.SpeedButton.Sprite = image;
        };

        GameScreen.prototype.pausegame = function () {
            if (this.IsInProgress) {
                this.IsInProgress = false;
                this.PauseButton.Sprite.parent.removeChild(this.PauseButton.Sprite);
                var image = this.game.add.sprite(this.PauseButton.Position.x, this.PauseButton.Position.y, "Pause");
                image.width = 35;
                image.height = 35;
                this.PauseButton.Sprite = image;
            } else {
                this.IsInProgress = true;
                this.PauseButton.Sprite.parent.removeChild(this.PauseButton.Sprite);
                var image = this.game.add.sprite(this.PauseButton.Position.x, this.PauseButton.Position.y, "Play");
                image.width = 35;
                image.height = 35;
                this.PauseButton.Sprite = image;
            }
        };

        GameScreen.prototype.onTowerButtonClick = function (towerdId) {
            if (this.buildSprite && this.buildSprite.parent)
                this.buildSprite.parent.removeChild(this.buildSprite);
            this.buildSprite = this.game.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, towerdId);
            this.buildSprite.anchor.set(0.5, 0.5);
            this.buildId = towerdId;
            this.buildMode = true;
        };

        GameScreen.prototype.onDisableClick = function () {
            this.buildMode = false;
            this.buildSprite.visible = false;
        };

        GameScreen.prototype.onGridClick = function () {
            var cellClicked = this.Grid.getCellAtPixel(new TypeScriptTD.Vector2(this.game.input.mousePointer.x, this.game.input.mousePointer.y));
            this.CellClicked = cellClicked;
            this.hideUpdateButtons();
            if (this.buildMode) {
                this.BuildTower(this.buildId, cellClicked.X, cellClicked.Y);
            } else {
                if (cellClicked.towerInstance != null) {
                    this.showUpdateButtons(this.Grid.getCellCenter(cellClicked.X, cellClicked.Y));
                }
            }
        };

        GameScreen.prototype.hideUpdateButtons = function () {
            if (this.UpgradeButton) {
                if (this.UpgradeButton.Sprite.visible == true) {
                    this.UpgradeButton.Sprite.visible = false;
                    this.UpgradeButton.Sprite.parent.removeChild(this.UpgradeButton.Sprite);
                    this.UpgradeButton.Position = new TypeScriptTD.Vector2(this.game.width, this.game.height);
                }
            }
            if (this.SellButton) {
                if (this.SellButton.Sprite.visible == true) {
                    this.SellButton.Sprite.visible = false;
                    this.SellButton.Sprite.parent.removeChild(this.SellButton.Sprite);
                    this.SellButton.Position = new TypeScriptTD.Vector2(this.game.width, this.game.height);
                }
            }
        };

        GameScreen.prototype.showUpdateButtons = function (v) {
            this.UpgradeButton = new TypeScriptTD.Button(this.game, v.subtract(new TypeScriptTD.Vector2(57, 17)), "Upgrade");
            this.SellButton = new TypeScriptTD.Button(this.game, v.add(new TypeScriptTD.Vector2(23, -17)), "Sell");
        };

        GameScreen.prototype.upgradeTower = function () {
            var towerInstance = this.CellClicked.towerInstance;
            var nextlevel = towerInstance.Data.Level + 1;
            if (nextlevel >= 3)
                return;
            var towerId = towerInstance.Data.Id;
            var towerData = TypeScriptTD.TowerData.fromJson(this.cache.getText(towerId + "data" + "-" + nextlevel).toString());
            if (towerData.Cost <= this.RemainingCash) {
                this.CellClicked.towerInstance.Data = towerData;
                this.setTxtCash(this.RemainingCash - towerData.Cost);
                towerInstance.Data = towerData;
                towerInstance.TotalCost += towerInstance.Data.Cost;
                towerInstance.Sprite.parent.removeChild(towerInstance.Sprite);
                towerInstance.Sprite = this.game.add.sprite(towerInstance.Position.x, towerInstance.Position.y, towerInstance.Data.Texture);
            }
        };

        GameScreen.prototype.sellTower = function () {
            var towerInstance = this.CellClicked.towerInstance;
            this.Towers.splice(this.Towers.indexOf(towerInstance), 1);
            this.setTxtCash(this.RemainingCash += towerInstance.TotalCost);
            towerInstance.Sprite.parent.removeChild(towerInstance.Sprite);
            this.CellClicked.towerInstance = null;
            this.CellClicked.buildable = true;
            this.hideUpdateButtons();
        };

        GameScreen.prototype.setTxtCash = function (val) {
            this.RemainingCash = val;
            this.txtCash.text = "Cash: " + val;
        };

        GameScreen.prototype.setTxtLives = function (val) {
            this.RemainingLives = val;
            this.txtLives.text = "Lives: " + val;
        };
        GameScreen.prototype.setTxtPoints = function (val) {
            this.CurrentPoints = val;
            this.txtPoints.text = "Points: " + val;
        };
        GameScreen.prototype.setTxtWave = function (val) {
            this._waveIndex = val;
            var wave = val + 1;
            this.txtWave.text = "Wave: " + wave;
        };

        GameScreen.prototype.gameComplete = function (victory) {
            if (victory)
                this.game.state.start('VictoryScreen');
            else
                this.game.state.start('DefeatScreen');
        };

        GameScreen.prototype.BuildTower = function (towerName, cellX, cellY) {
            var c = this.Grid.getCell(cellX, cellY);

            if (c.buildable) {
                c.buildable = false;
                var startCell = this.Grid.getCell(this.Map.StartX, this.Map.StartY);
                var endCell = this.Grid.getCell(this.Map.EndX, this.Map.EndY);
                var allowed = this.Paths.PathExist(startCell, endCell);
                c.buildable = true;
                if (!allowed)
                    return;

                var towerData = TypeScriptTD.TowerData.fromJson(this.cache.getText(towerName + "data" + "-" + "0").toString());

                if (towerData.Cost <= this.RemainingCash) {
                    var t = new TypeScriptTD.TowerInstance();
                    t.Data = towerData;
                    t.init();
                    this.setTxtCash(this.RemainingCash - towerData.Cost);

                    c.setTower(t);

                    t.Position = this.Grid.getCellCoordinate(cellX, cellY);
                    var img = this.game.add.sprite(t.Position.x, t.Position.y, t.Data.Texture);
                    t.Sprite = img;
                    this.Towers.push(t);
                }
            }
        };

        GameScreen.prototype.update = function () {
            if (this.buildMode) {
                this.buildSprite.x = this.game.input.x;
                this.buildSprite.y = this.game.input.y;
            }

            if (!this.IsInProgress)
                return;

            var timeElapsed = this.game.time.elapsed * this.Speed / 1000;

            if (this.TimeToWaveSpawn > 0) {
                this.TimeToWaveSpawn -= timeElapsed;
                if (this.TimeToWaveSpawn <= 0) {
                    this.Spawner.Start(this.CurrentWave, this);
                }
            } else {
                this.Spawner.update(timeElapsed, this);

                this.Paths.UpdatePaths();

                for (var i = this.Enemies.length - 1; i >= 0; i--) {
                    var enemy = this.Enemies[i];
                    enemy.update(timeElapsed);

                    if (enemy.Escaped) {
                        this.setTxtLives(this.RemainingLives - 1);
                        enemy.Sprite.parent.removeChild(enemy.Sprite);
                        this.Enemies.splice(i, 1);
                    }
                    if (enemy.Health <= 0) {
                        this.setTxtCash(this.RemainingCash + (enemy.Data.Worth * this.CurrentWave.WorthMod));
                        this.setTxtPoints(this.CurrentPoints + enemy.Data.Health);
                        enemy.Sprite.parent.removeChild(enemy.Sprite);
                        this.Enemies.splice(i, 1);
                    }
                }
                this.entry.bringToTop();
                this.exit.bringToTop();

                if (!this.Spawner.IsSpawning && this.Enemies.length == 0) {
                    this.setTxtWave(this._waveIndex + 1);
                    if (this._waveIndex < this.Map.Waves.length) {
                        this.CurrentWave = this.Map.Waves[this._waveIndex];
                        this.TimeToWaveSpawn = this.CurrentWave.WarmUpTime;
                    } else {
                        this.gameComplete(true);
                    }
                }
            }

            for (var i = 0; i < this.Towers.length; i++) {
                this.Towers[i].Update(timeElapsed, this);
            }

            if (this.RemainingLives <= 0) {
                this.gameComplete(false);
            }
        };
        return GameScreen;
    })(Phaser.State);
    TypeScriptTD.GameScreen = GameScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
