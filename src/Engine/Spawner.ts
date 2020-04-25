
module TypeScriptTD {


    export class SpawnRun {
        public HealthMod: number;
        public Data: EnemyData;
        public ResumeEnemyId: string;

        public TimeToNext: number;
        public TimeBetween: number;
        public TotalToMake: number;
        public NumCreated: number;

        public SpawnPoint: Vector2;
        public DespawnPoint: Vector2;
        public StartPoint: Vector2;

        public StartX: number;
        public StartY: number;
        public DestX: number;
        public DestY: number;
    }

    export class Spawner {


        public _runs: Array<SpawnRun> = new Array<SpawnRun>();

        public IsSpawning: boolean;


        gs: GameScreen;
        constructor(gs: GameScreen) {
            this.gs = gs;
        }


        update(elapsedtime: number, session: GameScreen) {

            var numFinished: number = 0;

            for (var r in this._runs) {
                var run: SpawnRun = this._runs[r];
                if (run.NumCreated < run.TotalToMake) {
                    run.TimeToNext -= elapsedtime;
                    if (run.TimeToNext <= 0) {
                        var enemy = new EnemyInstance(session);
                        enemy.Data = run.Data;
                        enemy.Health = enemy.Data.Health * run.HealthMod;
                        enemy.Stage = PathStage.GoingToStart;
                        //enemy.escaped = false;
                        enemy.Position = run.SpawnPoint;
                        enemy.DestX = run.DestX;
                        enemy.DestY = run.DestY;
                        enemy.StartPoint = run.StartPoint;
                        enemy.StartX = run.StartX;
                        enemy.StartY = run.StartY;
                        enemy.DespawnPoint = run.DespawnPoint;


                        var img: Phaser.Sprite = this.gs.game.add.sprite(enemy.Position.x, enemy.Position.y, enemy.Data.Texture);
                        img.anchor.set(0.5, 0.5);
                        enemy.Sprite = img;

                        session.Enemies.push(enemy);

                        //Audio.PlaySfx(enemy.Data.SpawnSoundId);

                        run.NumCreated++;
                        run.TimeToNext = run.TimeBetween;
                    }
                }
                else {
                    numFinished++;
                }
            }

            if (numFinished >= this._runs.length) {
                this.IsSpawning = false;
                this._runs = new Array<SpawnRun>();
            }

        }


        Start(currentWave: WaveData, session: GameScreen) {
            // build a list of spawnruns with timetonext set to the start offset
            for (var w in currentWave.Creep) {
                var wp: CreepData = currentWave.Creep[w];
                var run = new SpawnRun();

                run.Data = EnemyData.fromJson(this.gs.cache.getText(wp.CreepId + "data").toString());
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
                run.SpawnPoint = run.StartPoint.subtract(new Vector2(session.Grid.cellSize*3, 0));
                run.DespawnPoint = session.Grid.getCellCenter(run.DestX, run.DestY);
                run.DespawnPoint.x = 800 + session.Grid.cellSize;


                this._runs.push(run);
            }
            this.IsSpawning = true;
        }
    }
}



