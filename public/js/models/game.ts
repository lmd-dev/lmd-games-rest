class Game
{
    //Id of the game in database
    private _id: number;
    public get id(): number { return this._id; };
    public set id(value: number) { this._id = value; };

    //Name of the game
    private _name: string;
    public get name(): string { return this._name; };
    public set name(value: string) { this._name = value; };

    //Release year of the game
    private _releaseYear: number;
    public get releaseYear(): number { return this._releaseYear; };
    public set releaseYear(value: number) { this._releaseYear = value; };

    //Picture of the game box
    private _picture: string;
    public get picture(): string { return this._picture; };
    public set picture(value: string) { this._picture = value; };

    /**
     * Constructor
     * @param data
     */
    constructor(data: any = null)
    {
        this._id = 0;
        this._name = "";
        this._releaseYear = 0;
        this._picture = "";

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
            this._releaseYear = data.releaseYear !== undefined ? data.releaseYear : this._releaseYear;
            this._picture = data.picture !== undefined ? decodeURIComponent(data.picture) : this._picture;
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
            releaseYear: this._releaseYear,
            picture: encodeURIComponent(this._picture)
        };
    }
}