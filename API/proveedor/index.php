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

//GUARDA O MODIFICA EN LA BD LA INFORMACION DE UN PROVEEDOR
$app->post('/subir_proveedor', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();    
    $proveedor = $params['proveedor'];
    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($proveedor['id_proveedor'])){
        $id_proveedor = $database->insert('proveedor', $proveedor);
    }
    else{
        $id_proveedor = $proveedor['id_proveedor'];
        unset($proveedor['$id_proveedor']);
        $database->update('proveedor', $proveedor, array('id_proveedor' => $id_proveedor));
    }

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data); 
    
    return $response;
});

//OBTIENE TODOS LOS PREVEEDORES
$app->get('/get_proveedores', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $data = $database->select('proveedor', '*');

    /*print_r($database->error());*/
    /*$data = $database->select('factura_ingreso', '*', array());*/

    $response->withJson($data); 
    return $response;
});

//OBTIENE EL PROVEEDOR A MODIFICAR
$app->get('/get_proveedor[/{id_proveedor}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_proveedor = $args['id_proveedor'];

    $data = $database->get('proveedor', '*', array( 'id_proveedor' => $id_proveedor));

    $response->withJson($data); 
    return $response;
});

//ENVIA UN CORREO SOLICITANDO STOCK Y AGREGA UN PEDIDO
$app->post('/send_email', function (Request $request, Response $response) {
    $params = $request->getParsedBody();    
    $datos = $params['datos'];
    global $database;

    $correo = $database->get('proveedor', '*', array('id_proveedor' => $datos['id_proveedor']));

    $user = $correo['razon_social'];
    $link ='localhost';
    $receptor = $correo['correo_proveedor'];

    $mail = new PHPMailer;
    //$mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
    $mail->CharSet = "UTF-8";
    $mail->Encoding = "quoted-printable";
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.agiliza.xyz';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'contacto@agiliza.xyz';                     // SMTP username
    $mail->Password = 'tesis';                     // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
    $mail->Timeout=30;

    $mail->setFrom('contacto@agiliza.xyz', 'ACM'); //Quien manda el correo?

    $mail->addAddress($receptor, $user);     // A quien le llega

    $mail->isHTML(true);    // Set email format to HTML

    $mail->Subject = 'Solicitud de compra';
    $mail->Body    = LostpassTemplate($datos,$correo);
    $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';

    if(!$mail->send()) {
        return false;
    }
    else{
        $cantidad=(int)$datos['cantidad'];
        $precio=(int)$datos['precio_implemento'];

        $datos['precio_producto']=$datos['precio_implemento'];
        $datos['neto']=$cantidad * $precio;
        unset($datos['nombre_implemento']);
        unset($datos['precio_implemento']);

        $database->insert('pedido', $datos);
        return true;
    }
});

$app->run();

?>