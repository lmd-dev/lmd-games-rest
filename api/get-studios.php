<?php

require_once __DIR__.'/../src/dao/dao-studio.php';

$studios = DAOStudio::findAll();

echo json_encode(array('studios' => array_map(function($item) { return $item->toArray(); }, $studios)));