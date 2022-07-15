<?php
/**
 * Plugin Name: Raisely Donation Form
 * Description: Add a donation form to a page or post via shortcode or Raisely Donation Form block.
 * Version: 1.0.0
 * Author: Raisely
 * Author URI: https://raisely.com
 * Requires at least: 5.5
 * Requires PHP: 7.3.5
 * 
 *  @package RaiselyWP
 */

require_once plugin_dir_path( __FILE__ ) . "inc/helpers.php";

use raisely\Raisely;

define( 'RAISELY_WP_PLUGIN_FILE', __FILE__ );

// Include the main Raisely class.
if ( ! class_exists( 'Raisely', false ) ) {
	include_once 'inc/base/Raisely.php';
}

/**
 * Returns the main instance of the plugin.
 *
 * @return Raisely
 */
function raisely() {
	return Raisely::instance();
}

raisely();