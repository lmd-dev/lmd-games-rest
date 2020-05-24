class AppGames
{
    //Controller responsible for studios
    private _controllerStudios: ControllerStudios;

    //View responsible for studios displaying
    private _viewStudios: ViewStudios;

    /**
     * Constructor
     */
    constructor()
    {
        this._controllerStudios = new ControllerStudios();
        this._viewStudios = new ViewStudios(this._controllerStudios);
    }
}

window.onload = () =>
{
    let app = new AppGames();
}