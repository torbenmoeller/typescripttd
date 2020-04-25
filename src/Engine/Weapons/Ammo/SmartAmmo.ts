module TypeScriptTD {


    export class SmartAmmo extends Ammo implements IAmmo  {

        public Target: EnemyInstance;
        public sprite: Phaser.Sprite = null;
        public ShotTexture: string;
        private rotation: number = 0;
        
        Update(elapsedTime: number, data: TowerData, session: GameScreen) {
            if (this.IsHit) {
                this.IsAlive = false;
                //}
            }
            else {
                var v = (this.Target.Position.subtract(this.Position));
                v = v.normalize();

                var rot = Math.atan2(v.y, v.x);
                this.rotation =  rot + Math.PI * 0.5;
                
                v = v.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize)) {
                    this.IsAlive = false;
                }
                else {
                    var halfCell: number = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    if ((this.Target.Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                        this.Target.TakeDamage(data.Id, data.Damage);
                        //Audio.PlaySfx(data.HitSoundId);
                        this.IsHit = true;
                        this.IsAlive = false;
                    }
                }
            }
        }

        originalWidth: number = 0;
        draw(session: GameScreen) {

            if (!this.sprite) {
                this.sprite = session.game.add.sprite(this.Position.x + (session.Grid.cellSize / 2), this.Position.y + (session.Grid.cellSize / 2), this.ShotTexture);
                this.originalWidth = this.sprite.width;
                this.sprite.anchor.set(0.5, 0.5);
            }
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;
            this.sprite.rotation = this.rotation;
        }
    }
}



