<?php
// Page title
$page_title = 'Studies page';
include_once 'include/header.php';
?>

<?php include_once 'include/sidebar.php'?>

<form name="studies-form" method="post" id="studies-form" class="form add-form">
    <p><?php if (isset($msgError)) {
    echo $msgError;
}
?></p>
<h3>Lägg till studie:</h3>
    <input type="text" placeholder="Skola/utbildning" name="sname" id="sname"><br/>
    <input type="text" placeholder="Stad" name="scity" id="scity"><br/>
    Startdatum: <input type="date" placeholder="Startdate" name="sstartdate" id="sstartdate"><br/>
    Slutdatum: <input type="date" placeholder="Enddate" name="senddate" id="senddate"><br/>
    <input type="button" id="addPost" value="Skicka">
</form>

<div id="studies"></div>

<script src="../js/studies.js"></script>

<?php include_once 'include/footer.php'?>