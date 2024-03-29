<?php
namespace raisely;

/**
 * Services
 * 
 * @package RaiselyWP
 */
class Services
{
  /**
	 * Initialise Services provider.
	 */
  public function __construct()
  {
    $this->_bootstrap();
  }

	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	private function _bootstrap(): void
	{
		register_activation_hook( RAISELY_WP_PLUGIN_FILE, [$this, 'activate'] );
		register_deactivation_hook( RAISELY_WP_PLUGIN_FILE, [$this, 'deactivate'] );

		add_action( 'plugins_loaded', [$this, 'load_text_domain'] );
	}

	/**
	 * Plugin activation.
	 * 
	 * Hooked to register_activation_hook.
	 *
	 * @return 	void
	 */
	public function activate(): void
	{
		$auth_method = get_option( 'raisely_auth_method', false );

		if( ! $auth_method || ! get_option( "raisely_{$auth_method}", false ) ) {
      set_transient( 'raisely-setup-notice', true, 0 );
    }
	}

	/**
	 * Plugin deactivation. Delete plugin settings.
	 * 
	 * Hooked to register_deactivation_hook.
	 *
	 * @return void
	 */
	public function deactivate(): void
	{
		delete_option( 'raisely_api_key' );
		delete_option( 'raisely_auth_method' );
	}

	/**
	 * Load textdomain.
	 *
	 * @return void
	 */
	public function load_text_domain() {
		load_plugin_textdomain( 'raisely', false, basename( dirname( RAISELY_WP_PLUGIN_FILE ) ) . DIRECTORY_SEPARATOR . 'languages' );
	}
}