var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeScriptTD;
(function (TypeScriptTD) {
    var BeamAmmo = (function (_super) {
        __extends(BeamAmmo, _super);
        function BeamAmmo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.IsAlive = false;
            return _this;
        }
        BeamAmmo.prototype.Update = function (elapsedTime, data, session) { };
        BeamAmmo.prototype.Reset = function () {
            this.IsAlive = true;
            this.AliveTime = 0;
        };
        return BeamAmmo;
    }(TypeScriptTD.Ammo));
    TypeScriptTD.BeamAmmo = BeamAmmo;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=BeamAmmo.js.map