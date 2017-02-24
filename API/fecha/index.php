<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";


$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////
$app->post('/cambiar_year[/{id_year}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
    $id_year = $args['id_year'];

	$database->update('year', array('estado' => false), array('id_year[!]' => $id_year));
	$database->update('year', array('estado' => true), array('id_year' => $id_year));
	$year = $database->get('year', '*', array('id_year' => $id_year));

	$_SESSION['year'] = $year;

	$data = array('status' => $database->error());
	$response->withJson($data);	
	
    return $response;
});

////////////////////////GETS/////////////////////////////////
$app->get('/get_monedas[/{short}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
	$join = array();
	$cols = '*';
	$where = array();

	if(isset($args['short']) and $args['short']==1){
		$cols = array('id_moneda', 'nombre_moneda');
		$where = array('moneda.vigencia' => 1);
	}

	$data = $database->select('moneda', $cols, $where);
	
	$response->withJson($data);	
    return $response;
});

//LISTA TODOS LOS AÑOS
$app->get('/get_years', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;

	$data = $database->select('year', '*');
	
	$response->withJson($data);	
    return $response;
});

//LISTA TODOS LOS AÑOS
$app->post('/crear_year[/{year}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
	$year['year'] = $args['year'];
	$year['nombre_year'] = 'Año '.$year['year'];

	$database->insert('year', $year);
	
	$response->withJson($year);	
    return $response;
});


$app->run();
?>