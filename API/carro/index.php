<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";


$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////

$app->post('/agregar_implemento', function (Request $request, Response $response) {
    imLogin();
    global $database;  
    $params = $request->getParsedBody();
    $implemento = $params['implemento'];

    $implemento['neto'] = $implemento['precio_implemento'];

    unset($implemento['descripcion_implemento']);
    unset($implemento['id_categoria']);
    unset($implemento['nombre_implemento']);
    unset($implemento['precio_implemento']);
    unset($implemento['ruta_imagen']);
    unset($implemento['stock_implemento']);
    unset($implemento['vigencia']);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

    if ($id_carro == false) {
        $nuevo_carro['fecha_creacion'] = $fecha;
        $nuevo_carro['id_usuario'] = $_SESSION['usuario']['id_usuario'];
        $id_carro = $database->insert('carro_compra', $nuevo_carro);
    }

    $implemento['id_carro'] = $id_carro;

    $where = array('AND' => array('id_implemento' => $implemento['id_implemento'], 'id_carro' => $id_carro ));
    $id_implemento = $database->get('detalle_carro', 'id_implemento', $where );

    if($id_implemento == false){

        $id_implemento = $database->insert('detalle_carro', $implemento);
    }
    else{
        $cantidad_actual = $database->get('detalle_carro', 'cantidad', $where );
        $cantidad_total = $cantidad_actual + $implemento['cantidad'];
        $database->update('detalle_carro', array('cantidad' => $cantidad_total), $where );
    }

    /*print_r($database->error());*/
    //$data = array('status' => $database->error());
    $data = $implemento;
    $response->withJson($data); 
    
    return $response;
});

$app->post('/quitar_implemento[/{id_implemento}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_implemento = $args['id_implemento'];   

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

    $where = array('AND' => array('id_carro' => $id_carro, 'id_implemento' => $id_implemento));
    $database->delete('detalle_carro', $where );

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/actualizar_carro[/{total}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $total = $args['total'];   

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

    $database->update('carro_compra', array('neto' => $total), array('id_carro_compra' => $id_carro));

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

//GETS DE DOCUMENTOS INGRESADAS DE COMPRA
$app->get('/listar_carro', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

	$data = $database->select('detalle_carro',
        array('[>]implemento' => 'id_implemento'),
        array('detalle_carro.id_implemento', 'implemento.nombre_implemento', 'implemento.descripcion_implemento', 'implemento.precio_implemento', 'detalle_carro.cantidad', 'implemento.ruta_imagen'),
        array('AND' => array('implemento.vigencia' => true, 'detalle_carro.id_carro' => $id_carro)));

	/*print_r($database->error());*/
	/*$data = $database->select('factura_ingreso', '*', array());*/

	$response->withJson($data);
    return $response;
});

//Devuelve el producto con el id
$app->post('/limpiar_carro', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

    $database->delete('detalle_carro', array('id_carro' => $id_carro));

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->run();

?>