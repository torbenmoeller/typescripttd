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
var TypeScriptTD;
(function (TypeScriptTD) {
    var Button = (function () {
        function Button(game, position, pic) {
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, pic);
            this.Sprite = image;

            image.width = 35;
            image.height = 35;

            this.sizeX = image.width;
            this.sizeY = image.height;
            image.inputEnabled = true;
        }
        Button.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.sizeX;
            var boolY = y > this.Position.y && y < this.Position.y + this.sizeY;
            return (boolX && boolY);
        };
        return Button;
    })();
    TypeScriptTD.Button = Button;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var Cell = (function () {
        function Cell(x, y) {
            this.X = x;
            this.Y = y;
            this.buildable = true;
        }
        Cell.prototype.setTower = function (towerInstance) {
            this.towerInstance = towerInstance;
            this.buildable = false;
        };
        return Cell;
    })();
    TypeScriptTD.Cell = Cell;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var CreepData = (function () {
        function CreepData() {
        }
        CreepData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var c = new CreepData();

            c.CreepId = obj["CreepId"];
            c.Entrance = obj["Entrance"];
            c.Exit = obj["Exit"];
            c.Number = parseInt(obj["Number"]);
            c.TimeBetweenMs = parseInt(obj["TimeBetweenMs"]);

            return c;
        };
        return CreepData;
    })();
    TypeScriptTD.CreepData = CreepData;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var EnemyData = (function () {
        function EnemyData() {
        }
        EnemyData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var e = new EnemyData();

            e.Id = obj["Id"];
            e.CanFly = obj["CanFly"] == "false" ? false : true;
            e.Speed = parseFloat(obj["Speed"]);
            e.Health = parseInt(obj["Health"]);
            e.Worth = parseInt(obj["Worth"]);
            e.Texture = obj["Texture"];
            e.DeathSoundId = obj["DeathSoundId"];
            e.SpawnSoundId = obj["SpawnSoundId"];

            return e;
        };
        return EnemyData;
    })();
    TypeScriptTD.EnemyData = EnemyData;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var MapData = (function () {
        function MapData() {
            this.Waves = new Array();
            this.StartX = 0;
            this.StartY = 5;
            this.EndX = 18;
            this.EndY = 5;
        }
        MapData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var m = new MapData();

            m.MapId = obj["MapId"];
            m.FriendlyName = obj["FriendlyName"];
            m.StartingCash = parseInt(obj["StartingCash"]);
            m.BackgroundTexture = obj["BackgroundTexture"];
            m.NumLives = parseInt(obj["NumLives"]);
            m.FocusColor = obj["FocusColor"];
            m.VictorySoundId = obj["VictorySoundId"];
            m.DefeatSoundId = obj["DefeatSoundId"];
            m.WaveStartSoundId = obj["WaveStartSoundId"];
            m.MapStartSoundId = obj["MapStartSoundId"];

            for (var w in obj["Waves"]) {
                var wave = TypeScriptTD.WaveData.fromJson(JSON.stringify(obj["Waves"][w]));
                m.Waves.push(wave);
            }

            return m;
        };
        return MapData;
    })();
    TypeScriptTD.MapData = MapData;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var TowerData = (function () {
        function TowerData() {
        }
        TowerData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var t = new TowerData();

            t.Id = obj["Id"];
            t.WeaponType = obj["WeaponType"];
            t.Level = parseInt(obj["Level"]);
            t.Cost = parseInt(obj["Cost"]);
            t.TimeToBuildMs = parseInt(obj["TimeToBuildMs"]);
            t.TimeToSellMs = parseInt(obj["TimeToSellMs"]);
            t.Damage = parseInt(obj["Damage"]);
            t.ReloadTimeMs = parseInt(obj["ReloadTimeMs"]);
            t.MinRange = parseInt(obj["MinRange"]);
            t.MaxRange = parseInt(obj["MaxRange"]);
            t.Texture = obj["Texture"];
            t.ShotTexture = obj["ShotTexture"];
            t.ShotSpeed = parseInt(obj["ShotSpeed"]);
            t.CanShootFlying = obj["CanShootFlying"] == "false" ? false : true;
            t.CanShootLand = obj["CanShootLand"] == "false" ? false : true;
            t.HitTexture = obj["HitTexture"];
            t.HitAnimationFPS = parseInt(obj["HitAnimationFPS"]);
            t.BuildSoundId = obj["BuildSoundId"];
            t.SellSoundId = obj["SellSoundId"];
            t.UpgradeSoundId = obj["UpgradeSoundId"];
            t.ShotSoundId = obj["ShotSoundId"];
            t.HitSoundId = obj["HitSoundId"];

            return t;
        };
        return TowerData;
    })();
    TypeScriptTD.TowerData = TowerData;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var WaveData = (function () {
        function WaveData() {
            this.WarmUpTime = 10;
            this.Creep = new Array();
        }
        WaveData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var w = new WaveData();

            w.WorthMod = parseInt(obj["WorthMod"]);
            w.HealthMod = parseInt(obj["HealthMod"]);

            if (Object.prototype.toString.call(obj["Creep"]) === '[object Array]') {
                for (var c in obj["Creep"]) {
                    var creep = TypeScriptTD.CreepData.fromJson(JSON.stringify(obj["Creep"][c]));
                    w.Creep.push(creep);
                }
            } else {
                var creep = TypeScriptTD.CreepData.fromJson(JSON.stringify(obj["Creep"]));
                w.Creep.push(creep);
            }

            return w;
        };
        return WaveData;
    })();
    TypeScriptTD.WaveData = WaveData;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    (function (PathStage) {
        PathStage[PathStage["GoingToStart"] = 0] = "GoingToStart";
        PathStage[PathStage["GoingToDest"] = 1] = "GoingToDest";
        PathStage[PathStage["GoingToDespawn"] = 2] = "GoingToDespawn";
    })(TypeScriptTD.PathStage || (TypeScriptTD.PathStage = {}));
    var PathStage = TypeScriptTD.PathStage;
    var EnemyInstance = (function () {
        function EnemyInstance(gs) {
            this.Stage = 0 /* GoingToStart */;
            this.Escaped = false;
            this.gs = gs;
        }
        EnemyInstance.prototype.update = function (elapsedtime) {
            var targetPoint;

            switch (this.Stage) {
                case 0 /* GoingToStart */:
                    targetPoint = this.StartPoint;
                    break;
                case 1 /* GoingToDest */:
                    if (this.Path.PathFound && this.Path.Nodes.length > 0) {
                        targetPoint = this.gs.Grid.getCellCenter(this.Path.Nodes[0].Cell.X, this.Path.Nodes[0].Cell.Y);
                    } else {
                        targetPoint = this.Position;
                    }
                    break;
                case 2 /* GoingToDespawn */:
                    targetPoint = this.DespawnPoint;
                    break;
            }

            this.CurrentDirection = targetPoint.subtract(this.Position);
            this.CurrentDirection = this.CurrentDirection.normalize();
            var movement = this.CurrentDirection.multiply(this.Data.Speed * this.gs.Grid.cellSize * elapsedtime);
            this.Position = this.Position.add(movement);

            this.Sprite.x = this.Position.x;
            this.Sprite.y = this.Position.y;
            this.Sprite.bringToTop();

            if (targetPoint.subtract(this.Position).getLengthSquared() <= this.gs.Grid.cellSize) {
                switch (this.Stage) {
                    case 0 /* GoingToStart */:
                        this.Stage = 1 /* GoingToDest */;
                        this.Path = this.gs.Paths.GetPath(this.gs.Grid.getCell(this.StartX, this.StartY), this.gs.Grid.getCell(this.DestX, this.DestY), this.Data.CanFly);
                        break;
                    case 1 /* GoingToDest */:
                        if (this.Path.PathFound && this.Path.Nodes.length > 0) {
                            if (this.Path.Nodes.length == 1) {
                                this.Stage = 2 /* GoingToDespawn */;
                                this.gs.Paths.ReleasePath(this.Path);
                            } else {
                                this.Path.CompleteNode(this.Path.Nodes[0]);
                            }
                        }
                        break;
                    case 2 /* GoingToDespawn */:
                        this.Escaped = true;

                        break;
                }
            }
        };

        EnemyInstance.prototype.TakeDamage = function (towerFullName, damage) {
            this.Health -= damage;
        };
        return EnemyInstance;
    })();
    TypeScriptTD.EnemyInstance = EnemyInstance;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var Grid = (function () {
        function Grid(cellsX, cellsY) {
            this.CellsArray = [];
            this.cellSize = 35;
            this.Columns = cellsX;
            this.Rows = cellsY;
            this.Position = new TypeScriptTD.Vector2(67, 47);

            for (var i = 0; i < cellsX; i++) {
                for (var j = 0; j < cellsY; j++) {
                    this.CellsArray[cellsX * j + i] = new TypeScriptTD.Cell(i, j);
                }
            }
        }
        Grid.prototype.getCell = function (x, y) {
            return this.CellsArray[this.Columns * y + x];
        };

        Grid.prototype.draw = function (game) {
            for (var i = 0; i < this.Columns; i++) {
                for (var j = 0; j < this.Rows; j++) {
                    var g = game.add.graphics(0, 0);
                    g.lineStyle(2, 0x000000, 1);
                    g.drawRect(this.Position.x + i * this.cellSize, this.Position.y + j * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        };

        Grid.prototype.getCellCoordinate = function (cellX, cellY) {
            var x = this.Position.x + cellX * this.cellSize;
            var y = this.Position.y + cellY * this.cellSize;
            var v = new TypeScriptTD.Vector2(x, y);
            return v;
        };

        Grid.prototype.getCellCenter = function (cellX, cellY) {
            var x = this.Position.x + cellX * this.cellSize + this.cellSize / 2;
            var y = this.Position.y + cellY * this.cellSize + this.cellSize / 2;
            var v = new TypeScriptTD.Vector2(x, y);
            return v;
        };

        Grid.prototype.getCellAtPixel = function (pixelPosition) {
            var pos = pixelPosition.subtract(this.Position);
            var x = Math.floor(pos.x / this.cellSize);
            var y = Math.floor(pos.y / this.cellSize);
            return this.getCell(x, y);
        };

        Grid.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.Columns * this.cellSize;
            var boolY = y > this.Position.y && y < this.Position.y + this.Rows * this.cellSize;
            return (boolX && boolY);
        };
        return Grid;
    })();
    TypeScriptTD.Grid = Grid;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var Path = (function () {
        function Path() {
            this.Nodes = new Array();
            this._firstRun = true;
        }
        Path.prototype.ClearData = function () {
            this.Nodes = new Array();
            this.End = null;
            this.IsAirPath = false;
            this._firstRun = true;
            this.PathFound = false;
        };

        Path.prototype.CompleteNode = function (node) {
            if (!this.IsAirPath) {
                this.Nodes.splice(this.Nodes.indexOf(node), 1);
                this.CurrentCell = node.Cell;
            }
        };

        Path.prototype.IsPathValid = function () {
            if (this._firstRun) {
                this._firstRun = false;
                return false;
            }

            if (this.IsAirPath)
                return true;

            if (!this.PathFound)
                return false;

            for (var t in this.Nodes) {
                var v = this.Nodes[t].Cell.buildable;
                if (v == false)
                    return false;
            }
            return true;
        };
        return Path;
    })();
    TypeScriptTD.Path = Path;

    var PathNode = (function () {
        function PathNode() {
            this.Adjacent = new Array();
        }
        PathNode.prototype.TotalCost = function () {
            return this.CostFromStart + this.CostToGoal;
        };

        PathNode.prototype.EstimateCostTo = function (toCell) {
            return Math.abs(toCell.X - this.Cell.X) + Math.abs(toCell.Y - this.Cell.Y);
        };

        PathNode.prototype.CompareTo = function (other) {
            return this.TotalCost() > other.TotalCost();
        };
        return PathNode;
    })();
    TypeScriptTD.PathNode = PathNode;

    var PathPlanner = (function () {
        function PathPlanner() {
            this._allocatedPaths = new Array();
            this.columnsize = 0;
        }
        PathPlanner.prototype.InitNodes = function (cells) {
            this.columnsize = cells.Columns;

            this._nodeGrid = new Array(cells.Rows * cells.Columns);
            for (var gridCell in cells.CellsArray) {
                var p = new PathNode();
                this._nodeGrid[cells.CellsArray[gridCell].Y * cells.Columns + cells.CellsArray[gridCell].X] = p;
                p.Cell = cells.CellsArray[gridCell];
            }

            for (var node in this._nodeGrid) {
                this._nodeGrid[node].Adjacent[0] = this._nodeGrid[node].Cell.Y > 0 ? this._nodeGrid[(this._nodeGrid[node].Cell.Y - 1) * cells.Columns + this._nodeGrid[node].Cell.X] : null;
                this._nodeGrid[node].Adjacent[1] = this._nodeGrid[node].Cell.Y < (cells.Rows - 1) ? this._nodeGrid[(this._nodeGrid[node].Cell.Y + 1) * cells.Columns + this._nodeGrid[node].Cell.X] : null;
                this._nodeGrid[node].Adjacent[2] = this._nodeGrid[node].Cell.X < (cells.Columns - 1) ? this._nodeGrid[this._nodeGrid[node].Cell.Y * cells.Columns + this._nodeGrid[node].Cell.X + 1] : null;
                this._nodeGrid[node].Adjacent[3] = this._nodeGrid[node].Cell.X > 0 ? this._nodeGrid[this._nodeGrid[node].Cell.Y * cells.Columns + this._nodeGrid[node].Cell.X - 1] : null;
            }
        };

        PathPlanner.prototype.PathExist = function (start, end) {
            var p = new Path();
            p.ClearData();
            p.End = end;
            p.CurrentCell = start;

            return this.CalculateLandPath(p);
        };

        PathPlanner.prototype.GetPath = function (start, end, isAirPath) {
            var p = new Path();
            p.ClearData();
            p.End = end;
            p.IsAirPath = isAirPath;
            p.CurrentCell = start;

            this._allocatedPaths.push(p);
            return p;
        };

        PathPlanner.prototype.ReleasePath = function (p) {
            this._allocatedPaths.splice(this._allocatedPaths.indexOf(p), 1);
        };

        PathPlanner.prototype.UpdatePaths = function () {
            for (var i = 0; i < this._allocatedPaths.length; i++) {
                var p = this._allocatedPaths[i];
                if (!p.IsPathValid()) {
                    if (p.IsAirPath) {
                        p.Nodes = new Array();
                        p.Nodes.push(this._nodeGrid[this.columnsize * p.End.Y + p.End.X]);
                        p.PathFound = true;
                    } else {
                        this.CalculateLandPath(p);
                    }
                }
            }
        };

        PathPlanner.prototype.CalculateLandPath = function (p) {
            var _open = new Array();
            var _closed = new Array();

            p.Nodes = new Array();

            var startNode = this._nodeGrid[p.CurrentCell.Y * this.columnsize + p.CurrentCell.X];
            startNode.CostFromStart = 0;
            startNode.CostToGoal = startNode.EstimateCostTo(p.End);
            startNode.Parent = null;
            _open.push(startNode);

            while (_open.length > 0) {
                var node = _open[0];
                _open.splice(0, 1);

                if (node.Cell.X == p.End.X && node.Cell.Y == p.End.Y) {
                    var n = node;
                    while (n != startNode) {
                        p.Nodes.splice(0, 0, n);
                        n = n.Parent;
                    }
                    p.PathFound = true;
                    return true;
                }

                for (var i = 0; i < 4; i++) {
                    var adjacent = node.Adjacent[i];
                    if (adjacent != null && adjacent.Cell.buildable) {
                        var newCost = node.CostFromStart + adjacent.EstimateCostTo(node.Cell);
                        var isInOpen = contains(_open, adjacent);
                        var isInClosed = contains(_closed, adjacent);

                        if ((isInOpen || isInClosed) && adjacent.CostFromStart <= newCost) {
                            continue;
                        }

                        adjacent.Parent = node;
                        adjacent.CostFromStart = newCost;
                        adjacent.CostToGoal = adjacent.EstimateCostTo(p.End);

                        if (isInClosed) {
                            _closed.splice(_closed.indexOf(adjacent), 1);
                        }

                        if (isInOpen) {
                            _open.sort();
                        } else {
                            _open.push(adjacent);
                        }
                    }
                }
                _closed.push(node);
            }
            p.PathFound = false;
            return false;
        };
        return PathPlanner;
    })();
    TypeScriptTD.PathPlanner = PathPlanner;

    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var SpawnRun = (function () {
        function SpawnRun() {
        }
        return SpawnRun;
    })();
    TypeScriptTD.SpawnRun = SpawnRun;

    var Spawner = (function () {
        function Spawner(gs) {
            this._runs = new Array();
            this.gs = gs;
        }
        Spawner.prototype.update = function (elapsedtime, session) {
            var numFinished = 0;

            for (var r in this._runs) {
                var run = this._runs[r];
                if (run.NumCreated < run.TotalToMake) {
                    run.TimeToNext -= elapsedtime;
                    if (run.TimeToNext <= 0) {
                        var enemy = new TypeScriptTD.EnemyInstance(session);
                        enemy.Data = run.Data;
                        enemy.Health = enemy.Data.Health * run.HealthMod;
                        enemy.Stage = 0 /* GoingToStart */;

                        enemy.Position = run.SpawnPoint;
                        enemy.DestX = run.DestX;
                        enemy.DestY = run.DestY;
                        enemy.StartPoint = run.StartPoint;
                        enemy.StartX = run.StartX;
                        enemy.StartY = run.StartY;
                        enemy.DespawnPoint = run.DespawnPoint;

                        var img = this.gs.game.add.sprite(enemy.Position.x, enemy.Position.y, enemy.Data.Texture);
                        img.anchor.set(0.5, 0.5);
                        enemy.Sprite = img;

                        session.Enemies.push(enemy);

                        run.NumCreated++;
                        run.TimeToNext = run.TimeBetween;
                    }
                } else {
                    numFinished++;
                }
            }

            if (numFinished >= this._runs.length) {
                this.IsSpawning = false;
                this._runs = new Array();
            }
        };

        Spawner.prototype.Start = function (currentWave, session) {
            for (var w in currentWave.Creep) {
                var wp = currentWave.Creep[w];
                var run = new SpawnRun();

                run.Data = TypeScriptTD.EnemyData.fromJson(this.gs.cache.getText(wp.CreepId + "data").toString());
                run.HealthMod = currentWave.HealthMod;
                run.NumCreated = 0;
                run.TimeToNext = currentWave.WarmUpTime;
                run.TotalToMake = wp.Number;
                run.TimeBetween = wp.TimeBetweenMs / 1000;

                run.DestX = session.Map.EndX;
                run.DestY = session.Map.EndY;

                run.StartX = session.Map.StartX;
                run.StartY = session.Map.StartY;

                run.StartPoint = session.Grid.getCellCenter(run.StartX, run.StartY);
                run.SpawnPoint = run.StartPoint.subtract(new TypeScriptTD.Vector2(session.Grid.cellSize * 3, 0));
                run.DespawnPoint = session.Grid.getCellCenter(run.DestX, run.DestY);
                run.DespawnPoint.x = 800 + session.Grid.cellSize;

                this._runs.push(run);
            }
            this.IsSpawning = true;
        };
        return Spawner;
    })();
    TypeScriptTD.Spawner = Spawner;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var TowerButton = (function () {
        function TowerButton(game, position, towerId) {
            this.TowerId = towerId;
            this.Position = position;
            var image = game.add.sprite(position.x, position.y, "HUD-" + towerId);

            image.width = 35;
            image.height = 35;

            this.sizeX = image.width;
            this.sizeY = image.height;
            image.inputEnabled = true;
        }
        TowerButton.prototype.wasClicked = function (x, y) {
            var boolX = x > this.Position.x && x < this.Position.x + this.sizeX;
            var boolY = y > this.Position.y && y < this.Position.y + this.sizeY;
            return (boolX && boolY);
        };
        return TowerButton;
    })();
    TypeScriptTD.TowerButton = TowerButton;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var TowerInstance = (function () {
        function TowerInstance() {
        }
        TowerInstance.prototype.init = function () {
            if (this.Data.WeaponType == "DumbProjectile") {
                this.Weapon = new TypeScriptTD.DumbWeapon();
            } else if (this.Data.WeaponType == "LaserWeapon") {
                this.Weapon = new TypeScriptTD.LaserWeapon();
            } else if (this.Data.WeaponType == "SmartProjectile") {
                this.Weapon = new TypeScriptTD.SmartWeapon();
            } else if (this.Data.WeaponType == "RadialShockwave") {
                this.Weapon = new TypeScriptTD.WaveWeapon();
            }
            this.Weapon.ShotTexture = this.Data.ShotTexture;
            this.Weapon.TowerData = this.Data;
            this.TotalCost = this.Data.Cost;
        };

        TowerInstance.prototype.Update = function (elapsedTime, gs) {
            this.Weapon.Update(elapsedTime, gs);
            if (this.Weapon.CanFire()) {
                if (this.Weapon.TargetAndFire(gs.Enemies, this.Position, gs.Grid.cellSize, gs)) {
                }
            }
        };
        return TowerInstance;
    })();
    TypeScriptTD.TowerInstance = TowerInstance;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.add = function (vector) {
            var a = this.x + vector.x;
            var b = this.y + vector.y;
            return new Vector2(a, b);
        };
        Vector2.prototype.subtract = function (vector) {
            var a = this.x - vector.x;
            var b = this.y - vector.y;
            return new Vector2(a, b);
        };
        Vector2.prototype.multiply = function (value) {
            var a = this.x * value;
            var b = this.y * value;
            return new Vector2(a, b);
        };

        Vector2.prototype.divide = function (value) {
            var a = this.x / value;
            var b = this.y / value;
            return new Vector2(a, b);
        };

        Vector2.prototype.getLength = function () {
            var a = this.x * this.x;
            var b = this.y * this.y;
            return Math.sqrt(a + b);
        };
        Vector2.prototype.normalize = function () {
            var a = this.x / (this.getLength() + 0.00000000001);
            var b = this.y / (this.getLength() + 0.00000000001);
            return new Vector2(a, b);
        };
        Vector2.prototype.getLengthSquared = function () {
            return this.getLength() * this.getLength();
        };
        return Vector2;
    })();
    TypeScriptTD.Vector2 = Vector2;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var Ammo = (function () {
        function Ammo() {
            this.IsAlive = true;
            this.IsHit = false;
            this.DistanceTravelled = 0;
        }
        return Ammo;
    })();
    TypeScriptTD.Ammo = Ammo;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var BeamAmmo = (function (_super) {
        __extends(BeamAmmo, _super);
        function BeamAmmo() {
            _super.apply(this, arguments);
            this.IsAlive = false;
        }
        BeamAmmo.prototype.Update = function (elapsedTime, data, session) {
        };

        BeamAmmo.prototype.Reset = function () {
            this.IsAlive = true;
            this.AliveTime = 0;
        };
        return BeamAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.BeamAmmo = BeamAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var DumbAmmo = (function (_super) {
        __extends(DumbAmmo, _super);
        function DumbAmmo(session, shotTexture) {
            _super.call(this);
            this.sprite = session.add.sprite(-20, -20, shotTexture);
            this.sprite.anchor.set(0.5, 0.5);
        }
        DumbAmmo.prototype.Update = function (elapsedTime, data, session) {
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;

            if (this.IsHit) {
                this.IsAlive = false;
            } else {
                var v = this.Direction.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize)) {
                    this.IsAlive = false;
                } else {
                    var halfCell = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    for (var e in session.Enemies) {
                        if ((session.Enemies[e].Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                            session.Enemies[e].TakeDamage(data.Id, data.Damage);

                            this.IsHit = true;

                            this.IsAlive = false;

                            break;
                        }
                    }
                }
            }
        };
        return DumbAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.DumbAmmo = DumbAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var SmartAmmo = (function (_super) {
        __extends(SmartAmmo, _super);
        function SmartAmmo() {
            _super.apply(this, arguments);
            this.sprite = null;
            this.rotation = 0;
            this.originalWidth = 0;
        }
        SmartAmmo.prototype.Update = function (elapsedTime, data, session) {
            if (this.IsHit) {
                this.IsAlive = false;
            } else {
                var v = (this.Target.Position.subtract(this.Position));
                v = v.normalize();

                var rot = Math.atan2(v.y, v.x);
                this.rotation = rot + Math.PI * 0.5;

                v = v.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize)) {
                    this.IsAlive = false;
                } else {
                    var halfCell = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    if ((this.Target.Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                        this.Target.TakeDamage(data.Id, data.Damage);

                        this.IsHit = true;
                        this.IsAlive = false;
                    }
                }
            }
        };

        SmartAmmo.prototype.draw = function (session) {
            if (!this.sprite) {
                this.sprite = session.game.add.sprite(this.Position.x + (session.Grid.cellSize / 2), this.Position.y + (session.Grid.cellSize / 2), this.ShotTexture);
                this.originalWidth = this.sprite.width;
                this.sprite.anchor.set(0.5, 0.5);
            }
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;
            this.sprite.rotation = this.rotation;
        };
        return SmartAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.SmartAmmo = SmartAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var WaveAmmo = (function () {
        function WaveAmmo() {
            this.CurrentRadius = 0;
            this.sprite = null;
            this.IsAlive = true;
            this.originalWidth = 0;
        }
        WaveAmmo.prototype.Update = function (elapsedTime, data, session) {
            this.CurrentRadius += this.Speed * elapsedTime;

            if (this.CurrentRadius >= this.MaxRadius) {
                this.IsAlive = false;
                this.sprite.parent.removeChild(this.sprite);
            }

            var rsq = this.CurrentRadius * this.CurrentRadius;

            for (var enemyInstance in session.Enemies) {
                if ((session.Enemies[enemyInstance].Position.subtract(this.Epicenter)).getLengthSquared() <= rsq && ((session.Enemies[enemyInstance].Data.CanFly && data.CanShootFlying) || (!session.Enemies[enemyInstance].Data.CanFly && data.CanShootLand))) {
                    session.Enemies[enemyInstance].TakeDamage(data.Id, data.Damage * elapsedTime);
                }
            }
        };

        WaveAmmo.prototype.draw = function (session) {
            if (!this.sprite) {
                this.sprite = session.game.add.sprite(this.Epicenter.x + (session.Grid.cellSize / 2), this.Epicenter.y + (session.Grid.cellSize / 2), this.ShotTexture);
                this.originalWidth = this.sprite.width;
                this.sprite.anchor.set(0.5, 0.5);
            }
            var scale = this.CurrentRadius / this.originalWidth;
            this.sprite.scale.set(scale, scale);
        };
        return WaveAmmo;
    })();
    TypeScriptTD.WaveAmmo = WaveAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var DumbWeapon = (function () {
        function DumbWeapon() {
            this._sinceLastShot = 0;
            this._projectiles = new Array();
        }
        DumbWeapon.prototype.CanFire = function () {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        };

        DumbWeapon.prototype.TargetAndFire = function (enemies, towerPos, gridCellSize, session) {
            var closest;
            var distSq = 2147483647;

            var maxRange = gridCellSize * this.TowerData.MaxRange;
            maxRange *= maxRange;

            var minRange = gridCellSize * this.TowerData.MinRange;
            minRange *= minRange;

            for (var e in enemies) {
                if ((this.TowerData.CanShootFlying && enemies[e].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[e].Data.CanFly)) {
                    var d = (enemies[e].Position.subtract(towerPos)).getLengthSquared();

                    if (d < distSq && d <= maxRange && d >= minRange) {
                        closest = enemies[e];
                        distSq = d;
                    }
                }
            }
            if (closest != null) {
                var item = new TypeScriptTD.DumbAmmo(session, this.ShotTexture);
                item.IsAlive = true;
                item.IsHit = false;
                item.DistanceTravelled = 0;
                item.Position = towerPos.add(new TypeScriptTD.Vector2(gridCellSize / 2, gridCellSize / 2));
                item.Speed = this.TowerData.ShotSpeed * gridCellSize;
                item.Direction = closest.CurrentDirection.multiply(closest.Data.Speed * gridCellSize);
                item.Direction = item.Direction.add(closest.Position).subtract(item.Position).divide(item.Speed);
                item.Direction = item.Direction.normalize();
                var rot = Math.atan2(item.Direction.y, item.Direction.x);
                item.sprite.rotation = rot + Math.PI * 0.5;

                this._projectiles.push(item);
                this._sinceLastShot = 0;
                return true;
            }
            return false;
        };

        DumbWeapon.prototype.Update = function (elapsedTime, session) {
            this._sinceLastShot += elapsedTime * 1000;

            for (var projectile in this._projectiles) {
                this._projectiles[projectile].Update(elapsedTime, this.TowerData, session);
            }

            for (var i = this._projectiles.length - 1; i >= 0; i--) {
                var item = this._projectiles[i];
                if (!item.IsAlive) {
                    item.sprite.parent.removeChild(item.sprite);
                    this._projectiles.splice(i, 1);
                }
            }
        };
        return DumbWeapon;
    })();
    TypeScriptTD.DumbWeapon = DumbWeapon;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var LaserWeapon = (function () {
        function LaserWeapon() {
            this.ShotSprite = null;
            this._beamAmmo = new TypeScriptTD.BeamAmmo();
            this._sinceLastShot = 0;
            this.direction = -1;
        }
        LaserWeapon.prototype.CanFire = function () {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs && !this._beamAmmo.IsAlive;
        };

        LaserWeapon.prototype.TargetAndFire = function (enemies, towerPos, gridCellSize, session) {
            var maxRange = this.TowerData.MaxRange * gridCellSize;
            var maxRSq = maxRange * maxRange;
            var minRange = this.TowerData.MinRange * gridCellSize;
            var minRSq = minRange * minRange;

            var towerCell = session.Grid.getCellAtPixel(towerPos);

            this.direction = -1;

            for (var enemyInstance in enemies) {
                var enemyCell = session.Grid.getCellAtPixel(enemies[enemyInstance].Position);

                if (enemyCell.X == towerCell.X || enemyCell.Y == towerCell.Y) {
                    var distSq = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();
                    if (distSq <= maxRSq && distSq >= minRSq) {
                        if (enemyCell.X == towerCell.X) {
                            this.direction = enemyCell.Y < towerCell.Y ? 0 : 1;
                        } else {
                            this.direction = enemyCell.X < towerCell.X ? 3 : 2;
                        }
                    }
                }
            }

            if (this.direction >= 0) {
                this._beamAmmo.Reset();
                this._beamAmmo.StartPos = new TypeScriptTD.Vector2(towerPos.x, towerPos.y);
                this._beamAmmo.EndPos = new TypeScriptTD.Vector2(towerPos.x, towerPos.y);
                this._beamAmmo.Lifetime = this.TowerData.ShotSpeed;
                this._beamAmmo.Column = towerCell.X;
                this._beamAmmo.Row = towerCell.Y;
                this._beamAmmo.MaxRangeSq = maxRSq;

                switch (this.direction) {
                    case 0:
                        this._beamAmmo.EndPos.y -= maxRange;
                        this._beamAmmo.IsVertical = true;
                        break;

                    case 1:
                        this._beamAmmo.EndPos.y += maxRange;
                        this._beamAmmo.IsVertical = true;
                        break;

                    case 2:
                        this._beamAmmo.EndPos.x += maxRange;
                        this._beamAmmo.IsVertical = false;
                        break;

                    case 3:
                        this._beamAmmo.EndPos.x -= maxRange;
                        this._beamAmmo.IsVertical = false;
                        break;

                    default:
                        return false;
                }

                this._beamAmmo.CellDrawIncrement = this._beamAmmo.EndPos.subtract(this._beamAmmo.StartPos);
                this._beamAmmo.NumCells = Math.floor(this._beamAmmo.CellDrawIncrement.getLength() / gridCellSize);
                this._beamAmmo.CellDrawIncrement = this._beamAmmo.CellDrawIncrement.normalize();
                this._beamAmmo.CellDrawIncrement = this._beamAmmo.CellDrawIncrement.multiply(gridCellSize);

                return true;
            }

            return false;
        };

        LaserWeapon.prototype.Update = function (elapsedSeconds, session) {
            if (this._sinceLastShot < this.TowerData.ReloadTimeMs)
                this._sinceLastShot += elapsedSeconds * 1000;

            if (this._beamAmmo.IsAlive) {
                this._beamAmmo.AliveTime += elapsedSeconds;

                if (this._beamAmmo.AliveTime >= this._beamAmmo.Lifetime) {
                    this._beamAmmo.IsAlive = false;
                    this._sinceLastShot = 0;
                }

                for (var enemyInstance in session.Enemies) {
                    var distSq = (session.Enemies[enemyInstance].Position.subtract(this._beamAmmo.StartPos)).getLengthSquared();

                    var enemyCell = session.Grid.getCellAtPixel(session.Enemies[enemyInstance].Position);
                    if (this._beamAmmo.IsVertical) {
                        if (enemyCell.X == this._beamAmmo.Column && distSq <= this._beamAmmo.MaxRangeSq) {
                            session.Enemies[enemyInstance].TakeDamage(this.TowerData.Id, this.TowerData.Damage * elapsedSeconds);
                        }
                    } else {
                        if (enemyCell.Y == this._beamAmmo.Row && distSq <= this._beamAmmo.MaxRangeSq) {
                            session.Enemies[enemyInstance].TakeDamage(this.TowerData.Id, this.TowerData.Damage * elapsedSeconds);
                        }
                    }
                }
            }

            if (this._beamAmmo.IsAlive) {
                if (this.ShotSprite == null) {
                    this.ShotSprite = session.add.sprite(0, 0, this.ShotTexture);
                    var res = this._beamAmmo.StartPos.subtract(this._beamAmmo.EndPos);
                    var scale;

                    if (this._beamAmmo.IsVertical) {
                        scale = res.y / this.ShotSprite.height;
                        this.ShotSprite.scale.set(scale, 1);
                    } else {
                        scale = res.x / this.ShotSprite.width;
                        this.ShotSprite.scale.set(scale, 1);
                    }
                    this.ShotSprite.x = this._beamAmmo.StartPos.x + session.Grid.cellSize / 2;
                    this.ShotSprite.y = this._beamAmmo.StartPos.y + session.Grid.cellSize / 2;
                    this.ShotSprite.anchor.set(0, 0.5);
                    switch (this.direction) {
                        case 0:
                            this.ShotSprite.rotation = Math.PI * 1.5;
                            break;

                        case 1:
                            this.ShotSprite.rotation = Math.PI * 0.5;
                            this.ShotSprite.y = this._beamAmmo.EndPos.y + session.Grid.cellSize / 2;
                            break;

                        case 2:
                            this.ShotSprite.rotation = 0;
                            this.ShotSprite.x = this._beamAmmo.EndPos.x + session.Grid.cellSize / 2;
                            break;

                        case 3:
                            this.ShotSprite.rotation = Math.PI;
                            break;
                    }
                    console.log(this.ShotSprite.angle.toString());
                }
            } else {
                if (this.ShotSprite) {
                    this.ShotSprite.parent.removeChild(this.ShotSprite);
                    this.ShotSprite = null;
                }
            }
        };
        return LaserWeapon;
    })();
    TypeScriptTD.LaserWeapon = LaserWeapon;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var SmartWeapon = (function () {
        function SmartWeapon() {
            this._sinceLastShot = 0;
            this._projectiles = new Array();
        }
        SmartWeapon.prototype.CanFire = function () {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        };

        SmartWeapon.prototype.TargetAndFire = function (enemies, towerPos, gridCellSize, session) {
            var closest = null;
            var distSq = 2147483647;
            var maxRange = gridCellSize * this.TowerData.MaxRange;

            var minRange = gridCellSize * this.TowerData.MinRange;

            maxRange *= maxRange;
            minRange *= minRange;

            for (var enemyInstance in enemies) {
                if ((this.TowerData.CanShootFlying && enemies[enemyInstance].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[enemyInstance].Data.CanFly)) {
                    var d = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();

                    if (d < distSq && d <= maxRange && d >= minRange) {
                        closest = enemies[enemyInstance];
                        distSq = d;
                    }
                }
            }

            if (closest != null) {
                var item = new TypeScriptTD.SmartAmmo();
                item.Position = towerPos;
                item.Speed = this.TowerData.ShotSpeed * gridCellSize;
                item.Target = closest;
                item.ShotTexture = this.ShotTexture;

                this._projectiles.push(item);
                this._sinceLastShot = 0;
                return true;
            }
            return false;
        };

        SmartWeapon.prototype.Update = function (elapsedTime, session) {
            this._sinceLastShot += elapsedTime * 1000;

            for (var i = this._projectiles.length - 1; i >= 0; i--) {
                this._projectiles[i].Update(elapsedTime, this.TowerData, session);

                this._projectiles[i].draw(session);

                if (!this._projectiles[i].IsAlive) {
                    this._projectiles[i].sprite.parent.removeChild(this._projectiles[i].sprite);
                    this._projectiles.splice(i, 1);
                }
            }
        };
        return SmartWeapon;
    })();
    TypeScriptTD.SmartWeapon = SmartWeapon;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var WaveWeapon = (function () {
        function WaveWeapon() {
            this._sinceLastShot = 0;
            this._projectiles = new Array();
            this.waves = new Array();
        }
        WaveWeapon.prototype.CanFire = function () {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        };

        WaveWeapon.prototype.TargetAndFire = function (enemies, towerPos, gridCellSize, session) {
            var maxRange = this.TowerData.MaxRange * gridCellSize;
            var minRange = this.TowerData.MinRange * gridCellSize;

            var maxRSq = maxRange * maxRange;
            var minRSq = minRange * minRange;

            for (var enemyInstance in enemies) {
                var dist = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();

                var canTarget = ((this.TowerData.CanShootFlying && enemies[enemyInstance].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[enemyInstance].Data.CanFly));

                if (canTarget && dist <= maxRSq && dist >= minRSq) {
                    var w = new TypeScriptTD.WaveAmmo();

                    w.Epicenter = towerPos;
                    w.Speed = this.TowerData.ShotSpeed * gridCellSize;
                    w.MaxRadius = maxRange;
                    w.ShotTexture = this.ShotTexture;

                    this.waves.push(w);
                    this._sinceLastShot = 0;
                    return true;
                }
            }
            return false;
        };

        WaveWeapon.prototype.Update = function (elapsedTime, session) {
            if (this._sinceLastShot < this.TowerData.ReloadTimeMs)
                this._sinceLastShot += elapsedTime * 1000;

            for (var i = this.waves.length - 1; i >= 0; i--) {
                this.waves[i].Update(elapsedTime, this.TowerData, session);

                this.waves[i].draw(session);

                if (!this.waves[i].IsAlive) {
                    this.waves.splice(i, 1);
                }
            }
        };
        return WaveWeapon;
    })();
    TypeScriptTD.WaveWeapon = WaveWeapon;
})(TypeScriptTD || (TypeScriptTD = {}));
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
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen1 = (function (_super) {
        __extends(HelpScreen1, _super);
        function HelpScreen1() {
            _super.apply(this, arguments);
        }
        HelpScreen1.prototype.preload = function () {
            this.game.load.image("Help1", "assets/Textures/HelpScreens/Help1.jpg");
        };

        HelpScreen1.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help1");
            image.width = this.game.width;
            image.height = this.game.height;
        };

        HelpScreen1.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen1.prototype.onClick = function () {
            this.game.state.start('HelpScreen2');
        };
        return HelpScreen1;
    })(Phaser.State);
    TypeScriptTD.HelpScreen1 = HelpScreen1;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen2 = (function (_super) {
        __extends(HelpScreen2, _super);
        function HelpScreen2() {
            _super.apply(this, arguments);
        }
        HelpScreen2.prototype.preload = function () {
            this.game.load.image("Help2", "assets/Textures/HelpScreens/Help2.jpg");
        };

        HelpScreen2.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help2");
            image.width = this.game.width;
            image.height = this.game.height;
        };

        HelpScreen2.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen2.prototype.onClick = function () {
            this.game.state.start('HelpScreen3');
        };
        return HelpScreen2;
    })(Phaser.State);
    TypeScriptTD.HelpScreen2 = HelpScreen2;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen3 = (function (_super) {
        __extends(HelpScreen3, _super);
        function HelpScreen3() {
            _super.apply(this, arguments);
        }
        HelpScreen3.prototype.preload = function () {
            this.game.load.image("Help3", "assets/Textures/HelpScreens/Help3.jpg");
        };

        HelpScreen3.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help3");
            image.width = this.game.width;
            image.height = this.game.height;
        };

        HelpScreen3.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen3.prototype.onClick = function () {
            this.game.state.start('HelpScreen4');
        };
        return HelpScreen3;
    })(Phaser.State);
    TypeScriptTD.HelpScreen3 = HelpScreen3;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var HelpScreen4 = (function (_super) {
        __extends(HelpScreen4, _super);
        function HelpScreen4() {
            _super.apply(this, arguments);
        }
        HelpScreen4.prototype.preload = function () {
            this.game.load.image("Help4", "assets/Textures/HelpScreens/Help4.jpg");
        };

        HelpScreen4.prototype.create = function () {
            var image = this.game.add.image(0, 0, "Help4");
            image.width = this.game.width;
            image.height = this.game.height;
        };

        HelpScreen4.prototype.update = function () {
            this.game.input.onDown.add(this.onClick, this);
        };
        HelpScreen4.prototype.onClick = function () {
            this.game.state.start('MainMenuScreen');
        };
        return HelpScreen4;
    })(Phaser.State);
    TypeScriptTD.HelpScreen4 = HelpScreen4;
})(TypeScriptTD || (TypeScriptTD = {}));
var TypeScriptTD;
(function (TypeScriptTD) {
    var LevelSelectScreen = (function (_super) {
        __extends(LevelSelectScreen, _super);
        function LevelSelectScreen() {
            _super.apply(this, arguments);
            this.currentMap = 1;
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
        LevelSelectScreen.mapChosen = 1;
        return LevelSelectScreen;
    })(Phaser.State);
    TypeScriptTD.LevelSelectScreen = LevelSelectScreen;
})(TypeScriptTD || (TypeScriptTD = {}));
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
