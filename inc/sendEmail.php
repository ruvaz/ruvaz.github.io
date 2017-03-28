<?php
$correo = "<ruben@miweb.mx>";
//Correo de respuesta
$web = "https://ruvaz.github.io";
//Dominio web
$seccion = "Contacto ";
//seccion de la cual envian el email

@$pfw_ip = $_SERVER['REMOTE_ADDR'];
//Ip cliente:
@$pfw_hr = $_SERVER['REQUEST_TIME'];
//Hora en ke se ejecuto la pagina.

//SI SE HA PULSADO ENVIAR, SE COMPRUEBAN LOS DATOS INSERTADOS Y DESPUES SE ENVIA EL CORREO
$nombre = filter_input(INPUT_POST, "contactName", FILTER_SANITIZE_STRING);
$asunto = filter_input(INPUT_POST, "contactSubject", FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, "contactEmail", FILTER_SANITIZE_STRING);

// $tel = filter_input(INPUT_POST, "tel", FILTER_SANITIZE_STRING);
$captcha = filter_input(INPUT_POST, "captcha", FILTER_SANITIZE_STRING);
$mensaje = filter_input(INPUT_POST, "contactMessage", FILTER_SANITIZE_STRING);

//echo "Muchas gracias ".$nombre.$email.$mensaje;

$to = $correo;
$subject = "Contacto ruvaz.github.io";
$message = "
<b>Se ha recibido un mensaje a través de la página web.</b>
<p>---- Datos del mensaje ----</p>
<p><b>Nombre:</b> $nombre</p>
<p><b>Asunto:</b> $asunto</p>
<p><b>Email:</b> $email</p> 
<p><b>Mensaje:</b> $mensaje </p>
<p><b>IP del visitante:</b> $pfw_ip</p>";

$headers = "From: \"Mi Web.mx\" $correo\n";
$headers .= "Return-path: \"Contacto Web\" $correo\n";
$headers .= "Mime-Version: 1.0\n";
$headers .= "X-Mailer:PHP/" . phpversion() . "\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'Bcc: ruben@miweb.mx' . "\r\n";


$resultado = mail($to, $subject, $message, $headers);  //el mail para empresa
//ejecucion del envio del correo
if($nombre && $email && $mensaje){$resultado=1;}else{$resultado=0;}

//Texto de el exito del envio del email
if ($resultado) {// si se envio correctamente.
	//echo  1;
	echo "OK";
} else

	 echo "<span class='error'>No se ha podido enviar correctamente su información, por favor intente nuevamente.</span>";

//Enviando auto respuesta para Cliente
$pfw_header = "From: \"ruvaz.github.io \" $correo\n";
$pfw_header .= "Return-path: \"ruvaz.github.io\" $correo\n";
$pfw_header .= "Mime-Version: 1.0\n";
$pfw_header .= "X-Mailer:PHP/" . phpversion() . "\n";
$pfw_header .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

$pfw_subject = "Contacto ruvaz.github.io ";
$pfw_email_to = $email;
$pfw_message ="<div style='color:#2d2d2d;'>
<p><b>$nombre</b>,  le agradezco por haber escrito. </p>
<p>Su mensaje ha sido recibido satisfactoriamente.</p>
<p>Estare en contacto con usted lo antes posible.</p>
<p>&nbsp;</p>
<p>-------------------------------------------------------------------</p>
<p>Favor de no responder este E-mail ya que es generado Automaticamente.</p>
<p>$web</p></div>";

@mail($pfw_email_to, $pfw_subject, $pfw_message, $pfw_header);  //email para cliente 
?>
