<?php

function UsuarioTemplate($user,$pass,$receptor){

	$usuario = $receptor;
	$nombre = $user;
    $contraseña = $pass;
      $HTML ='
			      	<body bgcolor="#E6E6FA">
			<table style="border: 2px solid silver;"><tbody><tr><td><table bgcolor="white" style="border: 2px solid 

			silver;"><tbody><tr><td><span style="font-weight: 

			bold;">Bienvenido a Agiliza - Sistema Liceo Industrial, San Fernando</span><br></td></tr></tbody></table><span 

			style="font-weight: bold;">Sr(a):</span> ' . $nombre . ' <div><br></div><div>Con las 

			siguientes credenciales puedes entrar a <a href="http://agiliza.xyz">Agiliza</a></div><div><span 

			style="font-weight: bold;">Correo: </span>' . $usuario . '</div><div><span style="font-weight: bold;">Contraseña 

			Temporal: </span>' . $contraseña . '</div><div><br></div><div><table><tbody><tr bgcolor="#FEFC7A" style="border: 2px solid 

			silver;"><td style="border: 2px solid silver;"><span style="font-weight: bold;">Sigue los siguientes pasos para cambiar tu 

			contraseña</span></td></tr>
			<tr bgcolor="white"><td style="border: 2px solid silver;">
			<br>
			<span style="font-weight: 

			bold;">Primer paso:</span> Una vez que hayas ingresado a "Agiliza" presione &nbsp;sobre su nombre en el lado superior 

			izquierdo, Luego presione Perfil.<br><br><span style="font-weight: bold;">Segundo paso:&nbsp;</span>Luego dentro diríjase 

			hasta el final de la pagina, Ingrese la nueva contraseña y luego repita la contraseña.<br><br><span style="font-weight: 

			bold;">Tercer paso:</span> Por ultimo presione Guardar Cambios.<br><br>Con estos pasos usted habrá cambiado 

			su Contraseña.&nbsp;<br></td></tr></tbody></table></div></td></tr></tbody></table><br>
			</body>
      '
;

      return $HTML;
    
}

?>