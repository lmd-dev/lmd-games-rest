var Game = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Game(data) {
        if (data === void 0) { data = null; }
        this._id = 0;
        this._name = "";
        this._releaseYear = 0;
        this._picture = "";
        this.fromArray(data);
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () { return this._id; },
        set: function (value) { this._id = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Game.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Game.prototype, "releaseYear", {
        get: function () { return this._releaseYear; },
        set: function (value) { this._releaseYear = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Game.prototype, "picture", {
        get: function () { return this._picture; },
        set: function (value) { this._picture = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    /**
     * Imports data from JS object
     * @param data
     */
    Game.prototype.fromArray = function (data) {
        if (data) {
            this._id = data.id !== undefined ? data.id : this._id;
            this._name = data.name !== undefined ? data.name : this._name;
            this._releaseYear = data.releaseYear !== undefined ? data.releaseYear : this._releaseYear;
            this._picture = data.picture !== undefined ? decodeURIComponent(data.picture) : this._picture;
        }
    };
    /**
     * Exports data to JS object
     */
    Game.prototype.toArray = function () {
        return {
            id: this._id,
            name: this._name,
            releaseYear: this._releaseYear,
            picture: encodeURIComponent(this._picture)
        };
    };
    return Game;
}());
//# sourceMappingURL=game.js.map