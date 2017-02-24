<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";

$app = new \Slim\App;
$database = new medoo();

$app->get('/get_libros', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $libros = $database->select('libro', '*', array( 'vigencia' => true ));

    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_cantidad', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $libros = $database->select('libro', '*',array('AND' => array('vigencia' => true, 'cantidad[>]' => 0)));


    $data = array('status' => $database->error());

    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_pedidos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $fecha = date('Y-m-j');

    $libros = $database->query('
            Select reserva.id_reserva, usuario.nombres_usuario,
            usuario.apellido_paterno, usuario.rut_usuario, 
            libro.titulo_libro, reserva.fecha_devolucion,
            reserva.id_libro, reserva.estado
            from usuario inner join
            (alumno inner join
            (reserva inner join libro 
            on reserva.id_libro = libro.id_libro) 
            on alumno.id_alumno = reserva.id_alumno) 
            on usuario.id_usuario = alumno.id_usuario
            Where estado = \'prestado\' and reserva.fecha_devolucion >= \'' . $fecha . '\'')->fetchAll(PDO::FETCH_ASSOC);

    $data = array('status' => $database->error());
    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_atrazados', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $fecha = date('Y-m-j');

    $libros = $database->query('
            Select reserva.id_reserva, usuario.nombres_usuario,
            usuario.apellido_paterno, usuario.rut_usuario, 
            libro.titulo_libro, reserva.fecha_devolucion,
            reserva.id_libro, reserva.estado
            from usuario inner join
            (alumno inner join
            (reserva inner join libro 
            on reserva.id_libro = libro.id_libro) 
            on alumno.id_alumno = reserva.id_alumno) 
            on usuario.id_usuario = alumno.id_usuario
            Where estado = \'prestado\' and reserva.fecha_devolucion < \'' . $fecha . '\'')->fetchAll(PDO::FETCH_ASSOC);

    $data = array('status' => $database->error());
    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_completos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $fecha = date('Y-m-j');

    $libros = $database->query('
            Select reserva.id_reserva, usuario.nombres_usuario,
            usuario.apellido_paterno, usuario.rut_usuario, 
            libro.titulo_libro,reserva.fecha_devolucion,
            reserva.id_libro, reserva.estado
            from usuario inner join
            (alumno inner join
            (reserva inner join libro 
            on reserva.id_libro = libro.id_libro) 
            on alumno.id_alumno = reserva.id_alumno) 
            on usuario.id_usuario = alumno.id_usuario
            Where estado = \'completo\'')->fetchAll(PDO::FETCH_ASSOC);

    $data = array('status' => $database->error());
    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_cancelados', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $fecha = date('Y-m-j');

    $libros = $database->query('
            Select reserva.id_reserva, usuario.nombres_usuario,
            usuario.apellido_paterno, usuario.rut_usuario, 
            libro.titulo_libro, reserva.fecha_devolucion,
            reserva.id_libro, reserva.estado
            from usuario inner join
            (alumno inner join
            (reserva inner join libro 
            on reserva.id_libro = libro.id_libro) 
            on alumno.id_alumno = reserva.id_alumno) 
            on usuario.id_usuario = alumno.id_usuario
            Where estado = \'perdido\'')->fetchAll(PDO::FETCH_ASSOC);

    $data = array('status' => $database->error());
    $response->withJson($libros);
    return $response;
});

$app->get('/get_libros_mostrar[/{id_libro}]', function (Request $request, Response $response,$args) {
    imLogin();
    global $database;

    $id_libro = $args['id_libro'];

    $data = $database->get('libro', '*', array('id_libro' => $id_libro));

    $response->withJson($data);
    
    return $response;
});

$app->post('/devolver_pedido', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $item = $params['item'];
    $estado = $params['estado'];


    if($estado == 'completo'){
    $data = $database->update('libro', array('cantidad[+]' => 1), array('id_libro' => $item['id_libro']));
    }

    $data = $database->update('reserva', array('estado' => $estado), array('id_reserva' => $item['id_reserva']));


    $data = array('status' => $database->error());
    $response->withJson($data);
    return $data;
});

$app->post('/guardar_pedido', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $id_alumno = $params['id_alumno'];
    $libros = $params['libros'];

    for ($i=0; $i <sizeof($libros) ; $i++) { 
        $fecha = date('Y-m-j');
        $nuevodia = strtotime ( '+'. $libros[$i]['dias'] .' day' , strtotime ( $fecha ) ) ;
        $nuevodia = date ( 'Y-m-d' , $nuevodia );

         $data = $database->insert('reserva',array( 'id_alumno' => $id_alumno , 'id_libro' => $libros[$i]['id_libro'],'fecha_reserva' => $fecha, 'fecha_devolucion' => $nuevodia, 'estado' => 'prestado'));

         $data = $database->update('libro', array('cantidad[-]' => 1), array('id_libro' => $libros[$i]['id_libro']));
    }


    $data = array('status' => $database->error());
    $response->withJson($data);
    return $data;
});

$app->post('/guardar_libro', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $libro = $params['datos'];

    if($libro['id_libro'] != 0){
        $id_libro = $libro['id_libro'];
        unset($libro['id_libro']);
        $data = $database->update('libro', $libro, array('id_libro' => $id_libro));
        var_dump($data);
    }else {
        unset($libro['id_libro']);
        $data = $database->insert('libro',$libro);
    }

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $data;
});

$app->run();

?>