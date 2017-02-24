<?php
require "tools/medoo.min.php";
$database = new medoo();

function crearDefaultAñoEmpresa($id_empresa, $id_year_empresa, $lastYear = false, $tasas_impuestos_lista){
	global $database;

	for ($i=1; $i <= 12; $i++) { 
		$database->insert('correlativos_comprobantes_empresa', array(
				'id_empresa' => $id_empresa,
				'id_mes' => $i,
				'id_year_empresa'=> $id_year_empresa
			));
	}

	if($lastYear){

	}
	else{
		$database->insert('correlativos_comprobantes_extra', array(
			'id_empresa' =>  $id_empresa,
			'id_year_empresa'=> $id_year_empresa
			));
		$database->insert('correlativos_empresa', array(
			'id_empresa' =>  $id_empresa,
			'id_year_empresa'=> $id_year_empresa
			));
	}


	if(array_key_exists('IVA',$tasas_impuestos_lista)){
		for ($i=1; $i <=12 ; $i++) {
			unset($tasas_impuestos_lista['id_tasas']);
			unset($tasas_impuestos_lista['fecha_modificacion']);
			unset($tasas_impuestos_lista['id_usuario_mod']);

			$tasas_impuestos_lista['id_mes'] = $i;
			$tasas_impuestos_lista['id_empresa'] = $id_empresa;
			$tasas_impuestos_lista['id_year_empresa'] = $id_year_empresa;

			$database->insert('tasas_impuesto_empresa', array(

				));
		}
	}
	else{
		foreach($tasas_impuestos_lista as $key => $tasa) {
			unset($tasa['id_tasas']);
			unset($tasa['fecha_modificacion']);
			unset($tasa['id_usuario_mod']);

			$tasa['id_empresa'] = $id_empresa;
			$tasa['id_year_empresa'] = $id_year_empresa;
			$database->insert('tasas_impuesto_empresa', $tasa);
		}
	}
}


function actualizarMesAñoEmpresa(){
	global $database;
}

$empresas = $database->select('empresa', '*', array('id_empresa[!]' => 11));

$tasas_global = $database->select('tasas_impuesto_empresa', '*', array('id_empresa' => 11));

foreach ($empresas as $key => $empresa) {

	$id_year_empresa = $database->insert('year_empresa', array('numero_year'=>date("Y"), 'id_empresa' => $empresa['id_empresa']));
	var_dump(array($database->error(), $empresa['id_empresa'], $id_year_empresa));
	$database->update('empresa', array('id_year_empresa_actual' => $id_year_empresa), array('id_empresa' => $empresa['id_empresa']));

	crearDefaultAñoEmpresa($empresa['id_empresa'], $id_year_empresa, false, $tasas_global);
}

/*
$empresa = $database->get('empresa', '*', array('id_empresa' => 11));

$tasas = array(
	'IVA' => '19.00',
	'PPM' => '1.50',
	'retencion_seg_categoria' => '10.00',
	'credito_afijo' => '0.00'
	);

for ($i=1; $i <= 12; $i++) { 
	$tasas['id_empresa'] = $empresa['id_empresa'];
	$tasas['id_year_empresa'] = $empresa['id_year_empresa_actual'];
	$tasas['id_mes'] = $i;
	$database->insert('tasas_impuesto_empresa', $tasas);
}*/





var_dump($database->error());

?>