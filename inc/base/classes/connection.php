<?php
namespace raisely;

/**
 * Connection class
 * 
 * @package RaiselyWP
 */
class Connection
{

  /**
	 * Defines the default API Raisely Host Endpoint
	 *
	 * @access public
	 * @var    string $api_url The Raisely API Host Endpoint.
	 */
  public $api_url;

	/**
	 * Defines the authorisation token.
	 * 
	 * @access	public
	 * @var			string	$token	Raisely user authenticated token or campaigns API Key.
	 */
	public $token;
  
	/**
	 * Initialise Connect class.
	 */
  function __construct( $api_url, $token = null )
	{
		$this->api_url	= $api_url;
		$this->token		= $token;
	}

	/**
	 * Get request headers
	 * 
	 * @param		array|null	$args	A key value array to add to request header properties
	 * @return	array
	 */
	function get_headers( $args = [] ): array
	{
		$headers = ['Accept'	=> "application/json"];

		if( ! empty( $this->token ) ) {
			$headers['Authorization'] = "Bearer {$this->token}";
		}
		
		return array_merge( $headers, $args );
	}

	/**
	 * Make API request
	 * 
	 * @access public
	 * 
	 * @param		string			$endpoint	The endpoint slug
	 * @param		array|null	$query		Key and value array of query string values
	 * @param		array|null	$args			List of arguments to add as the body of POST requests or the request object of GET requests
	 * @param		string|null	$method		The request method
	 * @return	object								The response body
	 */
	function make_request( $endpoint, $query = [], $args = [], $method = 'GET' )
	{
		$host = untrailingslashit( $this->api_url );

		// Build request URL.
		$url = "{$host}/{$endpoint}";

		// Build query params as string.
		if( ! empty( $query ) ) $url .= "?" . http_build_query( $query );

		// Allows request timeout to Raisely to be changed. Timeout is in seconds
		$timeout = apply_filters( 'raisely_request_timeout', 20 );

		// Execute request based on method.
		switch ( $method ) {
			case 'POST':
				$args = [
					'headers' => $this->get_headers( ['Content-Type' => 'application/json'] ),
					'body'		=> json_encode( $args ),
					'timeout' => $timeout
				];
				$response = wp_remote_post( $url, $args );
				break;

			case 'GET':
				$args = array_merge( [
					'headers' => $this->get_headers(),
					'timeout' => $timeout
				], $args );

				$response = wp_remote_get( $url, $args );
				break;
		}



		// If WP_Error, die. Otherwise, return decoded JSON.
		if ( is_wp_error( $response ) ) {
			die( 'Request failed. ' . $response->get_error_message() );
		} else {
			/**
			 * @var	string	$hook_name The hook name to fire following the request
			 * @example	raisely_campaigns_post_request_success
			 */
			$hook_name = sprintf(
				'raisely_%s_%s_request_%s',
				str_replace( '/', '_', $endpoint ),
				strtolower( $method ),
				$response['response']['code'] !== 200 ? 'fail' : 'success'
			);

			// Run action after request.
			do_action( $hook_name, json_decode( $response['body'] ), $response['response']['code'], $response );
			
			return json_decode( $response['body'], true );
		}
	}

	/**
	 * Test the provided API credentials.
	 * 
	 * @access	public
	 * @return	void
	 */
	function auth_test(): void
	{

		$endpoint	= 'users/me';
		$outcomes	=	['success', 'fail'];

		// Setup hooks
		foreach( $outcomes as $outcome ) {

			/**
			 * @var	string	$hook_name The hook name to fire following the request
			 * @example	raisely_users_me_get_request_success
			 */
			$hook_name = sprintf( 
				"raisely_%s_get_request_%s", 
				str_replace( '/', '_', $endpoint ), 
				$outcome 
			);

			add_action( $hook_name, function( $body, $code, $response ) use( $outcome ) { 
				do_action( "raisely_auth_test_{$outcome}", $body, $code, $response );
			}, 10, 3 );
		}

		// Execute request.
		$this->make_request( $endpoint );
	}

}