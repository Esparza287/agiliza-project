<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";

$app = new \Slim\App;
$database = new medoo();

//GETS DE MATERIALES
$app->get('/get_materiales[/{id_tipo_material}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_tipo_material = $args['id_tipo_material'];

    $data = $database->select('material',
        array('[>]tipo_material' => 'id_tipo_material'),
        array('tipo_material.nombre_tipo_material', 'material.id_material', 'material.codigo_material', 'material.descripcion_material', 'material.unidad_medida', 'material.marca_material', 'material.modelo_material', 'material.medida_material'),
        array('AND' => array('material.vigencia' => true, 'id_tipo_material' => $id_tipo_material)));

    $response->withJson($data); 
    return $response;
});

//GETS DE PLANES DE CUENTA
$app->get('/get_proveedores', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('proveedor_material', '*', array('vigencia' => true));

    $response->withJson($data); 
    return $response;
});

//GET FACTURA ESPECIFICA Y SU DETALLE
$app->get('/get_nombres_proveedores', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('proveedor_material', array( 'razon_social', 'id_proveedor_material'), array( 'vigencia' => true ));

    $response->withJson($data); 
    return $response;
});

//ELIMINAR UN PROVEEDOR
$app->get('/eliminar_proveedor[/{id_proveedor}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_proveedor = $args['id_proveedor'];

    $database->update('proveedor_material', array( 'vigencia' => false ), array( 'id_proveedor_material' => $id_proveedor));

    $data = array('status' => $database->error());

    $response->withJson($data);
    return $response;
});

//GUARDA UNA CUENTA
$app->post('/subir_cuenta', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $plan_cuenta = $params['cuenta'];

    if(!isset($plan_cuenta['id_plan_cuenta'])){
        $id_plan_cuenta = $database->insert('plan_cuenta', $plan_cuenta);
    }
    else{
        $id_plan_cuenta = $plan_cuenta['id_plan_cuenta'];
        unset($plan_cuenta['id_plan_cuenta']);

        $database->update('plan_cuenta', $plan_cuenta, array('id_plan_cuenta' => $id_plan_cuenta));
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

//GUARDA UN PROVEEDOR
$app->post('/subir_proveedor', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $datos = $params['datos'];

    var_dump($datos);

    if(!isset($datos['id_proveedor_material'])){
        $id_proveedor_material = $database->insert('proveedor_material', $datos);
    }
    else{
        $id_proveedor_material = $datos['id_proveedor_material'];
        unset($datos['id_proveedor_material']);

        $database->update('proveedor_material', $datos, array('id_proveedor_material' => $id_proveedor_material));
    }

    // /*print_r($database->error());*/
    // $data = array('status' => $database->error());
    // $response->withJson($data); 
    
    return true;
});


$app->run();

?>