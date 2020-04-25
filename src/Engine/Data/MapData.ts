module TypeScriptTD {


    export class MapData {

        public MapId: string;
        public FriendlyName: string;
        public StartingCash: number;
        public BackgroundTexture: string;
        public NumLives: number;
        public FocusColor: string;
        public VictorySoundId: string;
        public DefeatSoundId: string;
        public WaveStartSoundId: string;
        public MapStartSoundId: string;
        public Waves: Array<WaveData> = new Array<WaveData>();


        public StartX: number = 0;
        public StartY: number = 5;
        public EndX: number = 18;
        public EndY: number = 5;

        public static fromJson(json: string) {
            var obj = JSON.parse(json);
            var m: MapData = new MapData();


            m.MapId = obj["MapId"];
            m.FriendlyName = obj["FriendlyName"];
            m.StartingCash = parseInt(obj["StartingCash"]);
            m.BackgroundTexture = obj["BackgroundTexture"];
            m.NumLives = parseInt(obj["NumLives"]);
            m.FocusColor = obj["FocusColor"];
            m.VictorySoundId = obj["VictorySoundId"];
            m.DefeatSoundId = obj["DefeatSoundId"];
            m.WaveStartSoundId = obj["WaveStartSoundId"];
            m.MapStartSoundId = obj["MapStartSoundId"];

            for (var w in obj["Waves"]) {
                var wave: WaveData = WaveData.fromJson(JSON.stringify(obj["Waves"][w]));
                m.Waves.push(wave);
            }


            return m;
        }
    }
}
