<?php
if(isset($_COOKIE['login'])) {
    session_start();
    $json = $_COOKIE['login'];
    $json = json_decode($json);
    foreach($json as $key => $val) {
        $_SESSION[$key] = $val;
    }
    setcookie('userid', $_SESSION['Uid']);
} else {
    header('Location: ../index.php');
}

$idUser = 2;
$site_title = 'REST-webbtjänst';
$delimiter = ' | ';
?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS style -->
    <link rel="stylesheet" href="../scss/main.css">
    <title><?=$site_title . $delimiter . $page_title?></title>
    <link href="https://fonts.googleapis.com/css?family=Lato|Roboto:300&display=swap" rel="stylesheet">
</head>
<body>
    <header>
    <div class="top-menu">
    <p>Inloggad som: <b><?= $_SESSION['UfirstName'] ?></b></p>
        <a href="delete.php">Logga ut</a>
    </div>
        <h1><?=$site_title?></h1>
    </header>

<main class="wrapper">