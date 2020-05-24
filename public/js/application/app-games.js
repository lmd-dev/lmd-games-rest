var AppGames = /** @class */ (function () {
    /**
     * Constructor
     */
    function AppGames() {
        this._controllerStudios = new ControllerStudios();
        this._viewStudios = new ViewStudios(this._controllerStudios);
    }
    return AppGames;
}());
window.onload = function () {
    var app = new AppGames();
};
//# sourceMappingURL=app-games.js.map