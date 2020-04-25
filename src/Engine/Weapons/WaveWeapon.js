var TypeScriptTD;
(function (TypeScriptTD) {
    var WaveWeapon = (function () {
        function WaveWeapon() {
            this._sinceLastShot = 0;
            this._projectiles = new Array();
            this.waves = new Array();
        }
        WaveWeapon.prototype.CanFire = function () {
            return this._sinceLastShot >= this.TowerData.ReloadTimeMs;
        };
        WaveWeapon.prototype.TargetAndFire = function (enemies, towerPos, gridCellSize, session) {
            var maxRange = this.TowerData.MaxRange * gridCellSize;
            var minRange = this.TowerData.MinRange * gridCellSize;
            var maxRSq = maxRange * maxRange;
            var minRSq = minRange * minRange;
            for (var enemyInstance in enemies) {
                var dist = (enemies[enemyInstance].Position.subtract(towerPos)).getLengthSquared();
                var canTarget = ((this.TowerData.CanShootFlying && enemies[enemyInstance].Data.CanFly) || (this.TowerData.CanShootLand && !enemies[enemyInstance].Data.CanFly));
                if (canTarget && dist <= maxRSq && dist >= minRSq) {
                    var w = new TypeScriptTD.WaveAmmo();
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
        };
        WaveWeapon.prototype.Update = function (elapsedTime, session) {
            if (this._sinceLastShot < this.TowerData.ReloadTimeMs)
                this._sinceLastShot += elapsedTime * 1000;
            for (var i = this.waves.length - 1; i >= 0; i--) {
                this.waves[i].Update(elapsedTime, this.TowerData, session);
                //Draw
                this.waves[i].draw(session);
                if (!this.waves[i].IsAlive) {
                    this.waves.splice(i, 1);
                }
            }
        };
        return WaveWeapon;
    }());
    TypeScriptTD.WaveWeapon = WaveWeapon;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=WaveWeapon.js.map