<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
require "../tools/medoo.min.php";
require "../tools/tools.php";
require "../tools/notificacion_movil.php";

$app = new \Slim\App;
$database = new medoo();

$app->get('/get_materias', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $fecha = $_SESSION['year']['year'];

    //var_dump($_SESSION['usuario']['id_usuario']);
    $asignaturas=$database->query('Select coalesce((select detalle_curso_anual.id_detalle_curso_anual from
        detalle_curso_anual where detalle_curso_anual.id_curso_anual = curso_anual.id_curso_anual and
        detalle_curso_anual.id_asignatura = asignatura.id_asignatura),0) as id_detalle_curso_anual,
        asignatura.id_asignatura,
        asignatura.nombre_asignatura,
        curso_anual.id_curso_anual,
        coalesce((select detalle_curso_anual.id_profesor from
        detalle_curso_anual where detalle_curso_anual.id_curso_anual = curso_anual.id_curso_anual and
        detalle_curso_anual.id_asignatura = asignatura.id_asignatura),0) as id_profesor
        FROM (asignatura inner join detalle_asignatura on asignatura.id_asignatura = detalle_asignatura.id_asignatura)
        inner join curso_anual WHERE curso_anual.fecha_curso_anual = '. $fecha . ' and
        detalle_asignatura.id_curso =  curso_anual.id_curso and
        (asignatura.id_especialidad = curso_anual.id_especialidad or asignatura.id_especialidad = 1) and asignatura.vigencia =1
        order by curso_anual.id_curso')->fetchAll(PDO::FETCH_ASSOC);

    $response->withJson($asignaturas);
    return $response;
});

$app->get('/get_asignaturas', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $asignaturas = $database->select('asignatura', '*', array( 'vigencia' => true ));

    $response->withJson($asignaturas);
    return $response;
});

$app->get('/get_especialidades', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $especialidades = $database->select('especialidad','*');

    $response->withJson($especialidades);
    return $response;
});

$app->get('/get_cursos_anuales', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $fecha = $_SESSION['year']['year'];

    $cursos_anuales = $database->query('select * from curso inner join (curso_anual inner join especialidad on curso_anual.id_especialidad = especialidad.id_especialidad) on curso.id_curso = curso_anual.id_curso
    where fecha_curso_anual = ' . $fecha . ' and curso.vigencia = 1 order by curso_anual.nombre_curso_anual')->fetchAll(PDO::FETCH_ASSOC);

        //var_dump($cursos_anuales);
        $response->withJson($cursos_anuales);
        return $response;
    });


$app->get('/get_cursos_anuales_listado', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $fecha = $_SESSION['year']['year'];

    $cursos_anuales = $database->query('select curso.id_curso, curso.descripcion_curso, curso.limite_curso,
        curso.cantidad_letras, curso.vigencia, curso_anual.id_curso_anual,
        curso_anual.nombre_curso_anual, curso_anual.fecha_curso_anual,
        curso_anual.id_especialidad, curso_anual.id_profesor, curso_anual.letra_curso,
        curso_anual.estado, especialidad.id_especialidad, especialidad.nombre_especialidad,
        (select count(alumno_curso.id_alumno_curso) 
        from alumno_curso 
        where alumno_curso.id_curso_anual = curso_anual.id_curso_anual) as alumnos,
        (Select usuario.nombres_usuario from usuario inner join profesor
        on usuario.id_usuario = profesor.id_usuario 
        where profesor.id_profesor = curso_anual.id_profesor) as profesor_nombres,
        (Select usuario.apellido_paterno from usuario inner join profesor 
        on usuario.id_usuario = profesor.id_usuario 
        where profesor.id_profesor = curso_anual.id_profesor) as profesor_apellido
        from curso inner join 
        (curso_anual inner join especialidad 
        on curso_anual.id_especialidad = especialidad.id_especialidad) 
        on curso.id_curso = curso_anual.id_curso
        where fecha_curso_anual = ' . $fecha . ' 
        and curso.vigencia = 1 
        order by curso_anual.nombre_curso_anual')->fetchAll(PDO::FETCH_ASSOC);

        //var_dump($cursos_anuales);
        $response->withJson($cursos_anuales);
        return $response;
    });

$app->get('/get_cursos_anuales_nivel', function (Request $request, Response $response) {
        imLogin();
        global $database;
        $fecha = $_SESSION['year']['year'];

        $cursos_anuales = $database->query('select curso_anual.id_curso_anual,curso_anual.id_curso,curso_anual.nombre_curso_anual,
            (curso.limite_curso - (select count(alumno_curso.id_alumno_curso)
            from alumno_curso where alumno_curso.id_curso_anual = curso_anual.id_curso_anual )) as cupos from curso_anual
            inner join curso on curso_anual.id_curso = curso.id_curso
            where fecha_curso_anual = ' . $fecha . ' and curso.vigencia = 1 order by curso_anual.nombre_curso_anual')->fetchAll(PDO::FETCH_ASSOC);

        //var_dump($cursos_anuales);
        $response->withJson($cursos_anuales);
        return $response;
});

$app->get('/get_asignaturas_profe', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $profe_asignatura = $database->query('SELECT usuario.rut_usuario, profesor.id_profesor, usuario.nombres_usuario, usuario.apellido_paterno, usuario.apellido_materno, asignatura.id_asignatura
        FROM usuario INNER JOIN
        (profesor INNER JOIN
        (profesor_asignaturas INNER JOIN asignatura ON
         profesor_asignaturas.id_asignatura = asignatura.id_asignatura)
        ON profesor.id_profesor = profesor_asignaturas.id_profesor)
        ON usuario.id_usuario = profesor.id_usuario')->fetchAll(PDO::FETCH_ASSOC);

    //Svar_dump($cursos_anuales);
    $response->withJson($profe_asignatura);
    return $response;
});

$app->get('/get_arreglo_cursos', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $fecha = $_SESSION['year']['year'];

    $curso_anual = $database->query('call sp_cursos_letras('.$fecha.')')->fetchAll(PDO::FETCH_ASSOC);

    $response->withJson($curso_anual);
    return $response;
});

$app->get('/get_periodos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $periodo = $database->select('periodo','*', array( 'vigencia' => true ), array("ORDER" => "periodo.fecha_inicio ASC"));

    $response->withJson($periodo);
    return $response;
});

$app->get('/get_bloques', function (Request $request, Response $response) {
    imLogin();
    global $database;

    //$bloque = $database->select('bloque', '*');
    $bloque = $database->query('SELECT id_bloque,hora_inicio,hora_fin,TIME_FORMAT(hora_inicio_mostrar, \'%H:%i %p\') AS hora_inicio_mostrar, TIME_FORMAT(hora_fin_mostrar, \'%H:%i %p\') AS hora_fin_mostrar FROM bloque where vigencia = 1')->fetchAll(PDO::FETCH_ASSOC);

    $response->withJson($bloque);
    return $response;
});

$app->get('/get_cursos', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $cursos = $database->select('curso','*', array( 'vigencia' => true ));

    $response->withJson($cursos);
    return $response;
});

$app->get('/get_info_cursos[/{id_asignatura}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_asignatura = $args['id_asignatura'];

    $cursos = $database->select('curso','*', array( 'vigencia' => true ));
    $detalle_asignatura = $database->select('detalle_asignatura', '*', array( 'id_asignatura' => $id_asignatura ));

    for ($i=0; $i < sizeof($detalle_asignatura); $i++) {
        for ($j=0; $j < sizeof($cursos); $j++) {
            if ($detalle_asignatura[$i]['id_curso'] == $cursos[$j]['id_curso']) {
                $cursos[$j]['estado_curso'] = true;
                $cursos[$j]['horas_asignatura'] = $detalle_asignatura[$i]['horas_asignatura'];
            }
        }
    }

    $response->withJson($cursos);
    return $response;
});

//ELIMINAR UNA ASIGNATURA
$app->get('/eliminar_asignatura[/{id_asignatura}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_asignatura = $args['id_asignatura'];

    $database->update('asignatura', array( 'vigencia' => false ), array( 'id_asignatura' => $id_asignatura));

    $data = array('status' => $database->error());

    $response->withJson($data);
    return $response;
});

//ELIMINAR UN PERIODO
$app->get('/eliminar_periodo[/{id_periodo}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_periodo = $args['id_periodo'];

    $database->update('periodo', array( 'vigencia' => false ), array( 'id_periodo' => $id_periodo));

    $data = array('status' => $database->error());

    $response->withJson($data);
    return $response;
});

//ELIMINAR UN NIVEL
$app->get('/eliminar_curso[/{id_curso}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_curso = $args['id_curso'];

    $database->update('curso', array( 'vigencia' => false ), array( 'id_curso' => $id_curso));

    $data = array('status' => $database->error());

    $response->withJson($data);
    return $response;
});

//ELIMINAR UN BLOQUE
$app->get('/eliminar_bloque[/{id_bloque}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $id_bloque = $args['id_bloque'];

    $database->update('bloque', array( 'vigencia' => false ), array( 'id_bloque' => $id_bloque));

    $data = array('status' => $database->error());

    $response->withJson($data);
    return $response;
});

//SECCION DE POST
$app->post('/subir_curso', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $curso = $params['datos'];
    if($curso['id_curso'] == 0){
        unset($curso['id_curso']);
        $database->insert('curso', $curso);
    }
    else{
        $id_curso = $curso['id_curso'];
        unset($curso['id_curso']);
        $database->update('curso', $curso, array('id_curso' => $id_curso));
    }

    print_r($database->error());
    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->post('/subir_periodo', function (Request $request, Response $response) {
 global $database;
    $params = $request->getParsedBody();
    $periodo = $params['datos'];

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");

    $periodo['fecha_inicio'] = isset($periodo['fecha_inicio']) ? $periodo['fecha_inicio'] : $fecha;
    $periodo['fecha_fin'] = isset($periodo['fecha_fin']) ? $periodo['fecha_fin'] : $fecha;

    if($periodo['id_periodo'] == 0){
         unset($curso['id_periodo']);
        $database->insert('periodo', $periodo);
    }
    else{
        $id_periodo = $periodo['id_periodo'];
        unset($periodo['id_periodo']);
        $database->update('periodo', $periodo, array('id_periodo' => $id_periodo));
    }

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->post('/subir_asignatura', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $asignatura = $params['datos'];
    $niveles = $params['niveles'];
    $detalle_asignatura = [];

    //var_dump($niveles);

    date_default_timezone_set('America/Santiago');
    $fecha = date("Y-m-d H:i:s");
    if(!isset($asignatura['id_asignatura'])){
        /*$asignatura['nivel_asignatura'] = $niveles[$i]['id_curso'];*/
        $id_asignatura = $database->insert('asignatura', $asignatura);
        $detalle_asignatura['id_asignatura'] = $id_asignatura;
        for ($i=0; $i < sizeof($niveles); $i++) {
            if ($niveles[$i]['estado_curso']) {
                $detalle_asignatura['id_curso'] = $niveles[$i]['id_curso'];
                $detalle_asignatura['horas_asignatura'] = $niveles[$i]['horas_asignatura'];
                $database->insert('detalle_asignatura', $detalle_asignatura);
            }
        }
    }
    else{
        $id_asignatura = $asignatura['id_asignatura'];
        unset($asignatura['id_asignatura']);
        $database->update('asignatura', $asignatura, array('id_asignatura' => $id_asignatura));
        $database->delete('detalle_asignatura', array('id_asignatura' => $id_asignatura));
        $detalle_asignatura['id_asignatura'] = $id_asignatura;
        for ($i=0; $i < sizeof($niveles); $i++) {
            if ($niveles[$i]['estado_curso']) {
                $detalle_asignatura['id_curso'] = $niveles[$i]['id_curso'];
                $detalle_asignatura['horas_asignatura'] = $niveles[$i]['horas_asignatura'];
                $database->insert('detalle_asignatura', $detalle_asignatura);
            }
        }
    }

    //print_r($database->error());
    $data = array('status' => $database->error());
    $response->withJson($data);

    return $response;
});

$app->post('/subir_bloque', function (Request $request, Response $response) {
 global $database;
    date_default_timezone_set('America/Santiago');
    $params = $request->getParsedBody();
    $bloque = $params['datos'];

    /*$bloque['fecha_inicio'] = isset($bloque['fecha_inicio']) ? $bloque['fecha_inicio'] : $fecha;
    $bloque['fecha_fin'] = isset($bloque['fecha_fin']) ? $bloque['fecha_fin'] : $fecha;*/

    if(!isset($bloque['id_bloque'])){
        unset($curso['id_bloque']);
        $database->insert('bloque', $bloque);
    }else
    {
        $id_bloque = $bloque['id_bloque'];
        unset($bloque['id_bloque']);
        $database->update('bloque', $bloque, array('id_bloque' => $id_bloque));
    }

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->post('/subir_plan_paso_uno', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $curso = $params['datos'];

    for ($i=0; $i < sizeof($curso) ; $i++) {
      $id_curso = $curso[$i]['id_curso'];
      unset($curso[$i]['id_curso']);
      $database->update('curso', $curso[$i], array('id_curso' => $id_curso));
    }

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->post('/subir_plan_paso_dos', function (Request $request, Response $response) {
    global $database;
    $params = $request->getParsedBody();
    $curso = $params['datos'];
    $fecha = $_SESSION['year']['year'];

    var_dump($curso);

    //$database->delete('curso_anual', array('fecha_curso_anual' => $fecha));

    $database->query('update curso_anual set estado = 0 where fecha_curso_anual =' . $fecha);

    for ($i=0; $i < sizeof($curso) ; $i++) {
        unset($curso[$i]['descripcion_curso']);
        unset($curso[$i]['limite_curso']);
        $id_curso_anual = ($curso[$i]['id_curso_anual']);
        unset($curso[$i]['id_curso_anual']);
        if($id_curso_anual != 0){
            $database->update('curso_anual', $curso[$i], array('id_curso_anual' => $id_curso_anual));
        }else {
            $database->insert('curso_anual', $curso[$i]);
        }
    }

    /*$data = array($database->error());
    $response->withJson($data);*/
    return true;
});

$app->post('/subir_plan_paso_tres', function (Request $request, Response $response) {
    global $database;
    imLogin();
    $params = $request->getParsedBody();
    $curso = $params['datos'];
    $fecha = $_SESSION['year']['year'];

    //var_dump($curso);
    //$database->delete('curso_anual', array('fecha_curso_anual' => $fecha));

    for ($i=0; $i < sizeof($curso) ; $i++) {
        unset($curso[$i]['nombre_asignatura']);
        $id_detalle_curso_anual = ($curso[$i]['id_detalle_curso_anual']);
        unset($curso[$i]['id_detalle_curso_anual']);
        if($curso[$i]['id_profesor'] == 0)
        {
            $curso[$i]['id_profesor'] = null;
        }
        if($id_detalle_curso_anual != 0){
            $database->update('detalle_curso_anual', $curso[$i], array('id_detalle_curso_anual' => $id_detalle_curso_anual));
        }
        else {
            $database->insert('detalle_curso_anual', $curso[$i]);
        }
    }


    $periodo_cursos = $database->query('select  coalesce((Select id_periodo_asignatura_anual 
from periodo_asignatura_anual 
where periodo_asignatura_anual.id_detalle_curso_anual = detalle_curso_anual.id_detalle_curso_anual and
periodo_asignatura_anual.id_periodo = periodo.id_periodo ),0) as id_select, 
        periodo.id_periodo, detalle_curso_anual.id_detalle_curso_anual,
        coalesce((select cantidad_notas from periodo_asignatura_anual
        where periodo_asignatura_anual.id_periodo_asignatura_anual = coalesce((select id_periodo_asignatura_anual from periodo_asignatura_anual
        where periodo_asignatura_anual.id_periodo = periodo.id_periodo and
        periodo_asignatura_anual.id_detalle_curso_anual = detalle_curso_anual.id_detalle_curso_anual),0)),2) as cantidad_notas
        from periodo inner join
        (detalle_curso_anual inner join curso_anual on detalle_curso_anual.id_curso_anual = curso_anual.id_curso_anual)
        where year(fecha_inicio) = '.$fecha.' and fecha_curso_anual = '.$fecha
    )->fetchAll(PDO::FETCH_ASSOC);


    for ($i=0; $i < sizeof($periodo_cursos) ; $i++) {
        $id_detalle = ($periodo_cursos[$i]['id_select']);
        unset($periodo_cursos[$i]['id_select']);
        if($id_detalle == 0){
            $database->insert('periodo_asignatura_anual', $periodo_cursos[$i]);
        } 
        else {
            $database->update('periodo_asignatura_anual', $periodo_cursos[$i], array('id_periodo_asignatura_anual' => $id_detalle));
        }
    }


    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

$app->get('/get_cursos_profe', function (Request $request, Response $response) {
    imLogin();
    global $database;

    $id_usuario = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];
    $id_profe =  $id_alumno = $database->get('profesor','id_profesor', array('id_usuario' => $id_usuario));


    if($id_profe == 0){return false;};

     $cursos = $database->query('SELECT DISTINCT curso_anual.id_curso_anual,
            curso_anual.nombre_curso_anual
            FROM curso_anual INNER JOIN detalle_curso_anual
            on curso_anual.id_curso_anual = detalle_curso_anual.id_curso_anual
            where detalle_curso_anual.id_profesor = ' . $id_profe . ' and
            curso_anual.fecha_curso_anual = '. $fecha . ' and
            curso_anual.estado=1'
        )->fetchAll(PDO::FETCH_ASSOC);


    $response->withJson($cursos);
    return $response;
});

$app->get('/get_profe_asignaturas[/{id_curso_anual}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;

    $id_curso_anual = $args['id_curso_anual'];
    $id_usuario = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];
    $id_profe =  $id_alumno = $database->get('profesor','id_profesor', array('id_usuario' => $id_usuario));

    //Svar_dump($id_curso_anual);
    if($id_profe == 0 ){return false;};

     $asignaturas= $database->query('SELECT detalle_curso_anual.id_detalle_curso_anual, asignatura.nombre_asignatura
                FROM detalle_curso_anual INNER JOIN asignatura
                ON detalle_curso_anual.id_asignatura = asignatura.id_asignatura
                WHERE detalle_curso_anual.id_curso_anual = '. $id_curso_anual . ' and
                detalle_curso_anual.id_profesor = ' . $id_profe . '  and
                asignatura.vigencia = 1'
        )->fetchAll(PDO::FETCH_ASSOC);


    $response->withJson($asignaturas);
    return $response;
});

$app->get('/get_curso_asignaturas[/{id_curso_anual}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;

    $id_curso_anual = $args['id_curso_anual'];
    //$id_usuario = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];
    //$id_profe =  $id_alumno = $database->get('profesor','id_profesor', array('id_usuario' => $id_usuario));

    //Svar_dump($id_curso_anual);
    //if($id_profe == 0 ){return false;};

     $asignaturas= $database->query('SELECT detalle_curso_anual.id_detalle_curso_anual, asignatura.nombre_asignatura
                FROM detalle_curso_anual INNER JOIN asignatura
                ON detalle_curso_anual.id_asignatura = asignatura.id_asignatura
                WHERE detalle_curso_anual.id_curso_anual = '. $id_curso_anual . ' and 
                asignatura.vigencia = 1'
        )->fetchAll(PDO::FETCH_ASSOC);


    $response->withJson($asignaturas);
    return $response;
});

$app->get('/get_profe_periodos[/{id_detalle}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;

    $id_detalle = $args['id_detalle'];
    //$id_profe = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];

    //Svar_dump($id_curso_anual);


     $periodos= $database->query('SELECT periodo_asignatura_anual.id_periodo_asignatura_anual, periodo.nombre_periodo,
         periodo_asignatura_anual.cantidad_notas, periodo.fecha_inicio, periodo.fecha_fin
        FROM periodo_asignatura_anual inner join periodo on periodo_asignatura_anual.id_periodo = periodo.id_periodo
        where periodo_asignatura_anual.id_detalle_curso_anual = ' . $id_detalle . ' and periodo.vigencia = 1'
        )->fetchAll(PDO::FETCH_ASSOC);


    $response->withJson($periodos);
    return $response;
});

$app->get('/get_profe_periodo_actual[/{id_detalle}]', function (Request $request, Response $response, $args) {
    //imLogin();
    global $database;

    $id_detalle = $args['id_detalle'];
        $year = date('Y');
        $day = date('d');
        $month = date('m');

         $nuevaFecha = mktime(0,0,0,$month,$day,$year); 
        $diaDeLaSemana = date("Y-m-d",$nuevaFecha);

        $sql ='SELECT periodo_asignatura_anual.id_periodo_asignatura_anual, periodo.nombre_periodo,
        periodo_asignatura_anual.cantidad_notas, periodo.fecha_inicio, periodo.fecha_fin
        FROM periodo_asignatura_anual inner join periodo on periodo_asignatura_anual.id_periodo = periodo.id_periodo
        where periodo_asignatura_anual.id_detalle_curso_anual = '. $id_detalle .' and periodo.vigencia = 1 and fecha_fin >= \'' . $diaDeLaSemana . '\'';
        //var_dump($sql);

     $periodos= $database->query($sql)->fetchAll(PDO::FETCH_ASSOC);

     //var_dump($periodos);

    $data = array('status' => $database->error());
    $response->withJson($periodos);
    return $response;
});

$app->get('/get_alumnos[/{id_nivel}]', function(Request $request, Response $response, $args){
    imLogin();
    global $database;
    $id_curso = $args['id_nivel'];
    $id_fecha = $_SESSION['year']['id_year'];

    $alumnos = $database->select('alumno',
    array('[>]usuario' => array('alumno.id_usuario' => 'id_usuario'),
          '[>]matricula' => array('alumno.id_alumno' => 'id_alumno')),
    array('alumno.id_alumno', 'usuario.id_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.rut_usuario'),
    array('AND' => array('alumno.vigencia' => true, 'matricula.id_year' => $id_fecha, 'alumno.asignado' => false, 'alumno.nivel_alumno' => $id_curso, 'matricula.vigencia' => true)));

    $response->withJson($alumnos);
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
    array('AND' => array('detalle_curso_anual.id_curso_anual' => $id_curso_anual, 'asignatura.vigencia' => true, 'detalle_asignatura.id_curso' => $id_curso)));

    //var_dump($database->e;rror())

    $response->withJson($alumnos);
    return $response;
});

$app->get('/get_alumnos_asignados[/{id_curso}]', function(Request $request, Response $response, $args){
    imLogin();
    global $database;
    $id_curso = $args['id_curso'];

    $alumnos = $database->select('alumno_curso',
    array('[>]alumno' => array('alumno_curso.id_alumno' => 'id_alumno'),
          '[>]usuario' => array('alumno.id_usuario' => 'id_usuario')),
    array('alumno_curso.id_alumno_curso','alumno_curso.id_curso_anual','alumno.id_alumno', 'usuario.id_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'usuario.rut_usuario','alumno.vigencia'),
    array('AND' => array('alumno_curso.id_curso_anual' => $id_curso)));

    //var_dump($database->error());

    $response->withJson($alumnos);
    return $response;
});

$app->post('/agregar_alumnos_curso', function(Request $request, Response $response){
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $alumnos = $params['datos'];
    $id_curso_anual = $params['id_curso'];

    //var_dump($alumnos);

    for ($i=0; $i < sizeof($alumnos); $i++) { 
        if(isset($alumnos[$i]['check'])){
            if($alumnos[$i]['check']){

                 $id_alumno = $alumnos[$i]['id_alumno'];

                $id_alum_curso = $database->get('alumno_curso','id_alumno_curso',array('AND' => array('alumno_curso.id_alumno' => $id_alumno, 'id_curso_anual' => null)));

                if($id_alum_curso > 0){
                    $database->update('alumno_curso', array( 'id_curso_anual' => $id_curso_anual ), array( 'id_alumno_curso' => $id_alum_curso));
                    $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));

                } else {
                    $database->insert('alumno_curso',array( 'id_alumno' => $id_alumno, 'id_curso_anual' => $id_curso_anual));
                    $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));
                }

            }
        }
    }

    $response->withJson($alumnos);
    return $response;
});

$app->post('/remover_alumnos_curso', function(Request $request, Response $response){
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $alumnos = $params['datos'];

    //var_dump($alumnos);

    for ($i=0; $i < sizeof($alumnos); $i++) { 
        if(isset($alumnos[$i]['check'])){
            if($alumnos[$i]['check']){



                $id_alumno = $alumnos[$i]['id_alumno'];
                $id_alumno_curso = $alumnos[$i]['id_alumno_curso'];

                $database->update('alumno_curso', array( 'id_curso_anual' => null ), array( 'id_alumno_curso' => $id_alumno_curso));

                 $database->update('alumno', array( 'asignado' => 0 ), array( 'id_alumno' => $id_alumno));


            }
        }
    }

    $response->withJson($alumnos);
    return $response;
});

$app->post('/random_alumnos_curso', function(Request $request, Response $response){
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $alumnos = $params['datos'];
    $id_curso_anual = $params['id_curso'];
    $cantidad = $params['cantidad'];

    //var_dump($cantidad);
    $max=sizeof($alumnos)  ; 
    $aleatorio=mt_rand(1,$max); 
    $usados[]=$aleatorio; 
         
         //var_dump($max. ' ' . $aleatorio . ' ' . $cantidad);
         if($max > $cantidad){

            for ($i=0; $i<$cantidad; $i++) 
            { 
            $aleatorio=mt_rand(1,$max);
            echo $usados[$i]; 
                 
                $contador=0; 
                for ($n=$contador; $n<count($usados); $n++) 
                {     
                 var_dump($usados);
                    while ($aleatorio==$usados[$n])  
                    {     
                        $aleatorio=mt_rand(1,$max); 
                        $contador=0; 
                    } 
                     
                }     

            $usados[]=$aleatorio; 
            $id_alumno = $alumnos[$aleatorio - 1]['id_alumno'];

            $id_alum_curso = $database->get('alumno_curso','id_alumno_curso',array('AND' => array('alumno_curso.id_alumno' => $id_alumno, 'id_curso_anual' => null)));

             if($id_alum_curso > 0){
              $database->update('alumno_curso', array( 'id_curso_anual' => $id_curso_anual ), array( 'id_alumno_curso' => $id_alum_curso));
              $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));

             } else {
             $database->insert('alumno_curso',array( 'id_alumno' => $id_alumno, 'id_curso_anual' => $id_curso_anual));
              $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));
                }
             }  
        }else {

            var_dump('si' . ' ' . sizeof($alumnos));

                for ($i=0; $i < sizeof($alumnos); $i++) { 

                             $id_alumno = $alumnos[$i]['id_alumno'];

                            $id_alum_curso = $database->get('alumno_curso','id_alumno_curso',array('AND' => array('alumno_curso.id_alumno' => $id_alumno, 'id_curso_anual' => null)));

                            if($id_alum_curso > 0){
                                $database->update('alumno_curso', array( 'id_curso_anual' => $id_curso_anual ), array( 'id_alumno_curso' => $id_alum_curso));
                                $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));

                            } else {
                                $database->insert('alumno_curso',array( 'id_alumno' => $id_alumno, 'id_curso_anual' => $id_curso_anual));
                                $database->update('alumno', array( 'asignado' => 1 ), array( 'id_alumno' => $id_alumno));
                            }

                        }
            }

         
     

    $response->withJson(true);
    return $response;
});

$app->post('/cambiar_cantidad_notas', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $cantidad_notas = $params['cantidad_notas'];
    $id_periodo = $params['id_periodo'];

    $database->update('periodo_asignatura_anual', array( 'cantidad_notas' => $cantidad_notas ), array( 'id_periodo_asignatura_anual' => $id_periodo));

    //delete from nota where id_detalle_periodo = 1 and posicion_nota > 2 

    $database->delete('nota',array('AND' => array('id_detalle_periodo' => $id_periodo, 'posicion_nota[>]' => $cantidad_notas )));

    $data = array('status' => $database->error());

     $response->withJson($data);
     return $response;
});

$app->post('/get_notas', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $id_curso = $params['id_curso_anual'];
    $id_asignatura = $params['id_asignatura'];
    $id_periodo = $params['id_periodo'];
    $c_notas = $params['cantidad_notas'];

    $id_profe = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];

         $notas = $database->query('select alumno.id_alumno,usuario.rut_usuario,usuario.id_usuario ,concat(usuario.nombres_usuario, \' \' , usuario.apellido_paterno) as nombre,
             alumno_curso.id_alumno_curso, curso_anual.id_curso_anual, alumno.vigencia
            from periodo_asignatura_anual inner join 
            (detalle_curso_anual inner join
            (curso_anual inner join
            (alumno_curso inner join 
            (alumno inner join usuario on
            alumno.id_usuario = usuario.id_usuario) on
            alumno_curso.id_alumno = alumno.id_alumno) on
            curso_anual.id_curso_anual = alumno_curso.id_curso_anual) on
            detalle_curso_anual.id_curso_anual = curso_anual.id_curso_anual) on
            periodo_asignatura_anual.id_detalle_curso_anual = detalle_curso_anual.id_detalle_curso_anual
            where alumno_curso.id_curso_anual = ' . $id_curso . ' 
            and detalle_curso_anual.id_detalle_curso_anual = ' . $id_asignatura . '
            and periodo_asignatura_anual.id_periodo_asignatura_anual = ' . $id_periodo
         )->fetchAll(PDO::FETCH_ASSOC);


        for ($a=0; $a < sizeof($notas) ; $a++) { 
             for ($i=0; $i < $c_notas ; $i++) {
                $p = ($i + 1);

                $nota = $database->query('select * from nota where posicion_nota = ' . $p . ' and id_alumno_curso = ' . $notas[$a]['id_alumno_curso'] . ' and id_detalle_periodo = ' . $id_periodo)->fetchAll(PDO::FETCH_ASSOC);

                //var_dump($nota);


                if(sizeof($nota) >0){
                    $notas[$a]['id_n' . ($i + 1)] = $nota[0]['id_nota'];
                    $notas[$a]['n' . ($i + 1)] = $nota[0]['nota'];
                } else {
                    $notas[$a]['id_n' . ($i + 1)] = 0;
                    $notas[$a]['n' . ($i + 1)] = 0;
                }
            }

            $notas[$a]['prom'] = 70;
        }
     
     //var_dump($notas);

     $response->withJson($notas);
     return $response;
});

$app->post('/guardar_notas', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $notas = $params['notas'];
    $id_periodo = $params['id_periodo'];
    $c_notas = $params['cantidad_notas'];
    $nombre_asignatura = $params['nombre_asignatura'];

    for ($i=0; $i < sizeof($notas); $i++) { 
        $id_alumno_curso = $notas[$i]['id_alumno_curso'];
        for ($a=0; $a < $c_notas ; $a++) { 
            $p = ($a + 1);
            if($notas[$i]['id_n' . $p] == 0){
                 $database->insert('nota',array( 'id_alumno_curso' => $id_alumno_curso, 'id_detalle_periodo' => $id_periodo, 'posicion_nota' => $p, 'nota' => $notas[$i]['n' . $p]));
            }else {
                $id_nota = $notas[$i]['id_n' . $p];
                $database->update('nota', array( 'nota' => $notas[$i]['n' . $p]), array( 'id_nota' => $id_nota));
            }
        }
            var_dump($notas[$i]['rut_usuario']);
            sendGCM2($nombre_asignatura,$notas[$i]['rut_usuario']);
    }

    //$response->withJson($retornar);
    return true;
});

$app->get('/get_dias', function (Request $request, Response $response) {

    $year = date('Y');
    $day = date('d');
    $month = date('m');

    $nuevaFecha = mktime(0,0,0,$month,$day,$year); 
    $diaDeLaSemana = date("w", $nuevaFecha);

    $nuevaFecha = $nuevaFecha - ($diaDeLaSemana*24*3600); 
    //$fecha1=date ("Y-m-d",$nuevaFecha);
    $fecha2=date ("d-m-y",($nuevaFecha+1*24*3600));
    $fecha3=date ("d-m-y",($nuevaFecha+2*24*3600));
    $fecha4=date ("d-m-y",($nuevaFecha+3*24*3600));
    $fecha5=date ("d-m-y",($nuevaFecha+4*24*3600));
    $fecha6=date ("d-m-y",($nuevaFecha+5*24*3600));
    //$fecha7=date ("Y-m-d",($nuevaFecha+6*24*3600));


    $fecha = date('Y-m-j');
    $nuevaf = $fecha; //strtotime ( '+2 day' , strtotime ( $fecha ) ) ;
    $nuevaf =  date ( 'w' , strtotime ($nuevaf) );

    $dias=[];
    $dias[0]['lunes'] = $fecha2;
    if($nuevaf == 1){$dias[0]['lu'] = false;}else{$dias[0]['lu'] = true;}
    $dias[0]['martes'] = $fecha3;
    if($nuevaf == 2){$dias[0]['ma'] = false;}else{$dias[0]['ma'] = true;}
    $dias[0]['miercoles'] = $fecha4;
    if($nuevaf == 3){$dias[0]['mi'] = false;}else{$dias[0]['mi'] = true;}
    $dias[0]['jueves'] = $fecha5;
    if($nuevaf == 4){$dias[0]['ju'] = false;}else{$dias[0]['ju'] = true;}
    $dias[0]['viernes'] = $fecha6;
    if($nuevaf == 5){$dias[0]['vi'] = false;}else{$dias[0]['vi'] = true;} 

     $response->withJson($dias);
     return $response;
});

$app->post('/get_dias_admin', function (Request $request, Response $response) {
    $params = $request->getParsedBody();
    $dia = $params['fecha'];

    $year = date('Y');
    $day = date('d');
    $month = date('m');

    $nuevaFecha = strtotime ($dia);
    $diaDeLaSemana = date("w", $nuevaFecha);

    //var_dump($nuevaFecha . ' ' . strtotime ($dia));

    $nuevaFecha = $nuevaFecha - ($diaDeLaSemana*24*3600); 
    //$fecha1=date ("Y-m-d",$nuevaFecha);
    $fecha2=date ("d-m-y",($nuevaFecha+1*24*3600));
    $fecha3=date ("d-m-y",($nuevaFecha+2*24*3600));
    $fecha4=date ("d-m-y",($nuevaFecha+3*24*3600));
    $fecha5=date ("d-m-y",($nuevaFecha+4*24*3600));
    $fecha6=date ("d-m-y",($nuevaFecha+5*24*3600));
    //$fecha7=date ("Y-m-d",($nuevaFecha+6*24*3600));


    $fecha = date('Y-m-j');
    $nuevaf = $fecha; //strtotime ( '+2 day' , strtotime ( $fecha ) ) ;
    $nuevaf =  date ( 'w' , strtotime ($nuevaf) );

    $dias=[];
    $dias[0]['lunes'] = $fecha2;
    $dias[0]['lu'] = false;
    $dias[0]['martes'] = $fecha3;
    $dias[0]['ma'] = false;
    $dias[0]['miercoles'] = $fecha4;
    $dias[0]['mi'] = false;
    $dias[0]['jueves'] = $fecha5;
    $dias[0]['ju'] = false;
    $dias[0]['viernes'] = $fecha6;
    $dias[0]['vi'] = false; 

     $response->withJson($dias);
     return $response;
});

$app->post('/get_asistencia', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $id_curso = $params['id_curso_anual'];
    $id_asignatura = $params['id_asignatura'];
    $id_periodo = $params['id_periodo'];
    $fecha_selec = $params['fecha'];

    //$id_profe = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];

    //var_dump($id_curso . ' ' .  $id_asignatura . ' ' . $id_periodo);

         $asistencia = $database->query('select alumno.id_alumno,usuario.rut_usuario ,concat(usuario.nombres_usuario, \' \' , usuario.apellido_paterno) as nombre,
             alumno_curso.id_alumno_curso, curso_anual.id_curso_anual, alumno.vigencia
            from periodo_asignatura_anual inner join 
            (detalle_curso_anual inner join
            (curso_anual inner join
            (alumno_curso inner join 
            (alumno inner join usuario on
            alumno.id_usuario = usuario.id_usuario) on
            alumno_curso.id_alumno = alumno.id_alumno) on
            curso_anual.id_curso_anual = alumno_curso.id_curso_anual) on
            detalle_curso_anual.id_curso_anual = curso_anual.id_curso_anual) on
            periodo_asignatura_anual.id_detalle_curso_anual = detalle_curso_anual.id_detalle_curso_anual
            where alumno_curso.id_curso_anual = ' . $id_curso . ' 
            and detalle_curso_anual.id_detalle_curso_anual = ' . $id_asignatura . '
            and periodo_asignatura_anual.id_periodo_asignatura_anual = ' . $id_periodo
         )->fetchAll(PDO::FETCH_ASSOC);

    $data = array('status' => $database->error());

    //var_dump($fecha_selec);

    $fecha = date($fecha_selec);
    //$nuevafecha = $fecha; //strtotime ( '+2 day' , strtotime ( $fecha ) ) ;
    $nuevafecha =  date ( 'w' ,strtotime($fecha) );

    $diaDeLaSemana = date("Y-d-m");

    //echo $diaDeLaSemana;

    $dia = $nuevafecha;
    //var_dump($dia);

 for ($a=0; $a < sizeof($asistencia) ; $a++) { 
    for ($i=$dia-1; $i >= 0 ; $i--) { 
        $nuevodia = strtotime ( '-'. $i .' day' , strtotime ( $fecha ) ) ;

        $nuevodia = date ( 'Y-m-d' , $nuevodia );

        $alumno = $database->query('select * from asistencia where id_detalle_periodo = ' . $id_periodo . ' and 
            id_alumno_curso = ' . $asistencia[$a]['id_alumno_curso'] . ' and fecha_asistencia = \' '. $nuevodia .' \'')->fetchAll(PDO::FETCH_ASSOC);

        if(sizeof($alumno) >0){
                $nuevodia = strtotime ( '-'. $i .' day' , strtotime ( $fecha ) ) ;

                $dia = date('Y-m-d' , $nuevodia);
                $nuevodia =  date ( 'w' , strtotime ($dia) );

                $asistencia[$a]['id' . $nuevodia] = $alumno[0]['id_asistencia'];
                $asistencia[$a]['d' . $nuevodia] = $alumno[0]['estado_asistencia']; // date ( 'w' , strtotime ($nuevodia) );
                $asistencia[$a]['dia' . $nuevodia] = $dia;
            } else{
                $nuevodia = strtotime ( '-'. $i .' day' , strtotime ( $fecha ) ) ;

                $dia = date('Y-m-d' , $nuevodia);
                $nuevodia =  date ( 'w' , strtotime ($dia) );

                $asistencia[$a]['id' . $nuevodia] = 0;
                $asistencia[$a]['d' . $nuevodia] = false;
                $asistencia[$a]['dia' . $nuevodia] = $dia;
                $asistencia[$a]['p'] =  $id_periodo;
            }
        //else si no esta
        }
    $asistencia[$a]['fecha_hoy'] = $fecha;
    $asistencia[$a]['id_detalle_periodo'] = $id_periodo;    
        }

     $response->withJson($asistencia);
     return $response;
});

$app->post('/guardar_asistencia_admin', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $asistencia = $params['asistencia'];


        for ($i=0; $i <sizeof($asistencia) ; $i++) { 
            //var_dump($dia);
            for ($a=1; $a <6 ; $a++) { 
                if($asistencia[$i]['id'.$a] == 0){
                $id_alumno_curso = $asistencia[$i]['id_alumno_curso'];
                $id_periodo = $asistencia[$i]['id_detalle_periodo']; 
                $fecha_asistencia = $asistencia[$i]['dia'. $a]; 

                $estado_asistencia = $asistencia[$i]['d'.$a];

                $database->insert('asistencia',array( 'id_alumno_curso' => $id_alumno_curso, 'id_detalle_periodo' => $id_periodo,'fecha_asistencia' => $fecha_asistencia, 'estado_asistencia' => $estado_asistencia));
           }else {
                $id_alumno_curso = $asistencia[$i]['id_alumno_curso'];
                $id_periodo = $asistencia[$i]['id_detalle_periodo']; 
                $fecha_asistencia = $asistencia[$i]['dia'. $a]; 
                $estado_asistencia = $asistencia[$i]['d'.$a];
                $id_asistencia = $asistencia[$i]['id'.$a];
                //var_dump($estado_asistencia);
                $database->update('asistencia',array( 'id_alumno_curso' => $id_alumno_curso, 'id_detalle_periodo' => $id_periodo,'fecha_asistencia' => $fecha_asistencia, 'estado_asistencia' => $estado_asistencia), array('id_asistencia' => $id_asistencia));
                $data = array('status' => $database->error());
                //var_dump($data);

           }
            }
    }


    $data = array('status' => $database->error());


     $response->withJson($data);
     return $response;
});

$app->post('/guardar_asistencia', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $asistencia = $params['asistencia'];

    $fecha = date('Y-m-d');
    $nuevafecha = $fecha; //strtotime ( '+2 day' , strtotime ( $fecha ) ) ;
    $dia =  date ( 'w' , strtotime ($nuevafecha) );

    if($dia >0 and $dia < 6){

        for ($i=0; $i <sizeof($asistencia) ; $i++) { 
            //var_dump($dia);
           if($asistencia[$i]['id'.$dia] == 0){
                $id_alumno_curso = $asistencia[$i]['id_alumno_curso'];
                $id_periodo = $asistencia[$i]['id_detalle_periodo']; 
                $fecha_asistencia = $asistencia[$i]['fecha_hoy']; 

                $estado_asistencia = $asistencia[$i]['d'.$dia];

                $database->insert('asistencia',array( 'id_alumno_curso' => $id_alumno_curso, 'id_detalle_periodo' => $id_periodo,'fecha_asistencia' => $fecha_asistencia, 'estado_asistencia' => $estado_asistencia));
           }else {
                $id_alumno_curso = $asistencia[$i]['id_alumno_curso'];
                $id_periodo = $asistencia[$i]['id_detalle_periodo']; 
                $fecha_asistencia = $asistencia[$i]['fecha_hoy']; 
                $estado_asistencia = $asistencia[$i]['d'.$dia];
                $id_asistencia = $asistencia[$i]['id'.$dia];
                //var_dump($estado_asistencia);
                $database->update('asistencia',array( 'id_alumno_curso' => $id_alumno_curso, 'id_detalle_periodo' => $id_periodo,'fecha_asistencia' => $fecha_asistencia, 'estado_asistencia' => $estado_asistencia), array('id_asistencia' => $id_asistencia));
                $data = array('status' => $database->error());
                //var_dump($data);

           }
        }
    }


    $data = array('status' => $database->error());


     $response->withJson($data);
     return $response;
});

$app->post('/traer_notas_alumno', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $id_periodo = $params['id_periodo'];
    $id_usuario = $params['id_usuario'];

    $fecha = $_SESSION['year']['year'];


    $id_alumno = $database->get('alumno','id_alumno', array('id_usuario' => $id_usuario));

    if($id_alumno != 0){

        $notas = $database->query('select asignatura.id_asignatura, asignatura.nombre_asignatura,
                alumno_curso.id_alumno_curso, periodo_asignatura_anual.id_periodo_asignatura_anual,
                periodo_asignatura_anual.cantidad_notas
                from alumno inner join 
                (alumno_curso inner join (curso_anual inner join 
                ( asignatura inner join (detalle_curso_anual inner join 
                (periodo_asignatura_anual inner join periodo 
                on periodo_asignatura_anual.id_periodo = periodo.id_periodo)
                on detalle_curso_anual.id_detalle_curso_anual = periodo_asignatura_anual.id_detalle_curso_anual)
                on detalle_curso_anual.id_asignatura = asignatura.id_asignatura)
                on curso_anual.id_curso_anual = detalle_curso_anual.id_curso_anual)
                on alumno_curso.id_curso_anual = curso_anual.id_curso_anual)
                on alumno.id_alumno = alumno_curso.id_alumno
                where alumno.id_alumno = ' . $id_alumno . ' and curso_anual.fecha_curso_anual = ' . $fecha . '
                and periodo.vigencia = 1 and asignatura.vigencia = 1 and periodo.id_periodo = ' . $id_periodo
                )->fetchAll(PDO::FETCH_ASSOC);


        for ($i=0; $i < sizeof($notas) ; $i++) { 
            $cantidad = $notas[$i]['cantidad_notas'];
            $suma = 0;
            $prom = 0;
            for ($a=0; $a < $cantidad; $a++) { 
                $nota = $database->query('select * from nota where posicion_nota = ' . ($a + 1) . ' and id_alumno_curso = ' . $notas[$i]['id_alumno_curso'] . ' and id_detalle_periodo = ' . $notas[$i]['id_periodo_asignatura_anual'])->fetchAll(PDO::FETCH_ASSOC);

                if(sizeof($nota) >0){
                        $notas[$i]['n' . ($a + 1)] = $nota[0]['nota'];
                         $suma = $suma + $nota[0]['nota'];
                    } else {
                        $notas[$i]['n' . ($a + 1)] = 0;
                         $suma = $suma + 0;
                    }

            }
            $prom = $suma / $cantidad;

            $notas[$i]['prom'] = number_format($prom,0);
        }

         $response->withJson($notas);
         return $response;
        }

    });

$app->get('/get_periodos_alumno', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $fecha = $_SESSION['year']['year'];

    $periodos = $database->query('select * from periodo where year(fecha_inicio) = ' . $fecha . ' and vigencia = 1')->fetchAll(PDO::FETCH_ASSOC);

     $response->withJson($periodos);
     return $response;
});

$app->get('/traer_alumnos_apoderado', function (Request $request, Response $response) {
    imLogin();
    global $database;
    $id_usuario = $_SESSION['usuario']['id_usuario'];
    $fecha = $_SESSION['year']['year'];

    $alumno = $database->query('select usuario.id_usuario, usuario.rut_usuario, 
                    concat(usuario.nombres_usuario,\' \', usuario.apellido_paterno ) as nombres_usuario, 
                    coalesce((Select alumno_curso.id_curso_anual 
                    from alumno_curso inner join curso_anual 
                    on alumno_curso.id_curso_anual = curso_anual.id_curso_anual
                    where alumno_curso.id_alumno = alumno.id_alumno and curso_anual.fecha_curso_anual = ' . $fecha . '),0) as id_curso
                    from curso_anual inner join
                    (alumno_curso inner join 
                    (usuario inner join
                    (alumno inner join 
                    (apoderado_alumno inner join apoderado 
                    on apoderado_alumno.id_apoderado = apoderado.id_apoderado) 
                    on alumno.id_alumno = apoderado_alumno.id_alumno)
                    on usuario.id_usuario = alumno.id_usuario)
                    on alumno_curso.id_alumno = alumno.id_alumno)
                    on curso_anual.id_curso_anual = alumno_curso.id_curso_anual
                    where apoderado.id_usuario = ' . $id_usuario . ' and alumno.vigencia = 1 and curso_anual.fecha_curso_anual = ' . $fecha)->fetchAll(PDO::FETCH_ASSOC);


     $response->withJson($alumno);
     return $response;
});

$app->post('/get_fecha_adm', function (Request $request, Response $response) {
    $params = $request->getParsedBody();
    $fecha_inicio = $params['fecha_inicio'];
    $fecha_fin = $params['fecha_fin'];

         $dias=array(); //creo un arreglo para devolver los domingos

         $fecha1=date($fecha_inicio);
         //$fecha1 = strtotime ( '-'. 7 .' day' , strtotime ( $fecha1 ) ) ;
         $fecha2=date($fecha_fin);

         $fechaFin=date("Y-m-d",strtotime($fecha2));

         //$fecha2=date('31-12-2016');
         $fecha=date("Y-m-d",strtotime($fecha1)); //paso a date para darle formato
         $fechaTime=strtotime($fecha1); //paso a hora unix fechaInicio
            

           $semana = date('W',$fechaTime);
           // $dias[0]['semana']=$semana;
           // $dias[0]['dia']=$fecha;

            $i=0;
         while($fecha <= $fecha2) //verifico que no me haya pasado de la fecha fin
         {
         
          //Ahora, el Unix timestamp para el primer lunes
          //después de fecha 1:
          $proximo_lunes=strtotime("next Monday",$fechaTime);
          $proximo_domingo=strtotime("next Sunday",$fechaTime);

          $fechaTi=$proximo_lunes;
          $proximo_viernes=strtotime("next Friday",$fechaTi);

          $fechaDomingo=date("Y-m-d",$proximo_domingo);

          $fechaViernes=date("Y-m-d",$proximo_viernes);

          $fechaLunes = date("d-m-Y",$proximo_lunes);
          $semana = date('W',$proximo_lunes);
          //echo $fechaFin;
          if($fechaDomingo <= $fechaFin)
          { 

           $dias[$i]['semana']=$semana;
           $dias[$i]['dia']=$fechaLunes;
           $dias[$i]['viernes'] = $fechaViernes;
          }
          else
          {
           break;
          }
          $fechaTime=$proximo_lunes;
          $fecha=date("Y-m-d",$proximo_lunes);
          $i++;
         }
        // print_r($dias);
        //  return $dias;
     $response->withJson($dias);
     return $response;
});


$app->run();

?>
