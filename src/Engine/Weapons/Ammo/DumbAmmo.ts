module TypeScriptTD {


    export class DumbAmmo extends Ammo implements IAmmo {


        public sprite: Phaser.Sprite;

        constructor(session: GameScreen, shotTexture:string) {
            super();
            this.sprite = session.add.sprite(-20, -20, shotTexture);
            this.sprite.anchor.set(0.5, 0.5);
        }
        Update(elapsedTime: number, data: TowerData, session: GameScreen) {
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;

            if (this.IsHit) {
                //if (HitAnimation != null && HitAnimation.IsPlaying) {
                //    HitAnimation.Update(elapsedSeconds);
                //}
                //else {
                    this.IsAlive = false;
                //}
            }
            else {
                var v = this.Direction.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize )) {
                    this.IsAlive = false;
                }
                else {
                    var halfCell:number = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    for (var e in session.Enemies) 
                    {
                        if ((session.Enemies[e].Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                            session.Enemies[e].TakeDamage(data.Id, data.Damage);
                            //Audio.PlaySfx(data.HitSoundId);
                            //if (HitAnimation != null) {
                               this.IsHit = true;
                                //HitAnimation.Play(data.AnimationFps);
                            //}
                            //else {
                                this.IsAlive = false;
                            //}
                            break;
                        }
                    }
                }
            }
        }
    }



}