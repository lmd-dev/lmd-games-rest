<?php

/**
 * Generic MySQL database connector
 */
class DataBase
{
	private $server = "";
	private $dbName = "";
	private $user = "";
	private $pwd = "";
	
	var $link = null;
	
	var $key = "";
	
	/**
	 * Constructeur
	 * @param type $valServer Adresse du serveur
	 * @param type $valDBName Nom de la base de données
	 * @param type $valUser Utilisateur
	 * @param type $valPwd Mot de passe de l'utilisateur
	 */
	protected function __construct($valServer, $valDBName, $valUser, $valPwd)
	{
		$this->server = $valServer;
		$this->dbName = $valDBName;
		$this->user = $valUser;
		$this->pwd = $valPwd;
	}
	
	/**
	 * Destructeur
	 */
	function __destruct()
	{
		$this->disconnect();
	}
	
	/**
	 * Connexion à la base de données
	 * @return True si la connexion a réussi, false sinon
	 */
	protected function connect()
	{
		$valRet = false;
		
		$this->link = new PDO('mysql:host='.$this->server.';dbname='.$this->dbName, $this->user, $this->pwd, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
		$this->link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->link->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

		return $valRet;
	}
	
	/**
	 * Déconnexion de la base de données
	 */
	protected function disconnect()
	{
		$this->link = null;
	}
	
	/**
	 * Execute une requete de type SELECT
	 * @param type $requete Requete SQL à exéctuer
     * @param type $params Liste de paramètres à intégrer à la requete ( ['name' => 'nom parametre', 'value' => 'valeur du paramètre', 'type' => 'type du paramètre'] )
	 * @param type $resultat Résultat obtenu
	 * @return True si la requete a retourné des résultats, false sinon
	 */
	public function get($requete, &$resultat, $params = array())
	{
		$valRet = false;
		
		if($this->link)
		{
            if(count($params))
            {
			    $query = $this->link->prepare($requete);

                foreach($params as $param)
                {
                    $query->bindValue($param['name'], $param['value'], $this->getPDOType($param['type']));
                }

                $statement = $query->execute();

                if($statement !== false)
                {			
                    $resultat = $query->fetchAll(PDO::FETCH_ASSOC);
                }
            }
            else
            {
                $statement = $this->link->query($requete);

                if($statement !== false)
                {
                    $resultat = $statement->fetchAll(PDO::FETCH_ASSOC);
                }
            }
		
            if(count($resultat))
                $valRet = true;
		}
		
		return $valRet;
	}
	
	/**
	 * Exécute une requete de type UPDATE, INSERT, DELETE (sans retour de résultat)
	 * @param $requete Requete à exéctuer
     * @param $params Liste de paramètres à intégrer à la requete ( ['name' => 'nom parametre', 'value' => 'valeur du paramètre', 'type' => 'type du paramètre'] )
     * @return True si la requete a correctement été exécuté, false sinon.
	 */
	public function execute($requete, $params = array())
	{
		$valRet = false;
						
		if($this->link)
		{
            if(count($params))
            {
			    $query = $this->link->prepare($requete);

                foreach($params as $param)
                {
                    $query->bindValue($param['name'], $param['value'], $this->getPDOType($param['type']));
                }

                $valRet = $query->execute() !== false;
            }
            else
            {
                $valRet = $this->link->query($requete) !== false;
            }
		}
		
		return $valRet;
	}

    function getPDOType($type)
    {
        $valRet = '';

        if($type == 'bool')
            $valRet = PDO::PARAM_BOOL;
        else if($type == 'int')
            $valRet = PDO::PARAM_INT;
        else
            $valRet = PDO::PARAM_STR;

        return $valRet;
    }
    
    /**
     * Renvoie la dernière clé primaire générée lors du dernier insert réalisé
     */
    public function getLastId()
    {   
        if($this->link)
        {
            return $this->link->lastInsertId();
        }
        
        return 0;
    }

    /**
     * Returns a Unique ID
     */
    public function getUUID()
    {
        if($this->link)
        {
            $result = $this->link->query("SELECT UUID() as id;");
            
            $array = $result->fetch();
            
            return $array['id'];
        }

        return '';
    }
}
?>