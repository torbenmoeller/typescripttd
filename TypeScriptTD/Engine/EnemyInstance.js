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
