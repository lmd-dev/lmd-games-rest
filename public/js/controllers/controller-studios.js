var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ControllerStudios = /** @class */ (function (_super) {
    __extends(ControllerStudios, _super);
    /**
     * Constructor
     */
    function ControllerStudios() {
        var _this = _super.call(this) || this;
        _this._studios = new Array();
        _this._selectedStudio = null;
        _this._editedGame = null;
        _this.loadStudios();
        return _this;
    }
    Object.defineProperty(ControllerStudios.prototype, "studios", {
        get: function () { return this._studios; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ControllerStudios.prototype, "selectedStudio", {
        get: function () { return this._selectedStudio; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ControllerStudios.prototype, "editedGame", {
        get: function () { return this._editedGame; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Loads studios list from server
     */
    ControllerStudios.prototype.loadStudios = function () {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'studios');
        xhr.onload = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                _this._studios = data.studios.map(function (item) { return new Studio(item); });
                _this.notify();
            }
        };
        xhr.send();
    };
    /**
     * Selects a studio and load its games
     * @param id Id of the studio to load
     */
    ControllerStudios.prototype.selectStudio = function (id) {
        var found = false;
        for (var iStudio = 0; !found && iStudio < this._studios.length; ++iStudio) {
            if (this._studios[iStudio].id == id) {
                this._selectedStudio = this._studios[iStudio];
                found = true;
            }
        }
        if (!found)
            this._selectedStudio = null;
        this.notify();
    };
    /**
     * Creates a new game
     */
    ControllerStudios.prototype.createGame = function () {
        this._editedGame = new Game();
        this.notify();
    };
    /**
     * Edits the games matching with the given id
     * @param id
     */
    ControllerStudios.prototype.editGame = function (id) {
        if (this._selectedStudio) {
            var found = false;
            for (var iGame = 0; !found && iGame < this._selectedStudio.games.length; ++iGame) {
                if (this._selectedStudio.games[iGame].id == id) {
                    this._editedGame = this._selectedStudio.games[iGame];
                    found = true;
                }
            }
            if (!found)
                this._editedGame = null;
            this.notify();
        }
    };
    /**
     * Cancels game editing
     */
    ControllerStudios.prototype.cancelEditGame = function () {
        this._editedGame = null;
        this.notify();
    };
    /**
     * Saves change to edited game
     */
    ControllerStudios.prototype.saveGame = function (data) {
        var _this = this;
        if (this._editedGame && this._selectedStudio) {
            this._editedGame.fromArray(data);
            var dataToSend = {
                game: this._editedGame.toArray(),
                studio: this._selectedStudio.id
            };
            var xhr_1 = new XMLHttpRequest();
            xhr_1.open('POST', 'game');
            xhr_1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr_1.onload = function () {
                if (xhr_1.readyState == XMLHttpRequest.DONE && xhr_1.status == 200) {
                    var data_1 = JSON.parse(xhr_1.responseText);
                    if (_this._editedGame.id == 0) {
                        _this._editedGame.id = data_1.id;
                        _this._selectedStudio.games.push(_this._editedGame);
                    }
                    _this.cancelEditGame();
                }
            };
            xhr_1.send('data=' + JSON.stringify(dataToSend));
        }
    };
    /**
     * Removes the edited game
     */
    ControllerStudios.prototype.removeGame = function () {
        var _this = this;
        if (this._editedGame && this._selectedStudio) {
            $.ajax({
                url: 'game/' + this._editedGame.id,
                type: 'DELETE',
                success: function (result) {
                    var found = false;
                    for (var iGame = 0; !found && iGame < _this._selectedStudio.games.length; ++iGame) {
                        if (_this._selectedStudio.games[iGame].id == _this._editedGame.id) {
                            found = true;
                            _this._selectedStudio.games.splice(iGame, 1);
                        }
                    }
                    _this.cancelEditGame();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    };
    return ControllerStudios;
}(Subject));
//# sourceMappingURL=controller-studios.js.map