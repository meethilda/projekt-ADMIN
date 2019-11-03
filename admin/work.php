<?php
// Page title
$page_title = 'Work page';
include_once 'include/header.php';
?>

<?php include_once 'include/sidebar.php'?>

<form name="work-form" method="post" id="work-form" class="form add-form">
    <p><?php if (isset($msgError)) {
    echo $msgError;
}
?></p>
<h3>Lägg till arbete:</h3>
    <input type="text" placeholder="Företag" name="wname" id="wname"><br/>
    <input type="text" placeholder="Yrke" name="wtitle" id="wtitle"><br/>
    <input type="text" placeholder="Beskrivning" name="wdesc" id="wdesc"><br/>
    Start: <input type="date" name="wstartdate" id="wstartdate"><br/>
    Slut: <input type="date" name="wenddate" id="wenddate"><br/>
    <input type="button" id="addWork" value="Skicka">
</form>

<div id="work"></div>

<script src="../js/work.js"></script>

<?php include_once 'include/footer.php'?>