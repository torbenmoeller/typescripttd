module TypeScriptTD {


    export class Ammo {
        public Position: Vector2 ;
        public Direction: Vector2;
        public IsAlive: boolean = true;
        public IsHit:boolean =false;
        public Speed: number;

        public DistanceTravelled: number = 0;

        
    }
}



