<?php

class Game
{
    //ID of the game
    private int $id;
    public function getId(): int {return $this->id; }
    public function setId(int $value) { $this->id = $value; }

    //Name of the game
    private string $name;
    public function getName(): string {return $this->name; }

    //release year of the game
    private int $releaseYear;
    public function getReleaseYear() : int { return $this->releaseYear; }

    //Picture of the game box
    private string $picture;
    public function getPicture() : string { return $this->picture;}

    /**
     * Constructor
     */
    public function __construct(array $data = null)
    {
        $this->id = 0;
        $this->name = "";
        $this->releaseYear= 1958;
        $this->picture = "";

        $this->fromArray($data);
    }

    /**
     * Imports data from array
     */
    public function fromArray(array $data)
    {
        if($data)
        {
           $this->id = isset($data['id']) ? $data['id'] : $this->id;
           $this->name = isset($data['name']) ? $data['name'] : $this->name;
           $this->releaseYear = isset($data['releaseYear']) ? $data['releaseYear'] : $this->releaseYear;
           $this->picture = isset($data['picture']) ? urldecode($data['picture']) : $this->picture;
        }
    }

    /**
     * Exports data to array
     */
    public function toArray(): array
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'releaseYear' => $this->releaseYear,
            'picture' => urlencode($this->picture)
        );
    }
}