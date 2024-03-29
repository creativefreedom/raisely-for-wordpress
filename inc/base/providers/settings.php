<?php
namespace raisely;

/**
 * Settings Provider
 * 
 * @package RaiselyWP
 */
class Settings
{
  /**
	 * Initialises Settings provider.
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
    add_action( 'admin_menu', [$this, 'register_admin_pages'] );
    add_action( 'admin_init', [$this, 'register_options'] );
    add_action( 'pre_update_option_raisely_api_key', [$this, 'handle_api_key_update'], 10, 2 );
  }

  /**
   * Register admin menu pages.
   * 
   * Hooked into admin_menu action.
   * 
   * @return  void
   */
  public function register_admin_pages()
  {
    add_submenu_page(
      'options-general.php', 
      __( 'Raisely Donation Form Settings', 'raisely' ),
      __( 'Raisely', 'raisely' ),
      'manage_options',
      'raisely_settings',
      function() { raisely()->render( 'layouts', 'settings' ); }
    );
  }

  /**
   * Register Settings options.
   * 
   * Hooked into admin_init action.
   * 
   * @return  void
   */
  public function register_options()
  {
    // Register Settings
    register_setting(
      'raisely-api-settings', 
      'raisely_api_key', 
      [
        'type'    => 'string',
        'default' => ''
      ] 
    );

    register_setting(
      'raisely-auth-settings', 
      'raisely_auth_method',
      [
        'type'    => 'string',
        'default' => ''
      ]
    );

    // Add Settings Sections
    add_settings_section(
      'raisely-api-settings',
      __( 'Authenticate with API Key', 'raisely' ),
      function(){ raisely()->render( 'partials', 'api-settings-fields' ); },
      'raisely_settings'
    );

    add_settings_section(
      'raisely-auth-settings',
      $this->_get_auth_section_title(),
      function(){ raisely()->render( 'partials', 'auth-settings-fields' ); },
      'raisely_auth_settings'
    );
  }

  /**
   * Get the array of all settings fields.
   *
   * @return array<string>   Key value array of settings field values
   */
  public function get_settings()
  {
    return apply_filters(
      'raisely_get_settings', 
      [
        'api_key'       => $this->get_setting( 'api_key' ),
        'auth_method'   => $this->get_setting( 'auth_method' ),
      ]
    );
  }

  /**
   * Get setting field
   * 
   * @param   string  $option The settings option key
   * @return  mixed           The settings field value
   */
  public function get_setting( string $option )
  {
    return apply_filters( "raisely_settings_{$option}", get_option( "raisely_{$option}" ) );
  }

  /**
   * Handle API Key settings update
   * 
   * Hooked into `pre_update_option_raisely_api_key` action.
   * 
   * @access  public
   * 
   * @param   mixed   $new_value  The new, unserialized option value.
   * @param   mixed   $old_value  The old option value.
   * @return  string              Option name.
   */
  public function handle_api_key_update( $new_value, $old_value )
  {
    if( empty( $new_value ) ) return $new_value;

    // Set the new value as a settings value to pass in to the auth test
    add_filter( 'raisely_settings_api_key', function() use( $new_value ) { return $new_value; } );
    add_filter( 'raisely_settings_auth_method', function() { return 'api_key'; } );
    
    // Add response handlers
    add_action( 'raisely_auth_test_success', [$this, 'handle_successful_api_key_test'], 10, 1 );
    add_action( 'raisely_auth_test_fail', [$this, 'handle_failed_api_key_test'], 10, 1 );

    // Initialise API and trigger auth
    $api = raisely()->api();

    return $new_value;
  }

  /**
   * Handle successful authentication via Raisely API Key.
   * 
   * Hooked into `raisely_auth_test_success` action.
   * 
   * @param   object  $body     The response body.
   * @return  void
   */
  public function handle_successful_api_key_test( $body )
  {
    update_option( 'raisely_auth_method', 'api_key' );
    add_settings_error( 'raisely_api_key', 'raisely_notice', __( 'Authentication successful. API Key saved.', 'raisely' ), 'success' );
  }
  
  /**
   * Handle failed authentication via Raisely API Key.
   * 
   * Hooked into `raisely_auth_test_fail` action.
   * 
   * @param   object  $body     The response body.
   * @return  void
   */
  public function handle_failed_api_key_test( $body ) {
    switch($body->status) {
      case 401 :
        $message = 'Unauthorised: Your Raisely API key is invalid.';
        break;
      default :
        $message = 'Something went wrong. Please try again';
    }
    update_option( 'raisely_auth_method', '' );
    add_settings_error( 'raisely_api_key', 'raisely_notice', __( $message, 'raisely' ), 'error' );
  }

  /**
   * Get the title for the auth_method settings section based on the current Auth method.
   * 
   * @access  protected
   * 
   * @return  string  Formatted title to be shown as the heading for the section. 
   */
  protected function _get_auth_section_title(): string
  {
    $check = '<span class="dashicons dashicons-yes-alt" style="color: green;"></span> ';
    switch( $this->get_setting( 'auth_method' ) ) {
      case 'api_key' :
        return $check . __( 'You have successfully authenticated this plugin using a Raisely Campaign API Key.', 'raisely' );
      default :
        return __( 'Something has gone wrong. Click the reset authentication button below to try again.', 'raisely' );
    }
  }
}