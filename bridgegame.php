<?php

/*
Plugin Name: BridgeGame
Plugin URI: https://example1.com
Description: A fun game to introduce bridge
Version: 1.0
Author: Pepijn van der Valk
Author URI: https://example2.com
License: GPL2
*/ 

function bridgegame_add() {
    return '<button onclick="clickedme()"><img src="' . plugin_dir_url(__FILE__) . '/img/cat.png"/>Click me</button>';
}

wp_enqueue_script('tstjs', plugin_dir_url(__FILE__).'/js/tstjs.js');

add_shortcode('bridgegame', 'bridgegame_add'); 

?>
