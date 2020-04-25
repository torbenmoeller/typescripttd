module TypeScriptTD {

    export enum PathStage {
        GoingToStart,
        GoingToDest,
        GoingToDespawn
    }
    export class EnemyInstance {

        public Data: EnemyData;
        public Health: number;

        public Position: Vector2;
        public Stage: PathStage = PathStage.GoingToStart;
        public Escaped: boolean = false;

        CurrentDirection: Vector2;
        public StartPoint: Vector2;
        public DespawnPoint: Vector2;


        public Sprite: Phaser.Sprite;

        gs: GameScreen;
        constructor(gs: GameScreen) {
            this.gs = gs;
        }

        public StartX: number;
        public StartY: number;
        public DestX: number;
        public DestY: number;


        Path: Path;


        update(elapsedtime: number) {
            var targetPoint: Vector2;

            //getTarget
            switch (this.Stage) {
                case PathStage.GoingToStart:
                    targetPoint = this.StartPoint;
                    break;
                case PathStage.GoingToDest:
                    if (this.Path.PathFound && this.Path.Nodes.length > 0) {
                        targetPoint = this.gs.Grid.getCellCenter(this.Path.Nodes[0].Cell.X, this.Path.Nodes[0].Cell.Y)
                    }
                    else {
                        targetPoint = this.Position;
                    }
                    break;
                case PathStage.GoingToDespawn:
                    targetPoint = this.DespawnPoint;
                    break;
            }

            //Movement
            this.CurrentDirection = targetPoint.subtract(this.Position);
            this.CurrentDirection = this.CurrentDirection.normalize();
            var movement: Vector2 = this.CurrentDirection.multiply(this.Data.Speed * this.gs.Grid.cellSize * elapsedtime) ;
            this.Position = this.Position.add(movement);

            this.Sprite.x = this.Position.x;
            this.Sprite.y = this.Position.y;
            this.Sprite.bringToTop();

            //updateTargetIfReachedDestination
            if (targetPoint.subtract(this.Position).getLengthSquared() <= this.gs.Grid.cellSize) {// * this.Data.cellSize) {
                switch (this.Stage) {
                    case PathStage.GoingToStart:
                        this.Stage = PathStage.GoingToDest;
                        this.Path = this.gs.Paths.GetPath(this.gs.Grid.getCell(this.StartX, this.StartY), this.gs.Grid.getCell(this.DestX, this.DestY), this.Data.CanFly);
                        break;
                    case PathStage.GoingToDest:
                        if (this.Path.PathFound && this.Path.Nodes.length > 0) {
                            if (this.Path.Nodes.length == 1) {
                                this.Stage = PathStage.GoingToDespawn;
                                this.gs.Paths.ReleasePath(this.Path);
                            }
                            else {
                                this.Path.CompleteNode(this.Path.Nodes[0]);
                            }
                        }
                        break;
                    case PathStage.GoingToDespawn:
                        //Escaped
                        //Health = 0;
                        this.Escaped = true;

                        break;
                }

            }
        }






        TakeDamage(towerFullName: string, damage: number) {
            this.Health -= damage;
        }

    }
}



