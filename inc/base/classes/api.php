<?php
namespace raisely;

/**
 * API Handler class
 * 
 * @package RaiselyWP
 */
class API
{

  /**
   * Defines the connection handler class instance
   * 
   * @access  public
   * @var Connection  $connection The connection class instance
   */
  public $connection;

  /**
	 * Defines the default API Raisely Host Endpoint
	 *
	 * @access protected
	 * @var    string $_api_url The Raisely API Host Endpoint.
	 */
	protected $_api_url = RAISELY_WP_API_URL;

  /**
	 * Initialise API class and sets connection handler.
	 */
  public function __construct()
	{
		$this->_connect();
	}

  /**
   * Instantiate Connection class.
   * 
   * @access  private
   */
  private function _connect()
  {
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/classes/connection.php';

    $settings     = raisely()->settings->get_settings();
    $auth_method  = $settings['auth_method'];
    $token        = apply_filters( 'raisely_connection_token', $settings[$auth_method] ?: null );
    $run_test     = apply_filters( 'raisely_run_connection_test', true );

    $this->connection = new Connection( $this->_api_url, $token );

    // Check whether to run the test
    if( empty( $token ) || ! $run_test ) return false;

    try {
      // Run API test.
      $this->connection->auth_test();

			return true;
    } catch ( Exception $e ) {
			return false;
		}
  }

  /**
   * GET request handler
   * 
   * @access  public
   * 
   * @param   string  $route  Raisely API endpoint
   * @return  object          Response body
   */
  public function get( string $route )
  {
    switch( $route ) {
      case 'campaigns' :
        return $this->connection->make_request( 'campaigns' );
    }
  }
}