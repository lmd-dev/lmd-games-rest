var Studio = /** @class */ (function () {
    /**
     * Constructor
     * @param data
     */
    function Studio(data) {
        if (data === void 0) { data = null; }
        this._id = 0;
        this._name = "";
        this._games = new Array();
        this.fromArray(data);
    }
    Object.defineProperty(Studio.prototype, "id", {
        get: function () { return this._id; },
        set: function (value) { this._id = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Studio.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Studio.prototype, "games", {
        get: function () { return this._games; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Imports data from JS object
     * @param data
     */
    Studio.prototype.fromArray = function (data) {
        if (data) {
            this._id = data.id !== undefined ? data.id : this._id;
            this._name = data.name !== undefined ? data.name : this._name;
            if (data.games)
                this._games = data.games.map(function (game) { return new Game(game); });
        }
    };
    /**
     * Exports data to JS object
     */
    Studio.prototype.toArray = function () {
        return {
            id: this._id,
            name: this._name,
            games: this._games.map(function (game) { return game.toArray(); })
        };
    };
    return Studio;
}());
//# sourceMappingURL=studio.js.map