<?php

require_once __DIR__.'/../src/dao/dao-game.php';

if(isset($_POST['data']))
{
    $data = json_decode($_POST['data'], true);

    $game = new Game($data['game']);
    $studioId = $data['studio'];

    $game = DAOGame::save($game, $studioId);

    echo json_encode(array('id' => $game->getId()));
}