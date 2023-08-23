<?php

/*
Plugin Name: BridgeGame
Plugin URI: https://github.com/Cat832/HENK
Description: A fun game to introduce bridge
Version: 1.{VersionCounter}
Author: Pepijn van der Valk
Author URI: https://github.com/Cat832
License: GPL2
*/ 

function bridgegame_add() {
    return '
    <canvas class="game hand" width="800" height="500"></canvas>
    <div class="center-children-vert">
        <button onclick="mute()" id="mutebutton">🔇</button>
        <button onclick="reset_game(\'' . plugin_dir_url(__FILE__) . '\')">Start game!</button>    
        <canvas class="hand" width="180" height="80"></canvas>
        <div id="ui-text" class="score-div">
            <h1 id="score">0/13</h1>        
        </div>
    </div>';
}

wp_enqueue_style('bridgegame_style', plugin_dir_url(__FILE__).'bridgegame.css');
wp_enqueue_script('bridgegame_script', plugin_dir_url(__FILE__).'script.js');
wp_enqueue_script('bridgegame_script', plugin_dir_url(__FILE__).'games.js');
wp_enqueue_script('bridgegame_gamecode', plugin_dir_url(__FILE__).'GAMECODE.js');

add_shortcode('bridgegame', 'bridgegame_add'); 

?>
