<?php 

function alumno($Nombre,$Asignatura,$token) {
		$msg = array
		(
				"title" => "Liceo Industrial - Nueva Nota",
		     	"body" => $Nombre." - ".$Asignatura,
		      	"icon" => "ic_menu_notas",
		       	"sound" => "TYPE_NOTIFICATION",
		       	'vibrate'	=> 1,
		       	'color' => '#0fa3b6'
		);
		$msg2 = array
		(		"titulo" => "Este es el titular",
		     	"descripcion" => "Aquí estará todo el contenido de la noticia");
		$fields = array
		(
			'to' 	=> $token,
			'notification' => $msg,
			'data'=> $msg2
		);
		 
		$headers = array
		(
			'Authorization: key=AAAAbG11SAc:APA91bF2CUfYWxa8Uo28UVlZyERK_JEH8OnQcEbDwNgZxeXiTOqDo9k5Y4Lr3_2vjlOtoXWL6dHFTd0239mLpSWyoayWWry15_DF2mitAzuNhNsbeiE6jV9oKqj0AL9c8kKMTFYQVkjHeCtpdFEVpPO9M11b0NbKEA',
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
		$result = curl_exec($ch );
		curl_close( $ch );
		echo $result;
}
function apoderado($Nombre,$Asignatura,$token) {


		$msg = array
		(
				"title" => "Liceo Industrial - Nueva Nota",
		     	"body" => $Nombre." - ".$Asignatura,
		      	"icon" => "ic_menu_notas",
		       	"sound" => "TYPE_NOTIFICATION",
		       	'vibrate'	=> 1,
		       	'color' => '#0fa3b6'
		);
		$msg2 = array
		(		"titulo" => "Este es el titular",
		     	"descripcion" => "Aquí estará todo el contenido de la noticia");
		$fields = array
		(
			'to' 	=> $token,
			'notification' => $msg,
			'data'=> $msg2
		);
		 
		$headers = array
		(
			'Authorization: key=AAAAbG11SAc:APA91bF2CUfYWxa8Uo28UVlZyERK_JEH8OnQcEbDwNgZxeXiTOqDo9k5Y4Lr3_2vjlOtoXWL6dHFTd0239mLpSWyoayWWry15_DF2mitAzuNhNsbeiE6jV9oKqj0AL9c8kKMTFYQVkjHeCtpdFEVpPO9M11b0NbKEA',
			'Content-Type: application/json'
		);
		 
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
		$result = curl_exec($ch );
		curl_close( $ch );
		echo $result;
}
function sendGCM2($Asignatura,$rut) {
	global $database ;
	$rutAlumno='\''.$rut.'\'';

	$apoderados = $database->query('SELECT 
    (select usuario1.id_usuario from usuario as usuario1 inner join 
    (apoderado inner join apoderado_alumno on apoderado.id_apoderado =  apoderado_alumno.id_apoderado) 
    on usuario1.id_usuario = apoderado.id_usuario  where apoderado_alumno.id_alumno= alumno.id_alumno)as id_apoderado,
   	usuario.id_usuario, usuario.nombres_usuario
    FROM usuario inner join alumno on usuario.id_usuario = alumno.id_usuario 
    WHERE usuario.rut_usuario = '.$rutAlumno.'')->fetchAll(PDO::FETCH_ASSOC);

    $id_apoderado = $apoderados[0]["id_apoderado"];
    $id_usuario = $apoderados[0]["id_usuario"];
    $nombres_usuario = $apoderados[0]["nombres_usuario"];
	
   	$token_alumno = $database->select('usuario_token', 'token', array('AND' => array('id_usuario' => $id_usuario)));

   	if($token_alumno!=null || $token_alumno!=false){
   		for ($i=0; $i < sizeof($token_alumno) ; $i++) { 
    		alumno($nombres_usuario,$Asignatura,$token_alumno[$i]);	 	  
    	}
		
	}
	if($id_apoderado!=null){
	   	$token_apoderado = $database->select('usuario_token', 'token', array('AND' => array('id_usuario' => $id_apoderado)));
			if($token_apoderado!=null || $token_apoderado!=false){
				for ($i=0; $i < sizeof($token_apoderado) ; $i++) { 
    				apoderado($nombres_usuario,$Asignatura,$token_apoderado[$i]); 	  
    			}
				
			}
	}
	$dato = array("estado" => $id_apoderado,"datos" =>  $id_usuario  , "token_apoderado" =>  $nombres_usuario );
    $datos[] = $dato;
    
  

}
?>
