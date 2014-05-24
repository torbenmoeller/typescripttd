module TypeScriptTD {


    export class DumbWeapon implements IWeapon {

        public ShotTexture: string;
        public TowerData: TowerData;
        public Level: number;

        private _sinceLastShot: number = 0;

        private _projectiles: Array<DumbAmmo> = new Array<DumbAmmo>();

        CanFire() {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        }

        TargetAndFire(enemies: Array<EnemyInstance>, towerPos: Vector2, gridCellSize: number, session:GameScreen) {
            var closest: EnemyInstance;
            var distSq: number = 2147483647;

            var maxRange: number = gridCellSize * this.TowerData.MaxRange;
            maxRange *= maxRange;

            var minRange: number = gridCellSize * this.TowerData.MinRange;
            minRange *= minRange;

            for (var e in enemies) {
                if ((this.TowerData.CanShootFlying && enemies[e].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[e].Data.CanFly)) {
                    var d: number = (enemies[e].Position.subtract(towerPos)).getLengthSquared();

                    if (d < distSq && d <= maxRange && d >= minRange) {
                        closest = enemies[e];
                        distSq = d;
                    }
                }
            }
            if (closest != null) {
                var item: DumbAmmo = new DumbAmmo(session, this.ShotTexture);
                item.IsAlive = true;
                item.IsHit = false;
                item.DistanceTravelled = 0;
                item.Position = towerPos.add(new Vector2(gridCellSize/2, gridCellSize/2));
                item.Speed = this.TowerData.ShotSpeed * gridCellSize;
                item.Direction = closest.CurrentDirection.multiply(closest.Data.Speed * gridCellSize);
                item.Direction = item.Direction.add(closest.Position).subtract(item.Position).divide(item.Speed);
                item.Direction = item.Direction.normalize();
                var rot = Math.atan2(item.Direction.y, item.Direction.x);
                item.sprite.rotation = rot + Math.PI *0.5;

                this._projectiles.push(item);
                this._sinceLastShot = 0;
                return true;
            }
            return false;

        }

        Update(elapsedTime: number, session: GameScreen) {
            this._sinceLastShot += elapsedTime * 1000;

            for (var projectile in this._projectiles) {
                this._projectiles[projectile].Update(elapsedTime, this.TowerData, session);
            }


            for (var i = this._projectiles.length - 1; i >= 0; i--) {
                var item: DumbAmmo = this._projectiles[i];
                if (!item.IsAlive) {
                    item.sprite.parent.removeChild(item.sprite);
                    this._projectiles.splice(i,1);
                }
            }

        }

    }
}



