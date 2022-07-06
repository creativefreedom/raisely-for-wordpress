<?php
namespace raisely;

/**
 * Admin Provider
 * 
 * @package RaiselyWP
 */
class Admin
{
  /**
	 * Initialise Admin provider.
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
    add_action( 'admin_notices', [$this, 'plugin_activated_notice'] );
    add_action( 'admin_init', [$this, 'dismiss_setup_notice_handler'] );
  }

  /**
   * Display activation notice.
   * 
   * @return void
   */
  public function plugin_activated_notice(): void
  {
    // Check transient, if available display notice
    if( get_transient( 'raisely-setup-notice' ) ) {
      wp_enqueue_script( 'raisely_admin_notice' );

      // Add plugin activated notice
      $message = sprintf(  
        "<p>%s <a href='%s'>%s</a>.</p>",
        __( 'Raisely Donation Form plugin activated. Get started by', 'raisely' ),
        menu_page_url( 'raisely_settings', false ),
        __( 'setting up your API access', 'raisely' ),
      );

      $dismiss_url = add_query_arg( ['dismiss-raisely-setup-notice' => 1], admin_url() );

      printf( "<div class='raisely-setup-notice updated notice is-dismissible' data-dismiss-url='%s'>%s</div>", $dismiss_url, $message );
    }
  }

  /**
   * Dismiss setup notice transient.
   * 
   * @return void
   */
  public function dismiss_setup_notice_handler()
  {
    $dismiss_notice = filter_input( 
      INPUT_GET, 
      'dismiss-raisely-setup-notice', 
      FILTER_SANITIZE_STRING
    );

    if ( is_string( $dismiss_notice ) && $dismiss_notice === '1' ) {
      delete_transient( 'raisely-setup-notice' );
      wp_send_json_success();
      wp_die();
    }
  }
}