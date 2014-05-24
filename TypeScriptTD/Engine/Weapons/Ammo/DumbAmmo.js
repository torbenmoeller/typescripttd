var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var DumbAmmo = (function (_super) {
        __extends(DumbAmmo, _super);
        function DumbAmmo(session, shotTexture) {
            _super.call(this);
            this.sprite = session.add.sprite(-20, -20, shotTexture);
            this.sprite.anchor.set(0.5, 0.5);
        }
        DumbAmmo.prototype.Update = function (elapsedTime, data, session) {
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;

            if (this.IsHit) {
                this.IsAlive = false;
            } else {
                var v = this.Direction.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize)) {
                    this.IsAlive = false;
                } else {
                    var halfCell = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    for (var e in session.Enemies) {
                        if ((session.Enemies[e].Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                            session.Enemies[e].TakeDamage(data.Id, data.Damage);

                            this.IsHit = true;

                            this.IsAlive = false;

                            break;
                        }
                    }
                }
            }
        };
        return DumbAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.DumbAmmo = DumbAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
