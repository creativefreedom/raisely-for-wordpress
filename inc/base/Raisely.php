<?php 
namespace raisely;

/**
 * Raisely class
 * 
 * @package RaiselyWP
 */

class Raisely {

	/**
	 * Contains an instance of this class, if available.
	 *
	 * @access protected
	 * @var    object $_instance If available, contains an instance of this class.
	 */
  protected static $_instance = null;

	/**
	 * Defines the default API Raisely Host Endpoint
	 *
	 * @access protected
	 * @var    string $_api_url The Raisely API Host Endpoint.
	 */
  protected static $_api = null;

	/**
	 * Main Plugin Instance.
	 * 
	 * Ensures only one instance is loaded or can be loaded.
	 *
	 * @return Raisely
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

  /**
	 * Plugin Constructor.
	 */
  public function __construct()
  {
    $this->_define_constants();
		$this->_load_providers();
  }

  /**
	 * Define Raisely Plugin Constants.
	 */
  private function _define_constants()
  {
    $this->_define( 'RAISELY_WP_VERSION', '1.0.0' );
    $this->_define( 'RAISELY_WP_PLUGIN_PATH', plugin_dir_path( dirname( __FILE__, 2 ) ) );
    $this->_define( 'RAISELY_WP_PLUGIN_URL', plugin_dir_url( dirname( __FILE__, 2 ) ) );
    $this->_define( 'RAISELY_WP_API_URL', 'https://api.raisely.com/v3' );
    $this->_define( 'RAISELY_WP_VIEWS', plugin_dir_path( dirname( __FILE__, 2 ) ) . "/inc/views/" );
  }

	/**
	 * Load plugin providers
	 * 
	 * @access	private
	 * @return	void
	 */
  private function _load_providers()
  {
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/admin.php';
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/assets.php';
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/shortcodes.php';
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/services.php';
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/settings.php';
    include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/providers/rest.php';

		$this->admin			= new Admin;
		$this->assets			= new Assets;
		$this->shortcodes	= new Shortcodes;
		$this->services		= new Services;
		$this->settings		= new Settings;
		$this->rest				= new Rest;
  }
  /**
	 * Define constant if not already set.
	 *
	 * @param 	string      $name  Constant name.
	 * @param 	string|bool $value Constant value.
	 * @return	void
	 */
	private function _define( string $name, $value ): void
  {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
  }

	/**
	 * Initialise API providers
	 * 
	 * @access	public
	 * @return	API			API provider instance
	 */
	public function API()
	{
		include_once RAISELY_WP_PLUGIN_PATH . 'inc/base/classes/api.php';
		
		if ( is_null( self::$_api ) ) {
			self::$_api = new API();
		}
		return self::$_api;
	}

	/**
	 * Renders template view
	 * 
	 * @access	public
	 * 
	 * @param		string	$folder			Views parent directory name
	 * @param		string	$file_name	Name of view file
	 * @return	void
	 */
	public function render( string $folder, string $file_name ): void
	{
		require_once RAISELY_WP_VIEWS . $folder . "/" . $file_name . ".php";
	}
}