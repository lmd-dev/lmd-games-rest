<?php
require_once __DIR__.'/database-lmd.php';
require_once __DIR__.'/dao-game.php';
require_once __DIR__.'/../models/studio.php';

/**
 * DAO responsible for Studios
 */
class DAOStudio
{
    /**
     * Returns all studio of the database
     */
    static function findAll(): array
    {
        $studios = array();

        $query = "SELECT * FROM studio ORDER BY name ASC;";
        $results = null;        
    
        $db = DatabaseLMD::getInstance();

        if($db->get($query, $results))
        {
            foreach($results as $result)
            {
                $studio = new Studio($result);

                $studio->setGames(DAOGame::find($studio));

                $studios[] = $studio;
            }
        }

        return $studios;
    }
}