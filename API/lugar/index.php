<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";


$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////

////////////////////////GETS/////////////////////////////////
$app->get('/get_comunas', function (Request $request, Response $response) {
	global $database;
	$data = $database->select('comuna', '*', array('ORDER' => 'nombre_comuna ASC'));
	$response->withJson($data);	
	
    return $response;
});
$app->run();
?>