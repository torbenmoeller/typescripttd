var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var SmartAmmo = (function (_super) {
        __extends(SmartAmmo, _super);
        function SmartAmmo() {
            _super.apply(this, arguments);
            this.sprite = null;
            this.rotation = 0;
            this.originalWidth = 0;
        }
        SmartAmmo.prototype.Update = function (elapsedTime, data, session) {
            if (this.IsHit) {
                this.IsAlive = false;
            } else {
                var v = (this.Target.Position.subtract(this.Position));
                v = v.normalize();

                var rot = Math.atan2(v.y, v.x);
                this.rotation = rot + Math.PI * 0.5;

                v = v.multiply(elapsedTime * this.Speed);
                this.Position = this.Position.add(v);
                this.DistanceTravelled += v.getLength();

                if (this.DistanceTravelled >= (data.MaxRange * session.Grid.cellSize)) {
                    this.IsAlive = false;
                } else {
                    var halfCell = session.Grid.cellSize / 2;
                    halfCell *= halfCell;

                    if ((this.Target.Position.subtract(this.Position)).getLengthSquared() <= halfCell) {
                        this.Target.TakeDamage(data.Id, data.Damage);

                        this.IsHit = true;
                        this.IsAlive = false;
                    }
                }
            }
        };

        SmartAmmo.prototype.draw = function (session) {
            if (!this.sprite) {
                this.sprite = session.game.add.sprite(this.Position.x + (session.Grid.cellSize / 2), this.Position.y + (session.Grid.cellSize / 2), this.ShotTexture);
                this.originalWidth = this.sprite.width;
                this.sprite.anchor.set(0.5, 0.5);
            }
            this.sprite.x = this.Position.x;
            this.sprite.y = this.Position.y;
            this.sprite.rotation = this.rotation;
        };
        return SmartAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.SmartAmmo = SmartAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
