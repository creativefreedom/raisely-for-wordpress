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
    add_action( 'pre_update_option_raisely_login_credentials', [$this, 'handle_raisely_login'], 10, 2 );
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
    add_menu_page(
      'Raisely Donation Form Settings',
      'Raisely',
      'manage_options',
      'raisely_settings',
      function() { raisely()->render( 'layouts', 'settings' ); },
      base_64_Encode_SVG( file_get_contents( RAISELY_WP_PLUGIN_PATH . 'assets/raisely-icon.svg' ) ),
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
        'default' => 'api_key'
      ]
    );

    register_setting(
      'raisely-login-settings', 
      'raisely_access_token',
      [
        'type'    => 'string',
        'default' => ''
      ]
    );

    register_setting(
      'raisely-login-settings', 
      'raisely_login_credentials',
      [
        'type'    => 'array',
        'default' => ['username' => '', 'password' => '']
      ]
    );

    // Add Settings Sections
    add_settings_section(
      'raisely-api-settings',
      'Authenticate with API Key',
      function(){ raisely()->render( 'partials', 'api-settings-fields' ); },
      'raisely_settings'
    );

    add_settings_section(
      'raisely-login-settings',
      'Authenticate with Login Credentials',
      function(){ raisely()->render( 'partials', 'login-settings-fields' ); },
      'raisely_login_settings'
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
  public function get_settings(): array
  {
    return apply_filters(
      'raisely_get_settings', 
      array_merge( 
        [
          'api_key'       => $this->get_setting( 'api_key' ),
          'access_token'  => $this->get_setting( 'access_token' ),
          'auth_method'   => $this->get_setting( 'auth_method' ),
        ], 
        $this->get_setting( 'login_credentials' ) 
      )
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
   * Handle Raisely login via settings page.
   * 
   * Hooked into `pre_update_option_raisely_login_credentials` action.
   * 
   * @access  public
   * 
   * @param   mixed   $new_value  The new, unserialized option value.
   * @param   mixed   $old_value  The old option value.
   * @return  string              Option name.
   */
  public function handle_raisely_login( $new_value, $old_value )
  {
    if( ! empty( $new_value['username'] ) && ! empty( $new_value['password'] ) ) {

      // Clear any existing tokens from new connection request.
      add_filter( 'raisely_connection_token', '__return_null' );

      // Add response handlers.
      add_action( "raisely_login_post_request_success", [$this, 'handle_successful_login'], 10, 3 );
      add_action( "raisely_login_post_request_fail", [$this, 'handle_failed_login'], 10, 3 );

      // Initialise API.
      $api = raisely()->api();

      // Send request.
      $api->post( 
        'login', 
        [
          'username'          => $new_value['username'], 
          'password'          => $new_value['password'],
          'requestAdminToken' => true
        ]
      );
      
    } else {
      // If insufficent values are given remove authentication.
      update_option( 'raisely_access_token', '' );
      update_option( 'raisely_auth_method', '' );
    }

    // Do not save password to database.
    if( ! empty( $new_value['password'] ) ) {
      $new_value['password'] = '';
    }

    return $new_value;
  }

  /**
   * Handle successful login via Raisely Login API.
   * 
   * Hooked into `raisely_login_post_request_success` action.
   * 
   * @param   object  $body     The response body.
   * @param   int     $code     HTTP response code.
   * @param   array   $response The response object.
   * @return  void
   */
  public function handle_successful_login( $body, $code, $response ): void
  {
    if( ! empty( $body->token ) ) {
      update_option( 'raisely_access_token', $body->token );
      update_option( 'raisely_auth_method', 'access_token' );
      add_settings_error( 'raisely_api_key', 'raisely_notice', 'Authentication successful.', 'success' );
    } else {
      update_option( 'raisely_access_token', '' );
    }
  }

  /**
   * Handle failed login via Raisely Login API.
   * 
   * Hooked into `raisely_login_post_request_fail` action.
   * 
   * @param   object  $body     The response body.
   * @param   int     $code     HTTP response code.
   * @param   array   $response The response object.
   * @return  void
   */
  public function handle_failed_login( $body, $code, $response ): void
  {
    switch($body->status) {
      case 401 :
        $message = $body->detail;
        break;
      default :
        $message = 'Something went wrong. Please try again';
    }
    update_option( 'raisely_auth_method', '' );
    update_option( 'raisely_access_token', '' );
    add_settings_error( 'raisely_api_key', 'raisely_notice', $message, 'error' );
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
    add_settings_error( 'raisely_api_key', 'raisely_notice', 'Authentication successful. API Key saved.', 'success' );
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
    add_settings_error( 'raisely_api_key', 'raisely_notice', $message, 'error' );
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
    $check = '<span class="dashicons dashicons-yes-alt" style="color: green;"></span>';

    switch( $this->get_setting( 'auth_method' ) ) {
      case 'api_key' :
        return sprintf( "%s You have successfully authenticated this plugin using a Raisely Campaign API Key.", $check );
      case 'access_token' :
        return sprintf( "%s You have successfully authenticated this plugin using your Raisely email %s.", $check, $this->get_setting( 'login_credentials' )['username'] );
      default :
        return 'Something has gone wrong. Click the reset authentication button below to try again.';
    }
  }
}