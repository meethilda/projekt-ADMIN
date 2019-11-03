<?php
$pagelist = glob('../admin/*.php');
$URIname = basename($_SERVER['PHP_SELF']);
?>
<div class="sidebar">
    <nav>
        <ul>
<?php

foreach ($pagelist as $page) {
    if (is_file($page)) {
        $pageCheck = basename($page);
        $pageName = basename($page, '.php');
        $pageName = ucfirst($pageName);
        if ($pageName == 'Index') {
            $pageName = 'Startsida';
        }
        if ($pageName == 'Delete') {
            echo '';
        } else {
            ?>
            <li><a href=<?=$page?> class="<?php if ($URIname == $pageCheck) {
                echo 'active';
            }
            ?>"><?=$pageName?></a></li>
        <?php
}
    }
}
?>
        </ul>
    </nav>
</div>

<!-- Start content section -->
<div class="content">
    <h2><?=$page_title?></h2>