<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS style -->
    <link rel="stylesheet" href="scss/main.css">
    <title>Index page</title>
</head>
<body>

<div class="wrap">
        <div id="login">
            <h2>Logga in</h2>
        </div>
        <form method="post" name="login-form" class="form">
            <input type="text" placeholder="Användarnamn" name="username" id="username">
            <input type="password" placeholder="Lösenord" name="userpass" id="userpass">
            <input type="button" value="Logga in" id="login-btn">
        </form>
</div>

<?php echo $_SERVER['REQUEST_URI']?>

<script src="js/login.js"></script>

</body>
</html>
