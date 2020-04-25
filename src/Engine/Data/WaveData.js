var TypeScriptTD;
(function (TypeScriptTD) {
    var WaveData = (function () {
        function WaveData() {
            this.WarmUpTime = 10;
            this.Creep = new Array();
        }
        WaveData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var w = new WaveData();
            w.WorthMod = parseInt(obj["WorthMod"]);
            w.HealthMod = parseInt(obj["HealthMod"]);
            if (Object.prototype.toString.call(obj["Creep"]) === '[object Array]') {
                for (var c in obj["Creep"]) {
                    var creep = TypeScriptTD.CreepData.fromJson(JSON.stringify(obj["Creep"][c]));
                    w.Creep.push(creep);
                }
            }
            else {
                var creep = TypeScriptTD.CreepData.fromJson(JSON.stringify(obj["Creep"]));
                w.Creep.push(creep);
            }
            return w;
        };
        return WaveData;
    }());
    TypeScriptTD.WaveData = WaveData;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=WaveData.js.map