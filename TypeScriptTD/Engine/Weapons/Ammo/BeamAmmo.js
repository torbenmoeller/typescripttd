var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var BeamAmmo = (function (_super) {
        __extends(BeamAmmo, _super);
        function BeamAmmo() {
            _super.apply(this, arguments);
            this.IsAlive = false;
        }
        BeamAmmo.prototype.Update = function (elapsedTime, data, session) {
        };

        BeamAmmo.prototype.Reset = function () {
            this.IsAlive = true;
            this.AliveTime = 0;
        };
        return BeamAmmo;
    })(TypeScriptTD.Ammo);
    TypeScriptTD.BeamAmmo = BeamAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
