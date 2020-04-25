module TypeScriptTD {


    export class TowerData {

        public Id: string;
        public WeaponType: string;
        public Level: number;
        public Cost: number;
        public TimeToBuildMs: number;
        public TimeToSellMs: number;
        public Damage: number;
        public ReloadTimeMs: number;
        public MinRange: number;
        public MaxRange: number;
        public Texture: string;
        public ShotTexture: string;
        public ShotSpeed: number;
        public CanShootFlying: boolean;
        public CanShootLand: boolean;
        public HitTexture: string;
        public HitAnimationFPS: number;
        public BuildSoundId: string;
        public SellSoundId: string;
        public UpgradeSoundId: string;
        public ShotSoundId: string;
        public HitSoundId: string;

        public static fromJson(json: string) {
            var obj = JSON.parse(json);
            var t: TowerData = new TowerData();

            t.Id = obj["Id"];
            t.WeaponType = obj["WeaponType"];
            t.Level = parseInt(obj["Level"]);
            t.Cost = parseInt(obj["Cost"]);
            t.TimeToBuildMs = parseInt(obj["TimeToBuildMs"]);
            t.TimeToSellMs = parseInt(obj["TimeToSellMs"]);
            t.Damage = parseInt(obj["Damage"]);
            t.ReloadTimeMs = parseInt(obj["ReloadTimeMs"]);
            t.MinRange = parseInt(obj["MinRange"]);
            t.MaxRange = parseInt(obj["MaxRange"]);
            t.Texture = obj["Texture"];
            t.ShotTexture = obj["ShotTexture"];
            t.ShotSpeed = parseInt(obj["ShotSpeed"]);
            t.CanShootFlying = obj["CanShootFlying"] == "false" ? false : true;
            t.CanShootLand = obj["CanShootLand"] == "false" ? false : true;
            t.HitTexture = obj["HitTexture"];
            t.HitAnimationFPS = parseInt(obj["HitAnimationFPS"]);
            t.BuildSoundId = obj["BuildSoundId"];
            t.SellSoundId = obj["SellSoundId"];
            t.UpgradeSoundId = obj["UpgradeSoundId"];
            t.ShotSoundId = obj["ShotSoundId"];
            t.HitSoundId = obj["HitSoundId"];

            return t;
        }

    }
}



