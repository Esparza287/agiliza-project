<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";
require "../tools/notificacion_movil.php";

$app = new \Slim\App;
$database = new medoo();

//SECCION DE POST
$app->post('/subir_horario[/{bloque}]', function (Request $request, Response $response, $args) {
    global $database;
    $params = $request->getParsedBody();
    $horario = $params['horario'];
    $id_curso = $horario[0]['id_curso_anual'];

    //var_dump($horario);
    $database->delete('horario', array( 'id_curso_anual' => $id_curso ));
    for ($i=0; $i < sizeof($horario); $i++) {
        $database->insert('horario', $horario[$i]);
    }

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

//Devuelve el horario
$app->get('/get_horario[/{id_curso_anual}]', function (Request $request, Response $response, $args) {
    global $database;
    $id_curso = $args['id_curso_anual'];

    //$data = $database->select('horario', '*', array( 'id_curso_anual' => $id_curso ));
    $data = $database->select('horario',
    array('[>]asignatura' => array('horario.id_asignatura' => 'id_asignatura')),
    array('asignatura.nombre_asignatura', 'horario.id_asignatura', 'horario.id_profesor', 'horario.dia_semana'),
    array('AND' => array('horario.id_curso_anual' => $id_curso)));

    $response->withJson($data);
    return $response;
});

$app->get('/get_asignaturas_cursos[/{id_curso_anual}/{id_curso}]', function(Request $request, Response $response, $args){
    imLogin();
    global $database;
    $id_curso_anual = $args['id_curso_anual'];
    $id_curso = $args['id_curso'];

    $alumnos = $database->select('detalle_curso_anual',
    array('[>]asignatura' => array('detalle_curso_anual.id_asignatura' => 'id_asignatura'),
          '[>]detalle_asignatura' => array('detalle_curso_anual.id_asignatura' => 'id_asignatura')),
    array('asignatura.id_asignatura', 'asignatura.nombre_asignatura', 'asignatura.id_especialidad', 'detalle_curso_anual.id_profesor', 'detalle_asignatura.horas_asignatura'),
    array('AND' => array('detalle_curso_anual.id_curso_anual' => $id_curso_anual, 'detalle_curso_anual.id_profesor[!]' => null, 'asignatura.vigencia' => true, 'detalle_asignatura.id_curso' => $id_curso)));

    $response->withJson($alumnos);
    return $response;
});

$app->run();

?>
