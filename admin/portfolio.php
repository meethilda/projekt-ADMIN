<?php
// Page title
$page_title = 'Portfolio page';
include_once 'include/header.php';
?>

<?php include_once 'include/sidebar.php'?>

<form name="portfolio-form" method="post" id="portfolio-form" class="form add-form">
    <p><?php if (isset($msgError)) {
    echo $msgError;
}
?></p>
<h3>Lägg till i portfolion:</h3>
    <input type="text" placeholder="Titel" name="ptitle" id="ptitle"><br/>
    <input type="text" placeholder="URL" name="purl" id="purl"><br/>
    <input type="text" placeholder="Beskrivning" name="pdesc" id="pdesc"><br/>
    Skapad: <input type="date" placeholder="Skapad" name="pcreated" id="pcreated"><br/>
    <input type="button" id="addPost" value="Skicka">
</form>

<div id="portfolio"></div>

<script src="../js/portfolio.js"></script>

<?php include_once 'include/footer.php'?>