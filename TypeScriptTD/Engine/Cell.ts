module TypeScriptTD {


    export class Cell {

        public X: number;
        public Y: number;

        public buildable: boolean;
        public towerInstance: TowerInstance;

        constructor(x: number, y: number) {
            this.X = x;
            this.Y = y;
            this.buildable = true;
        }

        public setTower(towerInstance: TowerInstance) {
            this.towerInstance = towerInstance;
            this.buildable = false;
        }
    }
}



