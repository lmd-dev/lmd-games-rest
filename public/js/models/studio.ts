class Studio
{
    //Id of the studio in database
    private _id: number;
    public get id(): number { return this._id; };
    public set id(value: number) { this._id = value; };

    //Name of the studio
    private _name: string;
    public get name(): string { return this._name; };
    public set name(value: string) { this._name = value; };

    //Games developped by the studio
    private _games: Array<Game>;
    public get games(): Array<Game> { return this._games; };

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._id = 0;
        this._name = "";
        this._games = new Array<Game>();

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: any)
    {
        if (data)
        {
            this._id = data.id !== undefined ? data.id : this._id;
            this._name = data.name !== undefined ? data.name : this._name;

            if (data.games)
                this._games = data.games.map((game: any) => { return new Game(game); });
        }
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            id: this._id,
            name: this._name,
            games: this._games.map((game: Game) => { return game.toArray(); })
        };
    }
}