<?php
require_once __DIR__.'/database-lmd.php';
require_once __DIR__.'/../models/studio.php';
require_once __DIR__.'/../models/game.php';

/**
 * DAO responsible for Games
 */
class DAOGame
{
    /**
     * Returns games of the given studio
     */
    static function find(Studio $studio): array
    {
        $games = array();

        $query = "SELECT * FROM game WHERE studio = :studio ORDER BY releaseYear DESC, name ASC;";
        $parameters = array(array('name' => ':studio', 'value' => $studio->getId(), 'type' => 'int'));
        $results = null;

        $db = DatabaseLMD::getInstance();

        if($db->get($query, $results, $parameters))
        {
            foreach($results as $result)
            {
                $games[] = new Game($result);
            }
        }

        return $games;
    }

    /**
     * Saves a game
     */
    static function save(Game $game, int $studioId): Game
    {
        if($game->getId() == 0)
            return DAOGame::insert($game, $studioId);
        else
            return DAOGame::update($game);
    }

    /**
     * Saves a new game for the given studio
     */
    static function insert(Game $game, int $studioId): Game
    {
        $query = "INSERT INTO game (name, releaseYear, picture, studio) VALUES (:name, :releaseYear, :picture, :studio);";
        $parameters = array(
            array('name' => ':name', 'value' => $game->getName(), 'type' => 'string'),
            array('name' => ':releaseYear', 'value' => $game->getReleaseYear(), 'type' => 'int'),
            array('name' => ':picture', 'value' => rawurlencode($game->getPicture()), 'type' => 'string'),
            array('name' => ':studio', 'value' => $studioId, 'type' => 'int')
        );

        $db = DatabaseLMD::getInstance();

        if($db->execute($query, $parameters))
        {
            $game->setId($db->getLastId());

            return $game;
        }

        return null;
    }

    /**
     * Update an existing game
     */
    static function update(Game $game): Game
    {
        $query = "UPDATE game SET name = :name, releaseYear = :releaseYear, picture = :picture WHERE id = :id;";
        $parameters = array(
            array('name' => ':name', 'value' => $game->getName(), 'type' => 'string'),
            array('name' => ':releaseYear', 'value' => $game->getreleaseYear(), 'type' => 'int'),
            array('name' => ':picture', 'value' => rawurlencode($game->getPicture()), 'type' => 'string'),
            array('name' => ':id', 'value' => $game->getId(), 'type' => 'int')
        );

        $db = DatabaseLMD::getInstance();

        if($db->execute($query, $parameters))
        {
            return $game;
        }

        return null;
    }

    /**
     * Delete a game for the database
     */
    static function remove(int $gameId): bool
    {
        $query = "DELETE FROM game WHERE id = :id;";
        $parameters = array(
            array('name' => ':id', 'value' => $gameId, 'type' => 'int')
        );

        $db = DatabaseLMD::getInstance();

        if($db->execute($query, $parameters))
        {
            return true;
        }

        return false;
    }
}