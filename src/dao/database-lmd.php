<?php

include_once(__DIR__.'/database.php');

/**
 * LMD Video Games Database connector
 */
class DatabaseLMD extends DataBase
{
    private static $handle = null;
	/**
	 * Constructeur
	 */
	protected function __construct()
	{
        parent::__construct('localhost', 'lmd_videogames', 'root', '');
		parent::connect();
	}

    public static function getInstance()
    {
        if(is_null(self::$handle))
            self::$handle = new DatabaseLMD();

        return self::$handle;
    }
}
?>