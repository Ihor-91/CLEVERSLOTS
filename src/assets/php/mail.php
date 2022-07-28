<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 * This uses traditional id & password authentication - look at the gmail_xoauth.phps
 * example to see how to use XOAUTH2.
 * The IMAP section shows how to save this message to the 'Sent Mail' folder using IMAP commands.
 */
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
require 'phpmailer.php';
require 'smtp.php';

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
$mail->SMTPDebug = 0;
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;
//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "argeares22@gmail.com";
//Password to use for SMTP authentication
$mail->Password = "cm882fc1";
//Set who the message is to be sent from
$mail->setFrom('argeares22@gmail.com', 'Cleverslots');
//Set who the message is to be sent to
$mail->addAddress('argeares97@gmail.com');
//Set the subject line
$mail->Subject = 'Contact us form "Cleverslots"';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->CharSet = 'UTF-8';
$mail->msgHTML('
  <table cellspacing="0" color: #000;">
    <tr style="border: 1px solid black;">
      <td style="padding: 7px 15px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Name:</td>
      <td style="padding: 7px 15px; font-size: 14px; border: #e9e9e9 1px solid;">'.$name.'</td>
    </tr>
    <tr style="border: 1px solid black;">
      <td style="padding: 7px 15px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Email:</td>
      <td style="padding: 7px 15px; font-size: 14px; border: #e9e9e9 1px solid;">'.$email.'</td>
    </tr>
    <tr style="border: 1px solid black;">
      <td style="padding: 7px 15px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Message:</td>
      <td style="padding: 7px 15px; font-size: 14px; border: #e9e9e9 1px solid;">'.$message.'</td>
    </tr>
  </table>
');

$mail->AltBody = 'Name: '.$name.'Email'.$email.'Message'.$message;

//send the message, check for errors
if (!$mail->send()) {} else {}
