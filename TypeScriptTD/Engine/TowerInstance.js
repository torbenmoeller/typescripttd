var TypeScriptTD;
(function (TypeScriptTD) {
    var TowerInstance = (function () {
        function TowerInstance() {
        }
        TowerInstance.prototype.init = function () {
            if (this.Data.WeaponType == "DumbProjectile") {
                this.Weapon = new TypeScriptTD.DumbWeapon();
            } else if (this.Data.WeaponType == "LaserWeapon") {
                this.Weapon = new TypeScriptTD.LaserWeapon();
            } else if (this.Data.WeaponType == "SmartProjectile") {
                this.Weapon = new TypeScriptTD.SmartWeapon();
            } else if (this.Data.WeaponType == "RadialShockwave") {
                this.Weapon = new TypeScriptTD.WaveWeapon();
            }
            this.Weapon.ShotTexture = this.Data.ShotTexture;
            this.Weapon.TowerData = this.Data;
            this.TotalCost = this.Data.Cost;
        };

        TowerInstance.prototype.Update = function (elapsedTime, gs) {
            this.Weapon.Update(elapsedTime, gs);
            if (this.Weapon.CanFire()) {
                if (this.Weapon.TargetAndFire(gs.Enemies, this.Position, gs.Grid.cellSize, gs)) {
                }
            }
        };
        return TowerInstance;
    })();
    TypeScriptTD.TowerInstance = TowerInstance;
})(TypeScriptTD || (TypeScriptTD = {}));
