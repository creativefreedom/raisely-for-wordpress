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

      // Add plugin activated notice
      $message = sprintf(  
        "<p>%s <a href='%s'>%s</a>.</p>",
        __( 'Raisely Donation Form plugin activated. Get started by', 'raisely' ),
        menu_page_url( 'raisely_settings', false ),
        __( 'setting up your API access', 'raisely' ),
      );

      printf( "<div class='updated notice is-dismissible'>%s</div>", $message );

      /* Delete transient, only display this notice once. */
      delete_transient( 'raisely-setup-notice' );
    }
  }
}