<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require '../tools/medoo.min.php';
require '../tools/tools.php';
require_once('../vendor/phpmailer/phpmailer/class.phpmailer.php');
require_once('../vendor/phpmailer/phpmailer/class.smtp.php');
require_once('../vendor/phpmailer/UsuarioTemplate.php');

//INSTANCIA DE SLIM Y MEDOO

$app = new \Slim\App;
$database = new medoo();

//AGREGAR O MODIFICA UN ALUMNO A LA BD
$app->post('/subir_admin', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $usuario = $params['usuario'];
    $info = $params['info'];
    $permisos = $params['permisos'];
    $temp ='';

    unset($info['asignaturas']);
    unset($info['horas_profesor']);
    unset($info['nivel_alumno']);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($usuario['id_usuario'])){
        $clave = randomPassword();
        $usuario['hash_usuario'] = createHash($usuario['email_usuario'], $clave );
        $usuario['fecha_creacion'] = $fecha;
        $usuario['pass_temp'] =  $clave;
        $usuario['main_page'] =  'inicio.panel';
        $temp = $clave;

        $id_usuario = $database->insert('usuario', $usuario);

        $rol['id_usuario'] = $id_usuario;
        $rol['id_rol'] = 1;
        $database->insert('rol_usuario', $rol);

        $info['id_usuario'] = $id_usuario;
        $database->insert('administrativo', $info);
        $permisos['id_usuario'] = $id_usuario;
        $database->insert('permisos', $permisos);

        enviarCorreoNuevo($usuario['email_usuario'], $usuario['nombres_usuario'], $usuario['apellido_paterno'], $usuario['apellido_materno'], $temp);
    }
    else{
        $id_administrativo = $info['id_usuario'];
        unset($info['id_usuario']);
        $id_usuario = $usuario['id_usuario'];
        unset($usuario['id_usuario']);
        $id_permisos = $permisos['id_premisos'];
        unset($permisos['id_premisos']);

        $database->update('administrativo', $info, array('id_administrativo' => $id_administrativo));
        $database->update('usuario', $usuario, array('id_usuario' => $id_usuario));
        $database->update('permisos', $permisos, array('id_premisos' => $id_permisos));
    }

    //var_dump($database->error());

    /*print_r($database->error());*/
    $data = array('status' => $database->error());
    $response->withJson($data);

    return $response;
});

//AGREGAR O MODIFICA UN PROFESOR A LA BD
$app->post('/subir_profesor', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $usuario = $params['usuario'];
    $profesor = $params['profesor'];
    $permisos = [];
    $asignatura = [];
    $temp = '';

    $arreglo_asignaturas = $profesor['asignaturas'];
    unset($profesor['asignaturas']);
    unset($profesor['nivel_alumno']);
    //var_dump($arreglo_asignaturas);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($usuario['id_usuario'])){
        $clave = randomPassword();
        $usuario['hash_usuario'] = createHash($usuario['email_usuario'], $clave );
        $usuario['fecha_creacion'] = $fecha;
        $usuario['pass_temp'] =  $clave;
        $usuario['main_page'] =  'inicio.panel';
        $temp = $clave;

        $permisos['registros'] = true;
        $permisos['tienda'] = true;
        $permisos['talleres'] = true;

        $id_usuario = $database->insert('usuario', $usuario);

        $rol['id_usuario'] = $id_usuario;
        $rol['id_rol'] = 3;
        $database->insert('rol_usuario', $rol);

        $profesor['id_usuario'] = $id_usuario;
        $id_profesor = $database->insert('profesor', $profesor);
        $permisos['id_usuario'] = $id_usuario;
        $database->insert('permisos', $permisos);

        foreach ($arreglo_asignaturas as $key => $value) {
            $asignatura['id_asignatura'] = $arreglo_asignaturas[$key];
            $asignatura['id_profesor'] = $id_profesor;
            $database->insert('profesor_asignaturas', $asignatura);
        }

        enviarCorreoNuevo($usuario['email_usuario'], $usuario['nombres_usuario'], $usuario['apellido_paterno'], $usuario['apellido_materno'], $temp);
    }
    else{
        $id_profesor = $profesor['id_profesor'];
        unset($profesor['id_profesor']);
        $id_usuario = $usuario['id_usuario'];
        unset($usuario['id_usuario']);

        $database->update('profesor', $profesor, array('id_profesor' => $id_profesor));
        $database->update('usuario', $usuario, array('id_usuario' => $id_usuario));

        $database->delete('profesor_asignaturas', array( 'id_profesor' => $id_profesor ));
        foreach ($arreglo_asignaturas as $key => $value) {
            $asignatura['id_asignatura'] = $arreglo_asignaturas[$key];
            $asignatura['id_profesor'] = $id_profesor;
            $database->insert('profesor_asignaturas', $asignatura);
        }
    }

    //var_dump($database->error());
    $data = array('status' => $database->error());
    $response->withJson($data);

    return $response;
});

//AGREGAR O MODIFICA UN ALUMNO A LA BD
$app->post('/subir_alumno', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $usuario = $params['usuario'];
    $alumno = $params['alumno'];
    $permisos = [];
    $temp = '';

    unset($alumno['asignaturas']);
    unset($alumno['horas_profesor']);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($usuario['id_usuario'])){
        $clave = randomPassword();
        $usuario['hash_usuario'] = createHash($usuario['email_usuario'], $clave );
        $usuario['fecha_creacion'] = $fecha;
        $usuario['pass_temp'] =  $clave;
        $usuario['main_page'] =  'inicio.panel';
        $temp = $clave;

        $permisos['mi_registro'] = true;
        $permisos['tienda'] = true;

        $id_usuario = $database->insert('usuario', $usuario);

        $rol['id_usuario'] = $id_usuario;
        $rol['id_rol'] = 2;
        $database->insert('rol_usuario', $rol);

        $alumno['id_usuario'] = $id_usuario;
        $database->insert('alumno', $alumno);
        $permisos['id_usuario'] = $id_usuario;
        $database->insert('permisos', $permisos);

        enviarCorreoNuevo($usuario['email_usuario'], $usuario['nombres_usuario'], $usuario['apellido_paterno'], $usuario['apellido_materno'], $temp);
    }
    else{
        $id_alumno = $alumno['id_alumno'];
        unset($alumno['id_alumno']);
        $id_usuario = $usuario['id_usuario'];
        unset($usuario['id_usuario']);

        $database->update('alumno', $alumno, array('id_alumno' => $id_alumno));
        $database->update('usuario', $usuario, array('id_usuario' => $id_usuario));
    }

    //var_dump($database->error());
    $data = array('status' => $database->error());
    $response->withJson($data);

    return $response;
});

//AGREGAR O MODIFICA UN APODERADO A LA BD
$app->post('/subir_apoderado', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $usuario = $params['usuario'];
    $apoderado = $params['apoderado'];
    $permisos = [];
    $Temp = '';

    unset($apoderado['asignaturas']);
    unset($apoderado['horas_profesor']);
    unset($apoderado['nivel_alumno']);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    if(!isset($usuario['id_usuario'])){
        $clave = randomPassword();
        $usuario['hash_usuario'] = createHash($usuario['email_usuario'], $clave );
        $usuario['fecha_creacion'] = $fecha;
        $usuario['pass_temp'] =  $clave;
        $usuario['main_page'] =  'inicio.panel';
        $temp = $clave;

        $permisos['mi_registro'] = true;
        $permisos['tienda'] = true;

        $id_usuario = $database->insert('usuario', $usuario);

        $rol['id_usuario'] = $id_usuario;
        $rol['id_rol'] = 4;
        $database->insert('rol_usuario', $rol);

        $apoderado['id_usuario'] = $id_usuario;
        $database->insert('apoderado', $apoderado);
        $permisos['id_usuario'] = $id_usuario;
        $database->insert('permisos', $permisos);

        enviarCorreoNuevo($usuario['email_usuario'], $usuario['nombres_usuario'], $usuario['apellido_paterno'], $usuario['apellido_materno'], $temp);
    }
    else{
        $id_apoderado = $apoderado['id_apoderado'];
        unset($apoderado['id_apoderado']);
        $id_usuario = $usuario['id_usuario'];
        unset($usuario['id_usuario']);

        $database->update('apoderado', $apoderado, array('id_apoderado' => $id_apoderado));
        $database->update('usuario', $usuario, array('id_usuario' => $id_usuario));
    }

    //var_dump($database->error());
    $data = array('status' => $database->error());
    $response->withJson($data);

    return $response;
});

//MODIFICA EL USUARIO CONECTADO
$app->post('/subir_cambios', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $personal = $params['personal'];

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    unset($personal['clave1']);
    unset($personal['clave2']);

    $id_usuario = $personal['id_usuario'];
    unset($personal['id_usuario']);

    $database->update('usuario', $personal, array('id_usuario' => $id_usuario));

    $data = array('status' => $database->error());

    $response->withJson($personal);
    return $response;
});

//MODIFICA EL USUARIO CONECTADO CON SU CLAVE
$app->post('/subir_cambios_clave', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $personal = $params['personal'];

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    $clave = $personal['clave1'];
    unset($personal['clave1']);
    unset($personal['clave2']);
    $personal['hash_usuario'] = createHash($personal['email_usuario'], $clave );
    $personal['pass_temp'] =  $clave;

    $id_usuario = $personal['id_usuario'];
    unset($personal['id_usuario']);

    $database->update('usuario', $personal, array('id_usuario' => $id_usuario));

    $data = array('status' => $database->error());

    $response->withJson($personal);
    return $response;
});

//ENTREGA TODOS LOS NIVELES DE LOS ALUMNOS DE LA TABLA NIVEL_ALUMNO
$app->get('/get_niveles', function (Request $request, Response $response) {
	global $database;
	$data = $database->select('curso', '*', array());
	$response->withJson($data);
    return $response;
});

//ENTREGA EL USUARIO ESPECIFICO QUE CORRESPONDE AL RUT
$app->get('/get_usuario[/{id_usuario}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_usuario = $args['id_usuario'];
    $arreglo_final = [];

    $usuario = $database->get('usuario', '*', array('id_usuario' => $id_usuario));
    $tipo_usuario = $usuario['tipo_usuario'];

    if ($tipo_usuario == 'Administrador') {
        $info = $database->get('administrativo', '*', array('id_usuario' => $usuario['id_usuario']));
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
        $data = array('usuario' => $usuario, 'info' => $info, 'asignaturas' => null, 'permisos' => $permisos, 'error' => $database->error());
    }
    else if ($tipo_usuario == 'Alumno') {
        $info = $database->get('alumno', '*', array('id_usuario' => $usuario['id_usuario']));
        $data = array('usuario' => $usuario, 'info' => $info, 'asignaturas' => null, 'permisos' => null, 'error' => $database->error());
    }
    else if ($tipo_usuario == 'Profesor') {
        $info = $database->get('profesor', '*', array('id_usuario' => $usuario['id_usuario']));
        //CONSULTA POR ARREGLAR
        $asignaturas = $database->select('profesor_asignaturas',
        array('[>]asignatura' => array('profesor_asignaturas.id_asignatura' => 'id_asignatura')),
        array('asignatura.id_asignatura'),
        array('AND' => array('profesor_asignaturas.id_profesor' => $info['id_profesor'])));
        for ($i=0; $i < sizeof($asignaturas); $i++) {
            $arreglo_final[$i] = $asignaturas[$i]['id_asignatura'];
        }
        $data = array('usuario' => $usuario, 'info' => $info, 'asignaturas' => $arreglo_final, 'permisos' => null, 'error' => $database->error());
    }
    else if ($tipo_usuario == 'Apoderado') {
        $info = $database->get('apoderado', '*', array('id_usuario' => $usuario['id_usuario']));
        $data = array('usuario' => $usuario, 'info' => $info, 'asignaturas' => null, 'permisos' => null, 'error' => $database->error());
    }
    else{
        $data = array('error' => $database->error());
    }

    $response->withJson($data);

    return $data;
});

//ENTREGA EL USAURIO ESPECIFICO QUE ESTA CONECTADO
$app->get('/get_usuario_conectado', function (Request $request, Response $response) {
    global $database;
    imLogin();

    $cols = array('apellido_materno', 'apellido_paterno', 'direccion_usuario', 'email_usuario', 'id_usuario', 'nombres_usuario', 'rut_usuario', 'sexo_usuario', 'telefono_usuario', 'tipo_usuario');
    $data = $database->get('usuario', $cols, array('id_usuario' => $_SESSION['usuario']['id_usuario'] ));

    $response->withJson($data);
    return $response;
});

//ENTREGA EL PROFESOR ESPECIFICO QUE CORRESPONDE AL RUT
$app->get('/get_profesor[/{rut_usuario}]', function (Request $request, Response $response, $args) {
    global $database;
    $rut_usuario = $args['rut_usuario'];
    $usuario = $database->get('usuario', '*', array('rut_usuario' => $rut_usuario));
    if ($usuario) {
        $profesor = $database->get('profesor', '*', array('rut_profesor' => $usuario['rut_usuario']));
        $data = array('usuario' => $usuario, 'profesor' => $profesor, 'error' => $database->error());
    }
    else{
        $data = array('error' => $database->error());
    }

    $response->withJson($data);

    return $response;
});

//ENTREGA TODOS LOS USUARIOS
$app->get('/get_usuarios', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('usuario', array('id_usuario', 'rut_usuario', 'nombres_usuario', 'apellido_paterno', 'apellido_materno'));

    $response->withJson($data);
    return $response;
});

//ENTREGA TODOS LOS ALUMNOS, TOMA INFORMACION DE LA TABLA ALUMNO Y USUARIO, COMPARA LA INFORMACION Y CREA UN OBJETO JSON
$app->get('/get_alumnos', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('alumno',
        array(
            '[>]usuario' => array('alumno.id_usuario' => 'id_usuario')
             ),
        array('alumno.nivel_alumno', 'usuario.id_usuario', 'usuario.rut_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.telefono_usuario', 'usuario.direccion_usuario', 'usuario.email_usuario', 'usuario.sexo_usuario', 'usuario.imagen_url','alumno.id_alumno', 'usuario.fecha_ultimo_login'),
        array('AND' => array('alumno.vigencia' => true)));

    $response->withJson($data);

    return $response;
});

//ENTREGA TODOS LOS ADMINISTRATIVOS
$app->get('/get_administrativos', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('administrativo',
        array(
            '[>]usuario' => array('administrativo.id_usuario' => 'id_usuario')
             ),
        array('usuario.id_usuario', 'usuario.rut_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.telefono_usuario', 'usuario.direccion_usuario', 'usuario.email_usuario', 'usuario.sexo_usuario', 'usuario.imagen_url', 'usuario.fecha_ultimo_login'),
        array('AND' => array('administrativo.vigencia' => true)));

    $response->withJson($data);

    return $response;
});

//ENTREGA TODOS LOS PROFESORES FORMATEADOR PARA SELECCIONAR EL PROFESOR JEFE
$app->get('/get_profes', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('profesor',
        array(
            '[>]usuario' => array('profesor.id_usuario' => 'id_usuario')
             ),
        array('profesor.horas_profesor', 'profesor.id_profesor', 'usuario.id_usuario', 'usuario.rut_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.telefono_usuario', 'usuario.direccion_usuario', 'usuario.email_usuario', 'usuario.sexo_usuario', 'usuario.imagen_url', 'usuario.fecha_ultimo_login'),
        array('AND' => array('profesor.vigencia' => true)));

    $response->withJson($data);

    return $response;
});

//ENTREGA TODOS LOS PROFESORES_ASIGNATURAS
$app->get('/get_profes_asignaturas[/{id_profesor}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_profesor = $args['id_profesor'];
    $data = $database->select('profesor_asignaturas',
        array('[>]asignatura' => array('profesor_asignaturas.id_asignatura' => 'id_asignatura')),
        array('asignatura.nombre_asignatura'),
        array('AND' => array('profesor_asignaturas.id_profesor' => $id_profesor)));

    $response->withJson($data);
    return $response;
});

//ENTREGA TODOS LOS APODERADOS
$app->get('/get_apoderados', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('apoderado',
        array(
            '[>]usuario' => array('apoderado.id_usuario' => 'id_usuario')
             ),
        array('usuario.id_usuario', 'apoderado.id_apoderado', 'usuario.rut_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.telefono_usuario', 'usuario.direccion_usuario', 'usuario.email_usuario', 'usuario.sexo_usuario', 'usuario.imagen_url'),
        array('AND' => array('apoderado.vigencia' => true)));

    $response->withJson($data);

    return $response;
});

//ENTREGA TODOS LOS RUTS DE LOS USUARIOS REGISTRADOS
$app->get('/get_ruts_usuarios', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('usuario', 'rut_usuario');

    $response->withJson($data);
    return $response;
});

//ENTREGA TODOS LOS CORREOS DE LOS USUARIOS REGISTRADOS
$app->get('/get_correos_usuarios', function (Request $request, Response $response) {
    global $database;

    $data = $database->select('usuario', array('email_usuario', 'id_usuario'));

    $response->withJson($data);
    return $response;
});

//SUBE UNA NUEVA IMAGEN DE PERFIL
$app->post('/subir_imagen', function (Request $request, Response $response) {

    global $database;
    imLogin();
    $params = $request->getParsedBody();
    $imagen = $params['imagen'];

    date_default_timezone_set('America/Santiago');
    $nombre = date("YmdHis");
    //$nombre = substr($cadena, -5);
    //$nombre = $nombre.$numero;
    $nombre = $nombre.'.png';

    list(, $imagen) = explode(';', $imagen);
    list(, $imagen) = explode(',', $imagen);

    $imagen = base64_decode($imagen);

    file_put_contents('../../img/perfil/'.$nombre, $imagen);

    $database->update('usuario', array('imagen_url' => $nombre), array('id_usuario' => $_SESSION['usuario']['id_usuario']));
    $_SESSION['usuario']['imagen_url'] = $nombre;

    return $nombre;
});

$app->run();
?>
