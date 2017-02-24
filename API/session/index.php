<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require '../tools/medoo.min.php';
require '../tools/tools.php';
require_once('../vendor/phpmailer/phpmailer/class.phpmailer.php');
require_once('../vendor/phpmailer/phpmailer/class.smtp.php');
require_once('../vendor/phpmailer/LostpassTemplate.php');
require_once('../vendor/phpmailer/NuevaClaveTemplate.php');

$app = new \Slim\App;
$database = new medoo();

////////////////////////POSTS////////////////////////////////
/* Login */
$app->post('/login', function (Request $request, Response $response) {
	global $database;
    $params = $request->getParsedBody();

    $hash = $database->get('usuario', 'hash_usuario' , array('email_usuario' => $params['email']));

    ///ESTAMOS LOGUEADOS///
    if($hash and check($params['pass'], $hash)){
		
		$fecha = getNow();
		$database->update('usuario', array('fecha_ultimo_login'=>$fecha), array('email_usuario' => $params['email']));

		$usuario = $database->get('usuario',
			array('usuario.id_usuario','usuario.nombres_usuario', 'usuario.main_page', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.rut_usuario', 'usuario.email_usuario', 'usuario.tipo_usuario', 'usuario.imagen_url') , 
			array('email_usuario' => $params['email']));
		//print_r($database->error());

        $id_curso_anual = $database->select('alumno_curso',
        array(
            '[>]alumno' => array('alumno_curso.id_alumno' => 'id_alumno')
             ),
        array('alumno_curso.id_curso_anual'),
        array('alumno.id_usuario' => $usuario['id_usuario']));

        if ($id_curso_anual == false) {
            $id_curso_anual = 0;
        }

		$roles = $database->select('rol_usuario', array('[>]rol' => 'id_rol'), 'rol.alias_rol' , array( 'rol_usuario.id_usuario' => $usuario['id_usuario']));

		//CONSULTA POR ARREGLAR
		$permisos = $database->get('permisos', '*', array('id_usuario' => $usuario['id_usuario']));
	    foreach ($permisos as $key => $value) {
	        if ($key != 'id_administrativo' && $key != 'id_premisos' && $key != 'id_usuario') {
	            if ($value == 1) {
	                $permisos[$key] = true;
	            }
	            else{
	                $permisos[$key] = false;
	            }
	        }
	    }

	    $year = $database->get('year', '*', array( 'estado' => true ));
		session_start();
		$usuario['roles'] = $roles;
        $usuario['permisos'] = $permisos;
		$usuario['id_curso_anual'] = $id_curso_anual[0]['id_curso_anual'];
		$_SESSION['usuario'] = $usuario;
		$_SESSION['year'] = $year;
		unset($usuario['id_usuario']);
		$data = array('status' => 'OK', 'user' => $usuario, 'year' => $year);
    }
    else{
    	$data = array('status' => 'Error', 'error'=> $database->error());
    }

	$response->withJson($data);	
	
    return $response;
});

////////////////////////GETS/////////////////////////////////

/* Salir del sistema */
$app->get('/log_out', function (Request $request, Response $response) {
	session_start();
	$_SESSION["usuario"] = null;
	$_SESSION["year"] = null;
    session_destroy();
    session_unset();
	$data = array('status' => 'OK');
	$response->withJson($data);	
    return $response;
});

/* Verifica si sigue logueado */
$app->get('/session_alive', function (Request $request, Response $response) {
	session_start();
	if (isset($_SESSION['most_recent_activity']) && 
    (time() -   $_SESSION['most_recent_activity'] > 18000)) {
	    //600 seconds = 10 minutes
	    $_SESSION['usuario'] = null;
	    session_destroy();   
	    session_unset();      
	}
	$_SESSION['most_recent_activity'] = time();

	if(isset($_SESSION['usuario'])){
		$data = array('status' => 'OK', 'user' => $_SESSION['usuario'], 'year' => $_SESSION['year']);
	}
	else{
		$data = array('status' => 'NO');	
	}
	
	$response->withJson($data);	
    return $response;
});

/* DEVUELVE LA INFORMACIÖN DEL USUARIO LOGUEADO */
$app->get('/datos_conexion', function (Request $request, Response $response) {
	imLogin();
	global $database;

	$usuario = $database->get('usuario',
		array('usuario.id_usuario','usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.rut_usuario', 'usuario.email_usuario', 'usuario.tipo_usuario', 'usuario.imagen_url') , 
		array('id_usuario' => $_SESSION['usuario']['id_usuario']));

	$tipo_usuario = $usuario['tipo_usuario'];

	$permisos = $database->get('permisos', '*', array('id_usuario' => $usuario['id_usuario']));
    foreach ($permisos as $key => $value) {
        if ($key != 'id_administrativo' && $key != 'id_premisos' && $key != 'id_usuario') {
            if ($value == 1) {
                $permisos[$key] = true;
            }
            else{
                $permisos[$key] = false;
            }
        }
    }
    $data = array('usuario' => $usuario, 'permisos' => $permisos, 'error' => $database->error());

	$response->withJson($data);	
    return $response;
});

$app->post('/recuperar_clave', function (Request $request, Response $response) {
	global $database;
    $params = $request->getParsedBody();
	$correo = $params['datos'];

	$data = [];

	$id_usuario = $database->get('usuario', 'id_usuario', array('email_usuario' => $correo));

  	$keypass = md5(time());

	if($id_usuario > 0){
		$user = $correo;
        $link ='http://agiliza.xyz/#/nueva_clave/'. $keypass;
        $receptor = $correo;

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

        $mail->Subject = 'Recuperación de clave. noreply';
        $mail->Body    = LostpassTemplate($user,$link);
        $mail->AltBody = 'Hola ' . $user . ' para recuperar su clave debes ir a este enlace: ' . $link . ' , si no has solicitado un cambio de contraseña no necesitas hacer nada.';

        if(!$mail->send()) {
           $data = array('status' => 'ERROR');
        	//error en correo
        }
        else{
           $database->update('usuario', array( 'link_temporal' => $keypass ), array('id_usuario' => $id_usuario));
           $data = array('status' => 'OK');
		}

   	//kadath287@gmail.com
	}else {
		$data = array('status' => 'ERROR');
	}
	//$data = array('status' => $database->error());
	$response->withJson($data);

    return $response;
});

$app->post('/nueva_clave[/{cod}]', function (Request $request, Response $response, $args) {
	global $database;
    $cod = $args['cod'];
   	$res = false;

   	$usuario = $database->select('usuario','*', array('link_temporal' => $cod));

   	if($usuario){
   	 	$id = $usuario[0]['id_usuario'];
   	 	$user = $usuario[0]['nombres_usuario'];


        $clave = randomPassword();
        //var_dump($clave);
   	 	$dts = [];
  		$dts['link_temporal'] = '';
        $dts['hash_usuario'] = createHash($usuario[0]['email_usuario'], $clave );
        $dts['pass_temp'] =  $clave;

        $receptor = $usuario[0]['email_usuario'];

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

        $mail->Subject = 'Recuperación de clave. noreply';
        $mail->Body    = NuevaClaveTemplate($user,$clave);
        $mail->AltBody = '';

        if(!$mail->send()) {
           $data = array('status' => 'ERROR');
        	//error en correo
        }else{
           $database->update('usuario', $dts, array('id_usuario' => $id));
           $data = array('status' => 'OK');
		}
   	 }

   	//var_dump($res);
	$response->withJson($data);	
    return $response;
});

/* DEVUELVE LA INFORMACIÖN DEL USUARIO LOGUEADO */
$app->get('/get_foto_actualizada', function (Request $request, Response $response) {
	imLogin();
	global $database;

	$usuario = $database->get('usuario', 'imagen_url', array('id_usuario' => $_SESSION['usuario']['id_usuario']));

	$response->withJson($usuario);	
    return $response;
});

$app->run();
?>