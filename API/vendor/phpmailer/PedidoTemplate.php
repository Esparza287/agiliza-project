<?php

function LostpassTemplate($datos,$correo){
    $n_guia = 102495;
    $nombre_contacto = 'Personal Agiliza';
    $telefono = 028687513;

    $proveedor = $correo['razon_social'];
    $codigo = $datos['id_implemento'];
    $nombre_implemento = $datos['nombre_implemento'];
    $cantidad = $datos['cantidad'];
    $contacto=$correo['contacto_proveedor'];
      $HTML = '
  <html>
  <body align="center">
  <div style="background: #:#ECF8FF; font-color: black;" >
      <h2>Hola '.$contacto.'</h2>


    <p style="line-height: 1.4;"></p><table class="table table-bordered" style="text-align: center;"><tbody style="background:#ECF8FF;"><tr><td align="center"><h1 style="font-weight: bold; text-align: left;">&nbsp;L. Industrial &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<span style="line-height: 1.1;">Solicitud de compra</span></h1><div style="font-weight: bold;"><span style="line-height: 1.1;"><br></span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 1.1;">&nbsp; </span><span style="line-height: 1.1; font-weight: bold;">Liceo industrial San Fernando. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Fecha:' . date('d/m/y', time()) .'</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; Dirección</span><span style="font-weight: bold; line-height: 1.1;">: </span><span style="line-height: 1.1;">Manso de Velasco &nbsp;#</span></div><div style="text-align: left;"><span style="line-height: 14.3px;"><span style="font-weight: bold;">&nbsp; Ciudad:</span> San Fernando</span></div><div style="text-align: left;"><span style="line-height: 14.3px;"><span style="font-weight: bold;">&nbsp; Nombre Contacto: </span> ' . $nombre_contacto . '</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp;&nbsp;Teléfono:</span><span style="line-height: 14.3px;"> ' . $telefono . ' </span></div><div style="font-weight: bold; text-align: left;"><span style="line-height: 14.3px;"><br></span></div><div style="font-weight: bold; text-align: left;"><span style="line-height: 14.3px;"><br></span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; &nbsp;Guía&nbsp;N°: ' . $n_guia . '</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; &nbsp;Proveedor: </span><span style="line-height: 14.3px;">' . $proveedor . '</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; &nbsp;</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;"><br></span></div><span style="font-weight: bold;"><table  style="border: black 1px solid;text-align: center; width: 96%; height: 80px;"><tbody><tr style="background:#FFEFC6;"><td><span style="font-weight: bold;font-size: 16px;">Codigo</span></td><td><span style="font-weight: bold;font-size: 16px;">Producto</span></td><td><span style="font-weight: bold;font-size: 16px;">CANTIDAD</span></td></tr><tr style="font-size: 16px; style="background:#FFFFFF; "><td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $codigo . '</span></td><td style="background:#FFFFFF; "><span style="font-weight: normal;">'. $nombre_implemento .'</span></td><td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $cantidad . '</span></td></tr></tbody></table><div style="text-align: center;"><span style="line-height: 1.42857; font-size: 10px;">Con el presente documento</span></div></span></td></tr></tbody></table><div style="text-align: center;"><br></div><p></p>
      <br>
      <p style="font-size: 9px;">&copy; '. date('Y',time()) .' A . Todos los derechos reservados.</p>
  </div>
  </body>
  </html>


  ';

      return $HTML;
    
}

?>
