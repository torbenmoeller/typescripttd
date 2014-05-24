module TypeScriptTD {


    export class WaveAmmo implements IAmmo  {

        public Epicenter: Vector2;
        public CurrentRadius: number = 0;
        public MaxRadius: number;
        public Speed: number;

        public sprite: Phaser.Sprite = null;
        public IsAlive: boolean = true;
        public ShotTexture: string;

        constructor() {
        }


        Update(elapsedTime: number, data: TowerData, session: GameScreen) {
            this.CurrentRadius += this.Speed * elapsedTime;

            if (this.CurrentRadius >= this.MaxRadius) {
                this.IsAlive = false;
                this.sprite.parent.removeChild(this.sprite);
            }

             var rsq:number = this.CurrentRadius * this.CurrentRadius;

            for (var enemyInstance in session.Enemies)
            {
                if ((session.Enemies[enemyInstance].Position.subtract(this.Epicenter)).getLengthSquared() <= rsq && ((session.Enemies[enemyInstance].Data.CanFly && data.CanShootFlying) || (!session.Enemies[enemyInstance].Data.CanFly && data.CanShootLand))) {
                    session.Enemies[enemyInstance].TakeDamage(data.Id, data.Damage * elapsedTime);
                    //Audio.PlaySfx(data.HitSoundId);
                }
            }
        }
        originalWidth:number = 0;
        draw(session: GameScreen) {

            if (!this.sprite) {
                this.sprite = session.game.add.sprite(this.Epicenter.x + (session.Grid.cellSize / 2), this.Epicenter.y + (session.Grid.cellSize / 2), this.ShotTexture);
                this.originalWidth = this.sprite.width;
                this.sprite.anchor.set(0.5, 0.5);
            }
            var scale: number = this.CurrentRadius / this.originalWidth;
            this.sprite.scale.set(scale, scale);
        }
    }
}



