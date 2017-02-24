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

//MODIFICA los usuarios y crea la matrícula
$app->post('/subir_matricula', function (Request $request, Response $response) {
    global $database;
    imLogin();
    $params = $request->getParsedBody();
    $alumno = $params['alumno'];
    $apoderado = $params['apoderado'];
    $matricula = [];

    date_default_timezone_set('America/Santiago');
    $matricula['fecha_matricula'] = date("Y-m-d H:i:s");
    $matricula['id_alumno'] = $alumno['id_alumno'];
    $matricula['id_apoderado'] = $apoderado['id_apoderado'];
    $matricula['id_year'] = $_SESSION['year']['id_year'];

    $data = $database->insert('matricula', $matricula);
    
    //Enlazar el Apoderado con el Alumno
    $apoderado_alumno['id_alumno'] = $matricula['id_alumno'];
    $apoderado_alumno['id_apoderado'] = $matricula['id_apoderado'];
    $apoderado_alumno['id_year'] = $_SESSION['year']['id_year'];
    $database->insert('apoderado_alumno', $apoderado_alumno);

    $database->update('usuario', array( 'email_usuario' => $alumno['email_usuario'], 'direccion_usuario' => $alumno['direccion_usuario'], 'telefono_usuario' => $alumno['telefono_usuario'] ), array('id_usuario' => $alumno['id_usuario']));
    $database->update('usuario', array( 'email_usuario' => $apoderado['email_usuario'], 'direccion_usuario' => $apoderado['direccion_usuario'], 'telefono_usuario' => $apoderado['telefono_usuario'] ), array('id_usuario' => $apoderado['id_usuario']));

    $nivel = $alumno['nivel_alumno'];
    $database->update('alumno', array( 'nivel_alumno' => $nivel, 'asignado' => false ), array('id_alumno' => $alumno['id_alumno']));

    $data = array('status' => $database->error());
    $response->withJson($data);
    return $response;
});

//ENTREGA TODAS LAS MATRÍCULAS
$app->get('/get_matriculas', function (Request $request, Response $response) {
    global $database;
    imLogin();
    $data = $database->select('matricula',
        array(
            '[>]alumno' => array('matricula.id_alumno' => 'id_alumno'),
            '[>]apoderado' => array('matricula.id_apoderado' => 'id_apoderado'),
            '[>]usuario' => array('alumno.id_usuario' => 'id_usuario'),
            '[>]usuario(apd)' => array('apoderado.id_usuario' => 'id_usuario'),
            '[>]curso' => array('alumno.nivel_alumno' => 'id_curso')
             ),
        array('usuario.id_usuario', 'usuario.rut_usuario', 'usuario.nombres_usuario', 'usuario.apellido_paterno', 'usuario.apellido_materno', 'apd.id_usuario(id_apoderado)', 'apd.rut_usuario(rut_apoderado)', 'apd.nombres_usuario(nombres_apoderado)', 'apd.apellido_paterno(apellido_paterno_apd)', 'apd.apellido_materno(apellido_materno_apd)', 'matricula.id_matricula', 'matricula.fecha_matricula', 'matricula.id_year', 'curso.descripcion_curso'),
        array('AND' => array('matricula.vigencia' => true, 'matricula.id_year' => $_SESSION['year']['id_year'])));
        /*$data = $database->select('matricula', '*', array('matricula.vigencia' => true));*/

    $response->withJson($data);

    return $response;
});

//ABULAR MATRÍCULAS
$app->get('/anular_matricula[/{id_matricula}]', function (Request $request, Response $response, $args) {
    global $database;
    imLogin();
    $id_matricula = $args['id_matricula'];

    $data = $database->update('matricula', array( 'vigencia' => false ), array( 'id_matricula' => $id_matricula ));

    $response->withJson($data);
    return $response;
});



$app->get('/traer_promedios_finales_alumno[/{id_usuario}]', function (Request $request, Response $response, $args) {
    imLogin();
    global $database;
    $params = $request->getParsedBody();
    $id_usuario = $args['id_usuario'];
    $fecha = $_SESSION['year']['year'];
    $fecha--;
    $promedios = [];
    $num =0;

    $id_alumno = $database->get('alumno','id_alumno', array('id_usuario' => $id_usuario));
    $periodos = $database->query('select * from periodo where year(fecha_inicio) = ' . $fecha . ' and vigencia = true')->fetchAll(PDO::FETCH_ASSOC);
    if($id_alumno == 0){return false;}
    for ($c=0; $c <sizeof($periodos) ; $c++) { 
            $id_periodo = $periodos[$c]['id_periodo'];
        
            $num++;
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
        for ($b=0; $b <sizeof($notas) ; $b++) { 
            $promedios[$b]['id_asignatura'] = $notas[$b]['id_asignatura'];
            $promedios[$b]['prom'.$num]= $notas[$b]['prom'];
            }
        


        }

        $finales=[];
        for ($i=0; $i <sizeof($promedios) ; $i++) { 
                $finales[$i]['id_asignatura']= $promedios[$i]['id_asignatura'];
                $suma = 0;
            for ($a=0; $a < $num ; $a++) { 
                $suma = $suma +  number_format($promedios[$i]['prom'.($a+1)],0);
                               
            }
            $finales[$i]['suma'] = $suma;
            $finales[$i]['prom'] = ($suma / $num);
        }
         $response->withJson($finales);
         return $response;

    });


$app->run();
?>
