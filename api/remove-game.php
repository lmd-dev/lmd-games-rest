<?php

require_once __DIR__.'/../src/dao/dao-game.php';

echo $_SERVER['REQUEST_METHOD'];
if($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
    if(isset($_GET['id']))
    {
        DAOGame::remove($_GET['id']);
    }
    else
        header('HTTP/1.1 400');
}
else
{
    header('HTTP/1.1 404');
}
