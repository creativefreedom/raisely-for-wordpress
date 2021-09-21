<?php
namespace raisely;

/**
 * Rest
 * 
 * @package RaiselyWP
 */
class Rest
{
  /**
	 * Initialise Rest provider.
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
    add_action( 'rest_api_init', [$this, 'register_routes'] );
  }

  /**
   * Register rest routes.
   * 
   * Hooked into `rest_api_init` action.
   * 
   * @return void
   */
  public function register_routes(): void
  {
    register_rest_route( 'raisely/v1', '/campaigns-list', [
      'methods'   => 'GET',
      'callback'  => [$this, 'campaigns_list_response'],
      'permission_callback' => function () {
        return current_user_can( 'edit_posts' );
      }
    ] );
  }

  /**
   * Get campaign list callback.
   * 
   * @access  public
   * 
   * @return  array   An array of Raisely campaign paths and names.
   */
  public function campaigns_list_response()
  {
    // Check plugin is configured
    $auth_method = raisely()->settings->get_setting( 'auth_method' );
    if( empty( $auth_method ) ) return ['auth' => false];

    $api            = raisely()->api();
    $campaigns      = $api->get( 'campaigns' );
    $campaign_paths = [];

    if( ! empty( $campaigns ) && ! empty( $campaigns['data'] ) ) {

      $campaign_paths = array_map( function( $campaign ) {
        return [
          'path'  => $campaign['path'],
          'name'  => $campaign['name']
        ];
      }, $campaigns['data'] );

    };

    return [
      'auth'  => true,
      'data'  => $campaign_paths
    ];
  }
}