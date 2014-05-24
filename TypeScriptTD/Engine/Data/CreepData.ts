module TypeScriptTD {


    export class CreepData {

       public CreepId: string;
       public Entrance: string;
       public Exit: string;
       public Number: number;
       public TimeBetweenMs: number;


        public static fromJson(json: string) {
            var obj = JSON.parse(json);
            var c: CreepData = new CreepData();

            c.CreepId = obj["CreepId"];
            c.Entrance = obj["Entrance"];
            c.Exit = obj["Exit"];
            c.Number = parseInt(obj["Number"]);
            c.TimeBetweenMs = parseInt(obj["TimeBetweenMs"]);

            return c;
        }
    }
}
