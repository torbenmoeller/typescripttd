module TypeScriptTD {


    export class Vector2 {
        public x: number;
        public y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        public add(vector: Vector2) {
            var a: number = this.x + vector.x;
            var b: number = this.y + vector.y;
            return new Vector2(a, b);
        }
        public subtract(vector: Vector2) {
            var a: number = this.x - vector.x;
            var b: number = this.y - vector.y;
            return new Vector2(a, b);
        }
        public multiply(value: number) {
            var a: number = this.x * value;
            var b: number = this.y * value;
            return new Vector2(a, b);
        }

        public divide(value: number) {
            var a: number = this.x / value;
            var b: number = this.y / value;
            return new Vector2(a, b);
        }

        public getLength() {
            var a: number = this.x *this.x;
            var b: number = this.y * this.y;
            return Math.sqrt(a + b);
        }
        public normalize() {
            var a: number = this.x / (this.getLength()+0.00000000001);
            var b: number = this.y / (this.getLength()+0.00000000001);
            return new Vector2(a, b);
        }
        public getLengthSquared() {            
            return this.getLength() * this.getLength();
        }
    }
}