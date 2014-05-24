module TypeScriptTD {


    export class WaveWeapon implements IWeapon {

        public ShotTexture: string;
        public TowerData: TowerData;
        public Level: number;

        private _sinceLastShot: number = 0;

        private _projectiles: Array<DumbAmmo> = new Array<DumbAmmo>();

        waves: Array<WaveAmmo> = new Array<WaveAmmo> ();


        CanFire() {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        }

        TargetAndFire(enemies: Array<EnemyInstance>, towerPos: Vector2, gridCellSize: number, session: GameScreen) {
            var maxRange:number = this.TowerData.MaxRange * gridCellSize;
            var minRange: number = this.TowerData.MinRange * gridCellSize;

            var maxRSq = maxRange * maxRange;
            var minRSq = minRange * minRange;

            for(var enemyInstance in enemies)
            {
                var dist: number = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();

                var canTarget = ((this.TowerData.CanShootFlying && enemies[enemyInstance].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[enemyInstance].Data.CanFly));

                if (canTarget && dist <= maxRSq && dist >= minRSq) {
            		var w:WaveAmmo = new WaveAmmo();

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
        }

        Update(elapsedTime: number, session: GameScreen) {
            if (this._sinceLastShot < this.TowerData.ReloadTimeMs)
                this._sinceLastShot += elapsedTime * 1000;

            for (var i = this.waves.length-1; i >= 0; i--)
            {
                this.waves[i].Update(elapsedTime, this.TowerData, session);

                //Draw
                this.waves[i].draw(session);

                if (!this.waves[i].IsAlive) {
                    this.waves.splice(i, 1);
                }
            }
            
        }
    }
}



