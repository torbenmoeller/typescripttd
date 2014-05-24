var TypeScriptTD;
(function (TypeScriptTD) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.add = function (vector) {
            var a = this.x + vector.x;
            var b = this.y + vector.y;
            return new Vector2(a, b);
        };
        Vector2.prototype.subtract = function (vector) {
            var a = this.x - vector.x;
            var b = this.y - vector.y;
            return new Vector2(a, b);
        };
        Vector2.prototype.multiply = function (value) {
            var a = this.x * value;
            var b = this.y * value;
            return new Vector2(a, b);
        };

        Vector2.prototype.divide = function (value) {
            var a = this.x / value;
            var b = this.y / value;
            return new Vector2(a, b);
        };

        Vector2.prototype.getLength = function () {
            var a = this.x * this.x;
            var b = this.y * this.y;
            return Math.sqrt(a + b);
        };
        Vector2.prototype.normalize = function () {
            var a = this.x / (this.getLength() + 0.00000000001);
            var b = this.y / (this.getLength() + 0.00000000001);
            return new Vector2(a, b);
        };
        Vector2.prototype.getLengthSquared = function () {
            return this.getLength() * this.getLength();
        };
        return Vector2;
    })();
    TypeScriptTD.Vector2 = Vector2;
})(TypeScriptTD || (TypeScriptTD = {}));
//# sourceMappingURL=Vector2.js.map
