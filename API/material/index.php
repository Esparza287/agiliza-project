<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";
require_once('../vendor/phpmailer/phpmailer/class.phpmailer.php');
require_once('../vendor/phpmailer/phpmailer/class.smtp.php');
require_once('../vendor/phpmailer/PedidoTemplate.php');

$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////

$app->post('/subir_material', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $material = $params['material'];

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($material['id_material'])){
        $id_material = $database->insert('material', $material);
    }
    else{
        $id_material = $material['id_material'];
        unset($material['id_material']);

        $database->update('material', $material, array('id_material' => $id_material));
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/subir_tipo_material', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $tipo_material = $params['tipo_material'];

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($tipo_material['id_tipo_material'])){
        $id_tipo_material = $database->insert('tipo_material', $tipo_material);
    }
    else{
        $id_tipo_material = $tipo_material['id_tipo_material'];
        unset($tipo_material['id_tipo_material']);

        $database->update('tipo_material', $tipo_material, array('id_tipo_material' => $id_tipo_material));
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/aprobar', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $datos = $params['datos'];

    $id_orden_material = $datos['id_orden_material'];
    unset($datos['id_orden_material']);

    unset($datos['nombre_responsable']);
    $datos['estado_orden'] = 'Cotización';

    $database->update('orden_material', $datos, array('id_orden_material' => $id_orden_material));

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/rechazar', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $datos = $params['datos'];

    $id_orden_material = $datos['id_orden_material'];
    unset($datos['id_orden_material']);

    $datos['estado_orden'] = 'Rechazada';

    $database->update('orden_material', $datos, array('id_orden_material' => $id_orden_material));

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/subir_pedido', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $info = $params['info'];
    $detalle = $params['detalle'];

    //unset($info['id_plan_cuenta']);
    unset($info['nombre_responsable']);

    /*date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");*/

    $fecha = getNow();
    $info['fecha_creacion'] = $fecha;
    $info['fecha_modificacion'] = $fecha;
    $info['fecha_orden_material'] = isset($info['fecha_orden_material']) ? $info['fecha_orden_material'] : $fecha;

    /*var_dump($info);*/
    if(!isset($info['id_orden_material'])){
        
        $id_orden_material = $database->insert('orden_material', $info);

        for ($i=0; $i < sizeof($detalle['filas']) ; $i++) { 

            //SACAR CAMPOS EN LAS FILAS DE MATERIALES
            unset($detalle['filas'][$i]['marca_material']);
            unset($detalle['filas'][$i]['medida_material']);
            unset($detalle['filas'][$i]['modelo_material']);
            unset($detalle['filas'][$i]['unidad_medida']);

            $detalle['filas'][$i]['id_orden'] = $id_orden_material;
            $data = $database->insert('detalle_orden', $detalle['filas'][$i]);
        }

    }
    else{
        $id_orden_material = $info['id_orden_material'];
        unset($info['id_orden_material']);
        $database->update('orden_material', $info, array('id_orden_material' => $id_orden_material));

        $database->delete('detalle_orden',array('id_orden'=> $id_orden_material));

        for ($i=0; $i < sizeof($detalle['filas']) ; $i++) { 
            $detalle['filas'][$i]['id_orden'] = $id_orden_material;

            //SACAR CAMPOS EN LAS FILAS DE MATERIALES
            unset($detalle['filas'][$i]['marca_material']);
            unset($detalle['filas'][$i]['medida_material']);
            unset($detalle['filas'][$i]['modelo_material']);
            unset($detalle['filas'][$i]['unidad_medida']);

            $detalle['filas'][$i]['id_orden'] = $id_orden_material;
            $data = $database->insert('detalle_orden', $detalle['filas'][$i]);
        }
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($info); 
    
    return $response;
});

$app->post('/subir_cotizacion', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $info = $params['info'];
    $detalle = $params['detalle'];
    $proveedores = $params['proveedores'];

    if ($info['estado_orden'] == 'Análisis Comparativo') {
        $database->update('orden_material', array( 'estado_orden' => $info['estado_orden'], 'cantidad_proveedores' => $info['cantidad_proveedores']), array( 'id_orden_material' => $info['id_orden_material']));
    }
    else{
        $database->update('orden_material', array( 'estado_orden' => $info['estado_orden'], 'cantidad_proveedores' => $info['cantidad_proveedores'] ), array( 'id_orden_material' => $info['id_orden_material']));
    }

    $id_orden_material = $info['id_orden_material'];
    $fecha = getNow();
    $database->delete('detalle_proveedores',array('id_orden_material'=> $id_orden_material));
    for ($j=0; $j < $info['cantidad_proveedores']; $j++) { 
        $database->insert('detalle_proveedores', array( 'id_orden_material' => $id_orden_material, 'id_proveedor_material' => $proveedores[$j]['id_proveedor_material']));
    }   

    for ($i=0; $i < sizeof($detalle['filas']) ; $i++) { 
        if (isset($detalle['filas'][$i]['proveedor_1'])) {
            $data = $database->update('detalle_orden', array( 'proveedor_1' => $detalle['filas'][$i]['proveedor_1'] ), array( 'id_detalle_orden' => $detalle['filas'][$i]['id_detalle_orden'] ));
        }
        if (isset($detalle['filas'][$i]['proveedor_2'])) {
            $data = $database->update('detalle_orden', array( 'proveedor_2' => $detalle['filas'][$i]['proveedor_2'] ), array( 'id_detalle_orden' => $detalle['filas'][$i]['id_detalle_orden'] ));
        }
        if (isset($detalle['filas'][$i]['proveedor_3'])) {
            $data = $database->update('detalle_orden', array( 'proveedor_3' => $detalle['filas'][$i]['proveedor_3'] ), array( 'id_detalle_orden' => $detalle['filas'][$i]['id_detalle_orden'] ));
        }
        if (isset($detalle['filas'][$i]['proveedor_4'])) {
            $data = $database->update('detalle_orden', array( 'proveedor_4' => $detalle['filas'][$i]['proveedor_4'] ), array( 'id_detalle_orden' => $detalle['filas'][$i]['id_detalle_orden'] ));
        }
        if (isset($detalle['filas'][$i]['proveedor_5'])) {
            $data = $database->update('detalle_orden', array( 'proveedor_5' => $detalle['filas'][$i]['proveedor_5'] ), array( 'id_detalle_orden' => $detalle['filas'][$i]['id_detalle_orden'] ));
        }
    }
    /*var_dump($detalle[filas]);*/

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($info); 
    
    return $response;
});

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
$app->get('/get_planes', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('plan_cuenta', '*', array('vigencia' => true));

    $response->withJson($data); 
    return $response;
});

//GETS DE PLANES DE CUENTA
$app->get('/get_tipos_material', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('tipo_material', '*', array('vigencia' => true));

    $response->withJson($data); 
    return $response;
});

//GETS DE LOS PEDIDOS
$app->get('/get_pedidos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('orden_material',
        array(
            '[>]sector' => array('orden_material.id_sector' => 'id_sector'),
            '[>]profesor' => array('orden_material.id_responsable' => 'id_profesor'),
            '[>]usuario' => array('profesor.id_usuario' => 'id_usuario'),
            '[>]plan_cuenta' => array('orden_material.id_plan_cuenta' => 'id_plan_cuenta')
             ),
        array('orden_material.correlativo_orden', 'sector.nombre_sector', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'orden_material.fecha_orden_material', 'orden_material.id_orden_material', 'orden_material.estado_orden', 'plan_cuenta.nombre_plan_cuenta'),
        array('AND' => array('orden_material.vigencia' => true)));

    /*var_dump($database->error());*/
    $response->withJson($data); 
    return $response;
});

//GETS DE LOS PEDIDOS PENDIENTES
$app->get('/get_pedidos_pendientes', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('orden_material',
        array(
            '[>]sector' => array('orden_material.id_sector' => 'id_sector'),
            '[>]profesor' => array('orden_material.id_responsable' => 'id_profesor'),
            '[>]usuario' => array('profesor.id_usuario' => 'id_usuario'),
            '[>]plan_cuenta' => array('orden_material.id_plan_cuenta' => 'id_plan_cuenta')
             ),
        array('orden_material.correlativo_orden', 'sector.nombre_sector', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'orden_material.fecha_orden_material', 'orden_material.id_orden_material', 'orden_material.estado_orden', 'plan_cuenta.nombre_plan_cuenta'),
        array('AND' => array('orden_material.vigencia' => true, 'estado_orden' => 'Enviada')));

    /*var_dump($database->error());*/
    $response->withJson($data); 
    return $response;
});

//GETS DE LOS PEDIDOS PENDIENTES
$app->get('/get_cotizaciones_pendientes', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('orden_material',
        array(
            '[>]sector' => array('orden_material.id_sector' => 'id_sector'),
            '[>]profesor' => array('orden_material.id_responsable' => 'id_profesor'),
            '[>]usuario' => array('profesor.id_usuario' => 'id_usuario'),
            '[>]plan_cuenta' => array('orden_material.id_plan_cuenta' => 'id_plan_cuenta')
             ),
        array('orden_material.correlativo_orden', 'sector.nombre_sector', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'orden_material.fecha_orden_material', 'orden_material.id_orden_material', 'orden_material.estado_orden', 'plan_cuenta.nombre_plan_cuenta'),
        array('AND' => array('orden_material.vigencia' => true, 'estado_orden' => 'Cotización')));

    /*var_dump($database->error());*/
    $response->withJson($data); 
    return $response;
});

//GETS DE LOS PEDIDOS PENDIENTES
$app->get('/get_comparaciones_pendientes', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('orden_material',
        array(
            '[>]sector' => array('orden_material.id_sector' => 'id_sector'),
            '[>]profesor' => array('orden_material.id_responsable' => 'id_profesor'),
            '[>]usuario' => array('profesor.id_usuario' => 'id_usuario'),
            '[>]plan_cuenta' => array('orden_material.id_plan_cuenta' => 'id_plan_cuenta')
             ),
        array('orden_material.correlativo_orden', 'sector.nombre_sector', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'orden_material.fecha_orden_material', 'orden_material.id_orden_material', 'orden_material.estado_orden', 'plan_cuenta.nombre_plan_cuenta'),
        array('AND' => array('orden_material.vigencia' => true, 'estado_orden' => 'Análisis Comparativo')));

    /*var_dump($database->error());*/
    $response->withJson($data); 
    return $response;
});

$app->get('/get_correlativo', function (Request $request, Response $response) {
	imLogin();
	global $database;
	

    $data = $database->max('orden_material','correlativo_orden');

	$response->withJson($data);	
    return $response;
});

//Devuelve el producto con el id
$app->get('/get_material[/{id_material}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_material = $args['id_material'];

    $data = $database->get('material', '*', array('id_material' => $id_material));

    $response->withJson($data);
    
    return $response;
});

//Devuelve el producto con el id
$app->get('/get_tipo_material[/{id_tipo_material}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_tipo_material = $args['id_tipo_material'];

    $data = $database->get('tipo_material', '*', array('id_tipo_material' => $id_tipo_material));

    $response->withJson($data);
    
    return $response;
});

//GETS DE CATEGORíAS
$app->get('/get_sectores', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('sector',
        array('[>]profesor' => array('responsable_sector' => 'id_profesor'),
              '[>]usuario' => array('profesor.id_usuario' => 'id_usuario')),
        array('usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'sector.nombre_sector', 'sector.id_sector', 'sector.responsable_sector', 'sector.responsable_sector'));

    $response->withJson($data); 
    return $response;
});

//GET FACTURA ESPECIFICA Y SU DETALLE
$app->get('/get_pedido[/{id_orden_material}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
	$id_orden_material = $args['id_orden_material'];

	$cols = array('id_detalle_orden', 'observacion', 'cantidad_material', 'id_material', 'proveedor_1', 'proveedor_2', 'proveedor_3', 'proveedor_4', 'proveedor_5');
	$where = array('AND' => array('id_orden' => $id_orden_material));

    $pedido = $database->get('orden_material', '*', array('AND' => array('vigencia' => true, 'id_orden_material' => $id_orden_material)));
	$proveedores = $database->select('detalle_proveedores',
        array('[>]proveedor_material' => 'id_proveedor_material'),
        array('proveedor_material.razon_social', 'proveedor_material.id_proveedor_material', 'proveedor_material.rut_proveedor_material', 'proveedor_material.direccion_proveedor_material', 'proveedor_material.telefono_proveedor_material'),
        array( 'detalle_proveedores.id_orden_material' => $id_orden_material ));

	$detalle = $database->select('detalle_orden', $cols, $where);

	$data = array('info' => $pedido, 'detalle' => $detalle, 'proveedores' => $proveedores, 'error' => $database->error());

	$response->withJson($data);	
    return $response;
});

$app->get('/get_descripcion_material[/{id_material}]', function(Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_material = $args['id_material'];

    $data = $database->get('material', 'descripcion_material', array( 'id_material' => $id_material ));

    return $data;
});

$app->run();

?>