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

$app->post('/subir_producto', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $basico = $params['basico'];
    $adicional = $params['adicional'];
    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($basico['id_implemento'])){
        $id_implemento = $database->insert('implemento', $basico);
        $adicional['id_implemento'] = $id_implemento;
        $database->insert('detalle_implemento', $adicional);
    }
    else{
        $id_implemento = $basico['id_implemento'];
        unset($basico['id_implemento']);

        $database->update('implemento', $basico, array('id_implemento' => $id_implemento));
        $database->update('detalle_implemento', $adicional, array('id_implemento' => $id_implemento));
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

$app->post('/subir_imagen', function (Request $request, Response $response) {

    global $database;
    $params = $request->getParsedBody();    
    $imagen = $params['imagen'];
    $numero = $params['numero'];
    $id = $params['id'];

    date_default_timezone_set('America/Santiago');
    $nombre = date("YmdHis");

    $implemento = $database->get('implemento', '*', array('id_implemento' => $id));
    $cadena = $implemento['nombre_implemento'];
    //$nombre = substr($cadena, -5);
    //$nombre = $nombre.$numero;
    $nombre = $nombre.'.png';

    list(, $imagen) = explode(';', $imagen);
    list(, $imagen) = explode(',', $imagen);

    $imagen = base64_decode($imagen);   

    file_put_contents('../../img/implementos/'.$nombre, $imagen);
    if ($numero == 1) {
        $database->update('implemento', array('ruta_imagen' => $nombre), array('id_implemento' => $id));
    }
    else if($numero == 2){
        $database->update('detalle_implemento', array('ruta_imagen_2' => $nombre), array('id_implemento' => $id));
    }
    else{
        $database->update('detalle_implemento', array('ruta_imagen_3' => $nombre), array('id_implemento' => $id));
    }
    
    return $nombre;
});

$app->post('/subir_imagen_noticia', function (Request $request, Response $response) {

    global $database;
    $params = $request->getParsedBody();    
    $imagen = $params['file'];

    date_default_timezone_set('America/Santiago');
    $nombre = date("YmdHis");

    $nombre = $nombre.'.png';

    /*list(, $imagen) = explode(';', $imagen);
    list(, $imagen) = explode(',', $imagen);

    $imagen = base64_decode($imagen);*/   

    var_dump($imagen);

    file_put_contents('../../img/noticias/'.$nombre, $imagen);
    
    return $nombre;
});

//GETS DE DOCUMENTOS INGRESADAS DE COMPRA
$app->get('/get_implementos[/{tipo}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
	$tipo = $args['tipo'];

	$data = $database->select('implemento',
        array('[>]categoria' => 'id_categoria'),
        array('implemento.id_implemento', 'implemento.nombre_implemento', 'categoria.nombre_categoria', 'implemento.ruta_imagen', 'implemento.precio_implemento', 'implemento.descripcion_implemento', 'implemento.stock_implemento'),
        array('AND' => array('implemento.vigencia' => true)));

	/*print_r($database->error());*/
	/*$data = $database->select('factura_ingreso', '*', array());*/

    for($i=0;$i<count($data);$i++){ 
        if ( $data[$i]['ruta_imagen'] == null) {
             $data[$i]['ruta_imagen'] = "sin_imagen.jpg";
        }
    }

	$response->withJson($data);	
    return $response;
});

//Devuelve el producto con el id
$app->get('/get_implemento[/{id_implemento}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_implemento = $args['id_implemento'];
    $implemento = $database->get('implemento', '*', array('id_implemento' => $id_implemento));
    if ($implemento) {
        $adicional = $database->get('detalle_implemento', '*', array('id_implemento' => $implemento['id_implemento']));
        $data = array('implemento' => $implemento, 'adicional' => $adicional, 'error' => $database->error());
    }
    else{
        $data = array('error' => $database->error());
    }

    $response->withJson($data);
    
    return $response;
});

//GETS DE CATEGORíAS
$app->get('/get_categorias', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('categoria', '*');

    /*print_r($database->error());*/
    /*$data = $database->select('factura_ingreso', '*', array());*/

    $response->withJson($data); 
    return $response;
});

//GET FACTURA ESPECIFICA Y SU DETALLE
$app->get('/get_documento[/{id_documento_ingreso}]', function (Request $request, Response $response, $args) {
	imLogin();
	global $database;
	$id_documento_ingreso = $args['id_documento_ingreso'];
	$cols = array('id_fila_cuenta', 'glosa', 'monto', 'id_centro_costo', 'id_cuenta');
	$where = array('AND' => array('id_factura_ingreso' => $id_documento_ingreso));
	$documento = $database->get('documento_ingreso', '*', array('id_documento_ingreso' => $id_documento_ingreso));
	$detalle = $database->select('fila_cuenta', $cols, $where);
	
	if ($documento['id_factura_ingreso'] != null) {
		$where = array('AND' => array('id_documento_ingreso' => $documento['id_factura_ingreso']));
    	$factura = $database->get('documento_ingreso', 'numero_documento', $where);
    	$data = array('info' => $documento, 'detalle' => $detalle, 'factura' => $factura, 'error' => $database->error());
	}
	else{
		$data = array('info' => $documento, 'detalle' => $detalle, 'error' => $database->error());
	}

	$response->withJson($data);	
    return $response;
});

$app->run();

?>