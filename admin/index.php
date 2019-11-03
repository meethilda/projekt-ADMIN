<?php
// Page title
$page_title = 'Admin page';
include_once 'include/header.php';
?>

<?php include_once 'include/sidebar.php' ?>

<?php 

$output = '<div class="welcome">';
$output .= '<h3>Välkommen</h3>';
$output .= '<p>' . $_SESSION['UfirstName'] . ' ';
$output .= $_SESSION['UlastName'] . '</p>';
$output .= '</div>';
echo $output;

?>

<?php include_once 'include/footer.php'?>