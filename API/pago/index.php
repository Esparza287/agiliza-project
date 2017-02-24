<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";
require_once('../vendor/phpmailer/phpmailer/class.phpmailer.php');
require_once('../vendor/phpmailer/phpmailer/class.smtp.php');
require_once('../vendor/phpmailer/PedidoTemplate.php');
require_once('../vendor/phpmailer/PagoTemplate.php');
$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////

$app->post('/realizar_pago', function (Request $request, Response $response) {
    imLogin();
    global $database;  
    $params = $request->getParsedBody();
    $detalle = $params['detalle'];
    $tarjeta = $params['tarjeta'];

    $tarjeta['id_carro_compra'] = $detalle['id_carro_compra'];
    $tarjeta['rut_comprador'] = $_SESSION['usuario']['rut_usuario'];

    unset($tarjeta['icono']);
    unset($tarjeta['valida']);
    unset($tarjeta['tipo']);
    unset($detalle['cuota_total']);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m");
    $fecha_pago = date("Y-m-d h:m:s");
    $tarjeta['fecha_pago'] = $fecha_pago;

    if (!isset($tarjeta['fecha_vencimiento'])) {
        $tarjeta['fecha_vencimiento'] = $fecha;
    }

    $database->insert('info_pago', $tarjeta);

    $where = array('AND' => array('id_carro_compra' => $detalle['id_carro_compra']));

    $id_carro_revisar = $detalle['id_carro_compra'];
    unset($detalle['id_carro_compra']);
    unset($detalle['neto']);
    $detalle['estado'] = false;
    $detalle['forma_pago'] = 'Tarjeta Credito';

    $database->update('carro_compra', $detalle, $where );

    $productos_carro = $database->select('detalle_carro', '*', array('id_carro' => $id_carro_revisar));


    for ($i=0; $i < sizeof($productos_carro); $i++) { 
        $implemento_stock = $database->get('implemento', 'stock_implemento', array('id_implemento' => $productos_carro[$i]['id_implemento']));
        $implemento_stock = $implemento_stock - $productos_carro[$i]['cantidad'];
        $database->update('implemento', array('stock_implemento' => $implemento_stock), array('id_implemento' => $productos_carro[$i]['id_implemento']));
    }

    $implementos_pobres = $database->select('implemento', '*', array( 'stock_implemento[<]' => 3 ));

    for ($i=0; $i < sizeof($implementos_pobres); $i++) { 

        $correo['razon_social'] = 'Costuras de Buzos';
        $datos['id_implemento'] = $implementos_pobres[$i]['id_implemento'];
        $datos['nombre_implemento'] = $implementos_pobres[$i]['nombre_implemento'];
        $datos['precio_implemento'] = $implementos_pobres[$i]['precio_implemento'];
        $datos['cantidad'] = 10;
        $correo['contacto_proveedor'] = 'Don Julio';

        $user = $correo;
        $link ='localhost';
        $receptor = 'cabreracornejoa@gmail.com';

        $mail = new PHPMailer;
        //$mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
        $mail->CharSet = "UTF-8";
        $mail->Encoding = "quoted-printable";
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'noresponde@agiliza.xyz';                     // SMTP username
        $mail->Password = 'asdascion';                     // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
        $mail->Timeout=30;

        $mail->setFrom('noresponde@agiliza.xyz', 'ACM'); //Quien manda el correo?

        $mail->addAddress($receptor, $user);     // A quien le llega

        $mail->isHTML(true);    // Set email format to HTML

        $mail->Subject = 'Solicitud de compra';
        $mail->Body    = LostpassTemplate($datos,$correo);
        $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';

        if(!$mail->send()) {
            //return false;
        }
        else{
            $cantidad=(int)$datos['cantidad'];
            $precio=(int)$datos['precio_implemento'];

            $datos['precio_producto']=$datos['precio_implemento'];
            $datos['neto']=$cantidad * $precio;
            $datos['id_proveedor']= 1 ;
            unset($datos['nombre_implemento']);
            unset($datos['precio_implemento']);

            $database->insert('pedido', $datos);
            //return true;
        }
    }

    //realizar correo de pago
    $correo_compra = $database->select('detalle_carro',  array('[>]implemento' => 'id_implemento'),'*', array('id_carro' => $id_carro_revisar));
    //var_dump($correo_compra);
    //correo electronico
        $user = 'Prueba';
        $link ='localhost';
        $receptor = 'yilo.anm@gmail.com';

        $mail = new PHPMailer;
        //$mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
        $mail->CharSet = "UTF-8";
        $mail->Encoding = "quoted-printable";
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'noresponde@agiliza.xyz';                     // SMTP username
        $mail->Password = 'asdascion';                     // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
        $mail->Timeout=30;

        $mail->setFrom('noresponde@agiliza.xyz', 'ACM'); //Quien manda el correo?

        $mail->addAddress($receptor, $user);     // A quien le llega

        $mail->isHTML(true);    // Set email format to HTML

        $mail->Subject = 'Solicitud de compra';
        $mail->Body    = PagoTemplate($correo_compra);
        $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';
        if(!$mail->send()) {
            //return false;
        }
        else{
            //return true;
        }
    //se termina correo de pago

    $data = $tarjeta;
    $response->withJson($data); 
    
    return $response;
});

$app->post('/realizar_pago_paypal', function (Request $request, Response $response) {
    imLogin();
    global $database;  
    $params = $request->getParsedBody();
    $detalle = $params['detalle'];
    $tarjeta = [];
    $fecha_pago = date("Y-m-d h:m:s");
    $tarjeta['fecha_pago'] = $fecha_pago;

    $tarjeta['id_carro_compra'] = $detalle['id_carro_compra'];
    $tarjeta['rut_comprador'] = $_SESSION['usuario']['rut_usuario'];
    $tarjeta['numero_cuenta'] = 'PayPal Code';

    $database->insert('info_pago', $tarjeta);

    $where = array('AND' => array('id_carro_compra' => $detalle['id_carro_compra']));

    $id_carro_revisar = $detalle['id_carro_compra'];
    unset($detalle['id_carro_compra']);
    unset($detalle['neto']);
    unset($detalle['cuota_total']);
    $detalle['estado'] = false;
    $detalle['forma_pago'] = 'PayPal';

   $database->update('carro_compra', $detalle, $where );

    $productos_carro = $database->select('detalle_carro', '*', array('id_carro' => $id_carro_revisar));
    for ($i=0; $i < sizeof($productos_carro); $i++) { 
        $implemento_stock = $database->get('implemento', 'stock_implemento', array('id_implemento' => $productos_carro[$i]['id_implemento']));
        $implemento_stock = $implemento_stock - $productos_carro[$i]['cantidad'];
        $database->update('implemento', array('stock_implemento' => $implemento_stock), array('id_implemento' => $productos_carro[$i]['id_implemento']));
    }

    //var_dump($detalle);
    /*print_r($database->error());*/
    //$data = array('status' => $database->error());
    $implementos_pobres = $database->select('implemento', '*', array( 'stock_implemento[<]' => 3 ));

    for ($i=0; $i < sizeof($implementos_pobres); $i++) { 

        $correo['razon_social'] = 'Costuras de Buzos';
        $datos['id_implemento'] = $implementos_pobres[$i]['id_implemento'];
        $datos['nombre_implemento'] = $implementos_pobres[$i]['nombre_implemento'];
        $datos['precio_implemento'] = $implementos_pobres[$i]['precio_implemento'];
        $datos['cantidad'] = 10;
        $correo['contacto_proveedor'] = 'Don Julio';

        $user = $correo;
        $link ='localhost';
        $receptor = 'cabreracornejoa@gmail.com';

        $mail = new PHPMailer;
        //$mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
        $mail->CharSet = "UTF-8";
        $mail->Encoding = "quoted-printable";
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'noresponde@agiliza.xyz';                     // SMTP username
        $mail->Password = 'asdascion';                     // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
        $mail->Timeout=30;

        $mail->setFrom('noresponde@agiliza.xyz', 'ACM'); //Quien manda el correo?

        $mail->addAddress($receptor, $user);     // A quien le llega

        $mail->isHTML(true);    // Set email format to HTML

        $mail->Subject = 'Solicitud de compra';
        $mail->Body    = LostpassTemplate($datos,$correo);
        $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';

        if(!$mail->send()) {
            //return false;
        }
        else{
            $cantidad=(int)$datos['cantidad'];
            $precio=(int)$datos['precio_implemento'];

            $datos['precio_producto']=$datos['precio_implemento'];
            $datos['neto']=$cantidad * $precio;
            $datos['id_proveedor']= 1 ;
            unset($datos['nombre_implemento']);
            unset($datos['precio_implemento']);

            $database->insert('pedido', $datos);
            //return true;
        }
    }

    //realizar correo de pago
    $correo_compra = $database->select('detalle_carro',  array('[>]implemento' => 'id_implemento'),'*', array('id_carro' => $id_carro_revisar));
    //var_dump($correo_compra);
    //correo electronico

        $user = 'Cristian Canales';
        $link ='localhost';
        $receptor = 'yilo.anm@gmail.com';

        $mail = new PHPMailer;
        //$mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
        $mail->CharSet = "UTF-8";
        $mail->Encoding = "quoted-printable";
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'noresponde@agiliza.xyz';                     // SMTP username
        $mail->Password = 'asdascion';                     // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
        $mail->Timeout=30;

        $mail->setFrom('noresponde@agiliza.xyz', 'ACM'); //Quien manda el correo?

        $mail->addAddress($receptor, $user);     // A quien le llega

        $mail->isHTML(true);    // Set email format to HTML

        $mail->Subject = 'Solicitud de compra';
        $mail->Body    = PagoTemplate($correo_compra);
        $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';
        if(!$mail->send()) {
            //return false;
        }
        else{
            //return true;
        }
    //se termina correo de pago

    $data = $tarjeta;
    $response->withJson($data); 
    
    return $response;
});
//GETS DE DOCUMENTOS INGRESADAS DE COMPRA
$app->get('/listar_pago', function (Request $request, Response $response) {
	imLogin();
	global $database;

    $where = array('AND' => array('id_usuario' => $_SESSION['usuario']['id_usuario'], 'estado' => true ));
    $id_carro = $database->get('carro_compra', 'id_carro_compra', $where );

	$data = $database->get('carro_compra',
        array('carro_compra.neto', 'carro_compra.id_carro_compra'),
        array('AND' => array('carro_compra.estado' => true, 'carro_compra.id_carro_compra' => $id_carro)));

	/*print_r($database->error());*/
	/*$data = $database->select('factura_ingreso', '*', array());*/

	$response->withJson($data);
    return $response;
});

$app->get('/get_compras', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('carro_compra',
        array('[>]info_pago' => 'id_carro_compra'),
        array('carro_compra.id_carro_compra', 'carro_compra.neto', 'carro_compra.forma_pago', 'carro_compra.cantidad_cuotas', 'info_pago.numero_cuenta', 'info_pago.fecha_pago'),
        array('AND' => array('carro_compra.estado' => false)));

    //print_r($database->error());*/
    /*$data = $database->select('factura_ingreso', '*', array());*/

    /*var_dump($data);*/

    for ($i=0; $i < sizeof($data); $i++) { 
        $cadena = $data[$i]['numero_cuenta'];
        $data[$i]['numero_cuenta'] = substr($cadena,-4);
    }

    /*var_dump($data);*/

    $response->withJson($data);
    return $response;
});

$app->get('/get_pedidos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $pedidos = $database->select('pedido',  array('[>]proveedor' => 'id_proveedor'),'*');
    //var_dump($pedidos);
    $response->withJson($pedidos);
    return $response;
});

$app->run();

?>