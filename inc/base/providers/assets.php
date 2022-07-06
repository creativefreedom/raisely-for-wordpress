<?php
namespace raisely;

/**
 * Assets
 * 
 * @package RaiselyWP
 */
class Assets
{
  /**
	 * Initialise Assets provider.
	 */
  public function __construct()
  {
    $this->_bootstrap();
  }

  /**
	 * Bootstrap any services if needed.
   * 
   * @access private
	 *
	 * @return void
	 */
  private function _bootstrap()
  {
    add_action( 'enqueue_block_editor_assets', [$this, 'block_assets'] );
    add_action( 'admin_enqueue_scripts', [$this, 'admin_assets'] );
  }

  /**
   * Enqueue block assets.
   * 
   * Hooked into `enqueue_block_editor_assets` action.
   * 
   * @return  void
   */
  public function block_assets()
  {
    wp_enqueue_style( 'raisely_blocks_css', RAISELY_WP_PLUGIN_URL . 'dist/index.css', [], RAISELY_WP_VERSION );
    wp_enqueue_script( 'raisely_blocks_js', RAISELY_WP_PLUGIN_URL . 'dist/index.js', ['wp-blocks', 'wp-editor', 'wp-element', 'wp-i18n'], RAISELY_WP_VERSION );
    
    wp_localize_script( 'raisely_blocks_js', 'raiselyBlocks', [
        'root'          => esc_url_raw( rest_url() ),
        'settingsPage'  => menu_page_url( 'raisely_settings', false ),
        'nonce'         => wp_create_nonce( 'wp_rest' )
    ] );
  }

  public function admin_assets()
  {
    wp_register_script( 'raisely_admin_notice', RAISELY_WP_PLUGIN_URL . 'assets/admin-notice.js', ['jquery'] );
  }
}