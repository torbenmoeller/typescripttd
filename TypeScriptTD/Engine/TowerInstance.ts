module TypeScriptTD {


    export class TowerInstance {

        public Position: Vector2;
        public Data: TowerData;
        public Weapon: IWeapon;
        public Sprite: Phaser.Sprite;
        public TotalCost: number;

        constructor() {
        }

        init() {
            if (this.Data.WeaponType == "DumbProjectile") {
                this.Weapon = new DumbWeapon();
            }
            //else if (this.Data.WeaponType == "GunWeapon") {
            //    this.Weapon = new GunWeapon();
            //}
            else if (this.Data.WeaponType == "LaserWeapon") {
                this.Weapon = new LaserWeapon();
            }
            else if (this.Data.WeaponType == "SmartProjectile") {
                this.Weapon = new SmartWeapon();
            }
            else if (this.Data.WeaponType == "RadialShockwave") {
                this.Weapon = new WaveWeapon();
            }
            this.Weapon.ShotTexture = this.Data.ShotTexture;
            this.Weapon.TowerData = this.Data;
            this.TotalCost = this.Data.Cost;
        }

        Update(elapsedTime: number, gs: GameScreen) {

            //BuildTime
            //Selling
            //Weapon Update
            this.Weapon.Update(elapsedTime, gs);
            if (this.Weapon.CanFire()) {
                if (this.Weapon.TargetAndFire(gs.Enemies, this.Position, gs.Grid.cellSize, gs)) {
                    //Todo Audio 4/4
                    //gs["fx" + this.Data.ShotSoundId].play();
                }
            }

        }

    }
}



