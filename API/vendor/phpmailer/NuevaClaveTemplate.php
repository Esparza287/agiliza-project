<?php

function NuevaClaveTemplate($user,$clave){
    
      $HTML = '
  <html>
  <body style="background: #FFFFFF;font-family: Verdana; font-size: 14px;color:#1c1b1b;">
  <div style="">
      <h2>Hola '.$user.'</h2>
      <p style="font-size:17px;">Solicitud de cambio de Contraseña</p>
  	<p>Fecha Solicitud: ' . date('d/m/y', time()) .' <br /> De acuerdo a tu solicitud de recuperacion la contraseña, Se genero una nueva contraseña con la que podras accesar.</p> <br /> </p> Recuerda que la puedes cambiar en cualquier momento.</p>
  	<p style="padding:15px;background-color:#ECF8FF;">
  			Tu nueva contraseña de acceso es: '.$clave.'
  	</p>
      <p style="font-size: 9px;">&copy; '. date('Y',time()) .' agiliza.xyz . Todos los derechos reservados.</p>
  </div>
  </body>
  </html>
  ';

      return $HTML;
    
}

?>