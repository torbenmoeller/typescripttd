module TypeScriptTD {


    export class EnemyData {

        public Id: string;
        public CanFly: boolean;
        public Speed: number;
        public Health: number;
        public Worth: number;
        public Texture: string;
        public DeathSoundId: string;
        public SpawnSoundId: string;

        public static fromJson(json: string) {
            var obj = JSON.parse(json);
            var e: EnemyData = new EnemyData();

            e.Id = obj["Id"];
            e.CanFly = obj["CanFly"] == "false" ? false: true;
            e.Speed = parseFloat(obj["Speed"]);
            e.Health = parseInt(obj["Health"]);
            e.Worth = parseInt( obj["Worth"]);
            e.Texture = obj["Texture"];
            e.DeathSoundId = obj["DeathSoundId"];
            e.SpawnSoundId = obj["SpawnSoundId"];

            return e;
        }
        //public Dictionary<string, ResistanceData> Resistances = new Dictionary<string, ResistanceData>();

    }
}



