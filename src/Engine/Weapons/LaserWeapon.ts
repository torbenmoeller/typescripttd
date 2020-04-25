module TypeScriptTD {


    export class LaserWeapon implements IWeapon {

        public ShotTexture: string;
        public ShotSprite: Phaser.Sprite = null;
        public TowerData: TowerData;
        public Level: number;

        private _beamAmmo: BeamAmmo = new BeamAmmo();
        private _sinceLastShot: number = 0;
        private direction: number = -1;


        CanFire() {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs && !this._beamAmmo.IsAlive;
        }

        TargetAndFire(enemies: Array<EnemyInstance>, towerPos: Vector2, gridCellSize: number, session: GameScreen) {
            var maxRange: number = this.TowerData.MaxRange * gridCellSize;
            var maxRSq: number = maxRange * maxRange;
            var minRange: number = this.TowerData.MinRange * gridCellSize;
            var minRSq: number = minRange * minRange;

            var towerCell:Cell = session.Grid.getCellAtPixel(towerPos);

            this.direction = -1;

            for (var enemyInstance in enemies) {
                var enemyCell: Cell = session.Grid.getCellAtPixel(enemies[enemyInstance].Position);

                if (enemyCell.X == towerCell.X || enemyCell.Y == towerCell.Y) {
                    var distSq: number = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();
                    if (distSq <= maxRSq && distSq >= minRSq) {
                        if (enemyCell.X == towerCell.X) {
                            this.direction = enemyCell.Y < towerCell.Y ? 0 : 1;
                        }
                        else {
                            this.direction = enemyCell.X < towerCell.X ? 3 : 2;
                        }
                    }
                }
            }

            if (this.direction >= 0) {
                this._beamAmmo.Reset();
                this._beamAmmo.StartPos = new Vector2(towerPos.x, towerPos.y);
                this._beamAmmo.EndPos = new Vector2(towerPos.x, towerPos.y);
                this._beamAmmo.Lifetime = this.TowerData.ShotSpeed; //  Speed = laser lifetime for laser weapons
                this._beamAmmo.Column = towerCell.X;
                this._beamAmmo.Row = towerCell.Y;
                this._beamAmmo.MaxRangeSq = maxRSq;

                switch (this.direction) {
                    // North
                    case 0:
                        this._beamAmmo.EndPos.y -= maxRange;
                        this._beamAmmo.IsVertical = true;
                        break;

                    // South
                    case 1:
                        this._beamAmmo.EndPos.y += maxRange;
                        this._beamAmmo.IsVertical = true;
                        break;

                    // East
                    case 2:
                        this._beamAmmo.EndPos.x += maxRange;
                        this._beamAmmo.IsVertical = false;
                        break;

                    // West
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
        }

        Update(elapsedSeconds: number, session: GameScreen) {
            if (this._sinceLastShot < this.TowerData.ReloadTimeMs)
                this._sinceLastShot += elapsedSeconds * 1000;

            if (this._beamAmmo.IsAlive) {
                this._beamAmmo.AliveTime += elapsedSeconds;

                if (this._beamAmmo.AliveTime >= this._beamAmmo.Lifetime) {
                    this._beamAmmo.IsAlive = false;
                    this._sinceLastShot = 0;
                }

                for (var enemyInstance in session.Enemies) {
                    var distSq: number = (session.Enemies[enemyInstance].Position.subtract(this._beamAmmo.StartPos)).getLengthSquared();

                    var enemyCell: Cell = session.Grid.getCellAtPixel(session.Enemies[enemyInstance].Position);
                    if (this._beamAmmo.IsVertical) {

                        if (enemyCell.X == this._beamAmmo.Column && distSq <= this._beamAmmo.MaxRangeSq) {
                            session.Enemies[enemyInstance].TakeDamage(this.TowerData.Id, this.TowerData.Damage * elapsedSeconds);
                            //Audio.PlaySfx(TowerData.HitSoundId);
                        }
                    }
                    else {

                        if (enemyCell.Y == this._beamAmmo.Row && distSq <= this._beamAmmo.MaxRangeSq) {
                            session.Enemies[enemyInstance].TakeDamage(this.TowerData.Id, this.TowerData.Damage * elapsedSeconds);
                            //Audio.PlaySfx(TowerData.HitSoundId);
                        }
                    }
                }
            }

            if (this._beamAmmo.IsAlive) {
                if (this.ShotSprite == null) {
                    this.ShotSprite = session.add.sprite(0, 0, this.ShotTexture);
                    var res: Vector2 = this._beamAmmo.StartPos.subtract(this._beamAmmo.EndPos);
                    var scale: number;

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
                        // North
                        case 0:
                            this.ShotSprite.rotation = Math.PI * 1.5;
                            break;
                        // South
                        case 1:
                            this.ShotSprite.rotation = Math.PI * 0.5;
                            this.ShotSprite.y = this._beamAmmo.EndPos.y + session.Grid.cellSize / 2;
                            break;
                        // East
                        case 2:
                            this.ShotSprite.rotation = 0;
                            this.ShotSprite.x = this._beamAmmo.EndPos.x + session.Grid.cellSize / 2;
                            break;
                    // West
                        case 3:
                            this.ShotSprite.rotation = Math.PI;
                            break;
                    }
                    console.log(this.ShotSprite.angle.toString());
                }
            }
            else {
                if (this.ShotSprite) {
                    this.ShotSprite.parent.removeChild(this.ShotSprite);
                    this.ShotSprite = null;
                }
            }
        }

    }
}



