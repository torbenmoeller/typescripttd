module TypeScriptTD {


    export class WaveData {

        public WorthMod: number;
        public HealthMod: number;
        public WarmUpTime: number = 10;
        public Creep: Array<CreepData> = new Array<CreepData>();

        public static fromJson(json: string) {
            var obj = JSON.parse(json);
            var w: WaveData = new WaveData();

            w.WorthMod = parseInt(obj["WorthMod"]);
            w.HealthMod = parseInt(obj["HealthMod"]);

            if (Object.prototype.toString.call(obj["Creep"]) === '[object Array]') {
                for (var c in obj["Creep"]) {
                    var creep = CreepData.fromJson(JSON.stringify(obj["Creep"][c]));
                    w.Creep.push(creep);
                }
            }
            else {
                var creep = CreepData.fromJson(JSON.stringify(obj["Creep"]));
                w.Creep.push(creep);
            }


            return w;
        }

    }
}
