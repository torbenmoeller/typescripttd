var TypeScriptTD;
(function (TypeScriptTD) {
    var EnemyData = (function () {
        function EnemyData() {
        }
        EnemyData.fromJson = function (json) {
            var obj = JSON.parse(json);
            var e = new EnemyData();

            e.Id = obj["Id"];
            e.CanFly = obj["CanFly"] == "false" ? false : true;
            e.Speed = parseFloat(obj["Speed"]);
            e.Health = parseInt(obj["Health"]);
            e.Worth = parseInt(obj["Worth"]);
            e.Texture = obj["Texture"];
            e.DeathSoundId = obj["DeathSoundId"];
            e.SpawnSoundId = obj["SpawnSoundId"];

            return e;
        };
        return EnemyData;
    })();
    TypeScriptTD.EnemyData = EnemyData;
})(TypeScriptTD || (TypeScriptTD = {}));
