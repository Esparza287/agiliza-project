<?php

function PagoTemplate($productos){
    $n_guia = $productos[0]["id_carro"];
    $nombre_contacto = 'Personal Agiliza';
    $telefono = 028687513;
    $contacto = "Alvaro Cabrera";
    $Total=0;

      $HTML = '
  <html>
  <body align="center">
  <div style="background: #:#ECF8FF; font-color: black;">
      <h2>Hola '.$contacto.'</h2>


    <p style="line-height: 1.4;"></p>
    <table class="table table-bordered" style="text-align: center;">
        <tbody style="background:#ECF8FF;">
            <tr>
                <td align="center">
                    <h1 style="font-weight: bold; text-align: left;">&nbsp;L. Industrial &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="line-height: 1.1;">Comp. de Compra</span></h1><div style="font-weight: bold;"><span style="line-height: 1.1;"><br></span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 1.1;">&nbsp; </span><span style="line-height: 1.1; font-weight: bold;">Liceo industrial San Fernando. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Fecha:' . date('d/m/y', time()) .'</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; Dirección</span><span style="font-weight: bold; line-height: 1.1;">: </span><span style="line-height: 1.1;">Manso de Velasco &nbsp;#</span></div><div style="text-align: left;"><span style="line-height: 14.3px;"><span style="font-weight: bold;">&nbsp; Ciudad:</span> San Fernando</span></div><div style="font-weight: bold; text-align: left;"><span style="line-height: 14.3px;"><br></span></div><div style="font-weight: bold; text-align: left;"><span style="line-height: 14.3px;"><br></span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; &nbsp;Compra N°:'.$n_guia.'&nbsp;</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;">&nbsp; &nbsp;</span></div><div style="text-align: left;"><span style="font-weight: bold; line-height: 14.3px;"><br></span></div><span style="font-weight: bold;">



      <table style="border: black 1px solid;text-align: center; width: 96%; height: 80px;">
            <tbody>
                <tr style="background:#FFEFC6;">
                    <td><span style="font-weight: bold;font-size: 16px;">Codigo</span></td>
                    <td><span style="font-weight: bold;font-size: 16px;">Producto</span></td>
                    <td><span style="font-weight: bold;font-size: 16px;">Cantidad</span></td>
                     <td><span style="font-weight: bold;font-size: 16px;">Precio</span></td>
                </tr>';

   for ($i=0; $i < sizeof($productos); $i++) { 
                
        $precio = intval($productos[$i]['cantidad']) * intval($productos[$i]['precio_implemento']);
        $Total = $Total + intval($precio);

  $HTML = $HTML.' <tr style="font-size: 16px; style=" background:#ffffff;="" "="">
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $productos[$i]['id_implemento'] . '</span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">'.$productos[$i]['nombre_implemento'] .'</span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $productos[$i]['cantidad'] . '</span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $precio . '</span></td>
                </tr>';

  }

 $HTML = $HTML.' <tr style="font-size: 16px; style=" background:#ffffff;="" "="">
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;"></span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;"></span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">Total</span></td>
                    <td style="background:#FFFFFF; "><span style="font-weight: normal;">' . $Total . '</span></td>
                </tr>';

 $HTML = $HTML. '</tbody>
      </table>


                    <div style="text-align: center;"><span style="line-height: 1.42857; font-size: 10px;">Con el presente documento&nbsp;</span></div></span></td>
            </tr>
      </tbody>
    </table>
  <div style="text-align: center;"><br></div><p></p>
      <br>
      <p style="font-size: 9px;">© '. date('Y',time()) .' A . Todos los derechos reservados.</p>
  </div>
  </body>
  </html>


  ';

      return $HTML;
    
}

?>
