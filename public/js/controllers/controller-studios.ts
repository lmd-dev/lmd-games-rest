class ControllerStudios extends Subject
{
    //List of studios
    private _studios: Array<Studio>;
    public get studios(): Array<Studio> { return this._studios; };

    //Selected studios
    private _selectedStudio: Studio;
    public get selectedStudio(): Studio { return this._selectedStudio; };

    //Edited game
    private _editedGame: Game;
    public get editedGame(): Game { return this._editedGame; };

    /**
     * Constructor
     */
    constructor()
    {
        super();

        this._studios = new Array<Studio>();
        this._selectedStudio = null;
        this._editedGame = null;

        this.loadStudios();
    }

    /**
     * Loads studios list from server
     */
    loadStudios()
    {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'studios');

        xhr.onload = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);

                this._studios = data.studios.map((item: any) => { return new Studio(item); });
                this.notify();
            }
        }

        xhr.send();
    }

    /**
     * Selects a studio and load its games
     * @param id Id of the studio to load
     */
    selectStudio(id: number)
    {
        let found = false;

        for (let iStudio = 0; !found && iStudio < this._studios.length; ++iStudio)
        {
            if (this._studios[iStudio].id == id)
            {
                this._selectedStudio = this._studios[iStudio];
                found = true;
            }
        }

        if (!found)
            this._selectedStudio = null;

        this.notify();
    }

    /**
     * Creates a new game
     */
    createGame()
    {
        this._editedGame = new Game();
        this.notify();
    }

    /**
     * Edits the games matching with the given id
     * @param id
     */
    editGame(id: number)
    {
        if (this._selectedStudio)
        {
            let found = false;
            for (let iGame = 0; !found && iGame < this._selectedStudio.games.length; ++iGame)
            {
                if (this._selectedStudio.games[iGame].id == id)
                {
                    this._editedGame = this._selectedStudio.games[iGame];
                    found = true;
                }
            }

            if (!found)
                this._editedGame = null;

            this.notify();
        }
    }

    /**
     * Cancels game editing
     */
    cancelEditGame()
    {
        this._editedGame = null;
        this.notify();
    }

    /**
     * Saves change to edited game
     */
    saveGame(data: any)
    {
        if (this._editedGame && this._selectedStudio) {
            this._editedGame.fromArray(data);

            let dataToSend = {
                game: this._editedGame.toArray(),
                studio: this._selectedStudio.id
            };

            let xhr = new XMLHttpRequest();

            xhr.open('POST', 'game');
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onload = () => {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    let data = JSON.parse(xhr.responseText);

                    if (this._editedGame.id == 0) {
                        this._editedGame.id = data.id;
                        this._selectedStudio.games.push(this._editedGame);
                    }

                    this.cancelEditGame();
                }
            }

            xhr.send('data=' + JSON.stringify(dataToSend));
        }
    }

    /**
     * Removes the edited game
     */
    removeGame()
    {
        if (this._editedGame && this._selectedStudio)
        {
            $.ajax({
                url: 'game/' + this._editedGame.id,
                type: 'DELETE',                     // <== /!\ Ici ne pas utiliser method mais type pour une requete de type DELETE / PUT
                success: (result) => {
                    let found = false;

                    for (let iGame = 0; !found && iGame < this._selectedStudio.games.length; ++iGame)
                    {
                        if (this._selectedStudio.games[iGame].id == this._editedGame.id) {
                            found = true;
                            this._selectedStudio.games.splice(iGame, 1);
                        }
                    }

                    this.cancelEditGame();
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }
    }
}