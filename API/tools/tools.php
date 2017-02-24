<?php
require_once('../vendor/phpmailer/phpmailer/class.phpmailer.php');
require_once('../vendor/phpmailer/phpmailer/class.smtp.php');
require_once('../vendor/phpmailer/UsuarioTemplate.php');

function imLogin(){
    session_start();
    if(!isset($_SESSION['usuario'])){
        die('No estas logueado');
    }
}

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

if(!function_exists('hash_equals'))
{
    function hash_equals($str1, $str2)
    {
        if(strlen($str1) != strlen($str2))
        {
            return false;
        }
        else
        {
            $res = $str1 ^ $str2;
            $ret = 0;
            for($i = strlen($res) - 1; $i >= 0; $i--)
            {
                $ret |= ord($res[$i]);
            }
            return !$ret;
        }
    }
}

function createHash($username, $password){

	// A higher "cost" is more secure but consumes more processing power
	$cost = 10;

	// Create a random salt
	$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');

	// Prefix information about the hash so PHP knows how to verify it later.
	// "$2a$" Means we're using the Blowfish algorithm. The following two digits are the cost parameter.
	$salt = sprintf("$2a$%02d$", $cost) . $salt;

	// Value:
	// $2a$10$eImiTXuWVxfM37uY4JANjQ==

	// Hash the password with the salt
	return crypt($password, $salt);

}

function removeTime($date){
    return substr($date, 0, strpos($date, "T"));
}

function check($password, $hash){
    // Hashing the password with its hash as the salt returns the same hash
    return hash_equals($hash, crypt($password, $hash));
}

function getNow(){
    date_default_timezone_set('America/Santiago');
    return date("Y-m-d H:i:s");
}

function enviarCorreoNuevo($email, $nombres, $apellido_p, $apellido_m, $pass_temp){

    //var_dump($email, $nombres, $pass_temp);

    $user = $nombres . ' ' . $apellido_p . ' ' . $apellido_m;
    $pass = $pass_temp;
    $receptor = $email;


    $mail = new PHPMailer;
    $mail->SMTPDebug  = 2;  //con esta funcion podemos ver cual es el estado del envio del mensaje 
    $mail->CharSet = "UTF-8";
    $mail->Encoding = "quoted-printable";
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'noresponder@agiliza.xyz';                     // SMTP username
    $mail->Password = 'asdascion';                     // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                         // TCP Puerto con el cual se conecta a
    $mail->Timeout=30;

    $mail->setFrom('noresponder@agiliza.xyz', 'ACM'); //Quien manda el correo?

    $mail->addAddress($receptor, $user);     // A quien le llega

    $mail->isHTML(true);    // Set email format to HTML

    $mail->Subject = 'Bienvenido a Agiliza';
    $mail->Body    = UsuarioTemplate($user,$pass,$receptor);
    $mail->AltBody = 'Hola ' . $user . ' su contraseña temporal es : ' . $pass . ' para cualquier consulta comunicarce con agiliza.xyz';

    if(!$mail->send()) {
        //return false;
    }
}

?>