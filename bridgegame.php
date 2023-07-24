<?php

/*
Plugin Name: BridgeGame
Plugin URI: https://example1.com
Description: A fun game to introduce bridge
Version: 1.{VersionCounter}
Author: Pepijn van der Valk
Author URI: https://example2.com
License: GPL2
*/ 

function bridgegame_add() {
    return '<button onclick="reset_game()"><img src="' . plugin_dir_url(__FILE__) . '/images/Hart.png"/>Click me to start game</button>';
}

wp_enqueue_style('bridgegame_style', plugin_dir_url(__FILE__).'/bridgegame.css');
wp_enqueue_script('bridgegame_script', plugin_dir_url(__FILE__).'/script.js');
wp_enqueue_script('bridgegame_gamecode', plugin_dir_url(__FILE__).'/GAMECODE.js');

add_shortcode('bridgegame', 'bridgegame_add'); 

?>