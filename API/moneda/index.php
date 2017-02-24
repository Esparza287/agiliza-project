<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";


$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////
$app->post('/subir_moneda', function (Request $request, Response $response) {
	imLogin();
	global $database;
    $moneda = $request->getParsedBody();
	$fecha = getNow();
	$moneda['id_usuario_mod'] = $_SESSION['usuario']['id_usuario'];

    if(!isset($moneda['id_moneda'])){
    	$moneda['fecha_creacion'] = $fecha;
    	$id_moneda = $database->insert('moneda', $moneda);
    }
    else{
    	$moneda['fecha_modificacion'] = $fecha;
    	$id_moneda = $moneda['id_moneda'];
    	unset($moneda['id_moneda']);

    	$database->update('moneda', $moneda, array('id_moneda' => $id_moneda));
    }

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
$app->get('/get_moneda[/{id_moneda}]', function (Request $request, Response $response, $args) {
	global $database;
	$id_moneda = $args['id_moneda'];

	$data = $database->get('moneda', '*', array('id_moneda' => $id_moneda));
	
	$response->withJson($data);	
    return $response;
});

$app->run();
?>