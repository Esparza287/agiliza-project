<?php

function LostpassTemplate($user,$link){
    
      $HTML = '
  <html>
  <body style="background: #FFFFFF;font-family: Verdana; font-size: 14px;color:#1c1b1b;">
  <div style="">
      <h2>Hola '.$user.'</h2>
      <p style="font-size:17px;">Solicitud de cambio de Contraseña</p>
  	<p>El día ' . date('d/m/y', time()) .' se ha generado una solicitud de recuperación de contraseña. <br /> Si no has solicitado esto, has caso omiso a este mensaje, en cambio si deseas modificar tu contraseña debes hacer click en el lick de abajo</p>
  	<p style="padding:15px;background-color:#ECF8FF;">
  			Para modificar tu contraseña haz <a style="font-weight:bold;color: #2BA6CB;" href="'.$link.'" target="_blank">clic aquí &raquo;</a>
  	</p>
      <p style="font-size: 9px;">&copy; '. date('Y',time()) .' agiliza.xyz . Todos los derechos reservados.</p>
  </div>
  </body>
  </html>
  ';

      return $HTML;
    
}

?>