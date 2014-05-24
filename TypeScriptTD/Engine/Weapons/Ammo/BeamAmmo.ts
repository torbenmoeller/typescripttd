module TypeScriptTD {


    export class BeamAmmo extends Ammo implements IAmmo {

        public StartPos: Vector2;
        public EndPos: Vector2;

        public MaxRangeSq: number;
        public Lifetime: number;
        public AliveTime: number;

        public IsAlive: boolean = false;
        public IsVertical: boolean;

        public CellDrawIncrement: Vector2;

        public NumCells: number;
        public Row: number;
        public Column: number;

        Update(elapsedTime: number, data, session: GameScreen) { }


        Reset()
        {
        this.IsAlive = true;
        this.AliveTime = 0;
    }
    }
}



