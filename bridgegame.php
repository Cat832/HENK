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
        <div class="centerer">
        <canvas class="game hand"></canvas>
        <div class="tutorial">
            <h1>Bridgegame!</h1>
            <p>Door pepijn</p>
            <div style="width: 200px; height:20px"></div>
            <h2>Pak kaarten die in je hand passen</h2>
            <h2>De troef zie je op je mandje</h2>
            <h2>Langzame kaarten geven minder score dan de snelle!</h2>
            <h2>Dus pak de snelle kaarten!</h2>
            <h3>Ik hoop dat je veel plezier hebt met het spel, en met bridge</h2>
            <div style="width: 200px; height:40px"></div>
            <h1>Wanneer passen kaarten bij elkaar?</h1>
            <p>Volgens de bridge regels</p>
            <div style="width: 200px; height:20px"></div>
            <h2>Kleuren (♥️ ♠️ ♦️ ♣️) passen bij elkaar</h2>
            <h2>Bijvoorbeeld de ♦️3 en de ♦️10 passen bij elkaar</h2>
            <h2>Maar de ♠️4 en de ♥️5 niet.</h2>
            <h2>De kaarten die vallen moeten of de zelfde kleur hebben als:</h2>
            <h2><li>De troef (die zie je op je mandje)</li></h2>
            <h2><li>Of de eerste kaart in je madje</li></h2>
        </div>
    </div>
    <div class="centererhand">
        <input type="range" min="4" max="10">
        <button onclick="mute()" id="mutebutton">🔇</button>
        <button onclick="reset_game(\'' . plugin_dir_url(__FILE__) . '\')">Start game</button>
        <canvas class="hand" width="180" height="80"></canvas>
        <div id="ui-text" class="score-div">
            <h1 id="score">0</h1>
            <!-- <h1 id="lives">5/5</h1> -->
        </div>
    </div>
    <script src="GAMECODE.js"></script>
    <button onclick="reset_game(\'' . plugin_dir_url(__FILE__) . '\')">
        Start game!
    </button>';
}

wp_enqueue_style('bridgegame_style', plugin_dir_url(__FILE__).'bridgegame.css');
wp_enqueue_script('bridgegame_script', plugin_dir_url(__FILE__).'script.js');
wp_enqueue_script('bridgegame_gamecode', plugin_dir_url(__FILE__).'GAMECODE.js');

add_shortcode('bridgegame', 'bridgegame_add'); 

?>
