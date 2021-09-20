<?php
namespace raisely;

/**
 * Shortcodes
 * 
 * @package RaiselyWP
 */
class Shortcodes
{
  /**
	 * Initialises Shortcodes provider.
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
    add_shortcode( 'raisely_donation_form', [$this, 'render_donation_form'] );
  }

  /**
   * Render donation form shortcode.
   * 
   * Hooked in `raisely_donation_form` shortcode.
   * 
   * @access  public
   * 
	 * @param   array   $atts Shortcode attributes.
	 * @return  string
   */
  public function render_donation_form( $args )
  {
    // Form ID
    if( isset( $args['campaign'] ) ) {
      $script   = '<script src="https://cdn.raisely.com/v3/public/embed.js"></script>';
      
      printf(
        '<div id="raisely-donate" data-campaign-path="%s" data-width="%s" data-height="%s">%s</div>',
        $args['campaign'],
        isset( $args['width'] ) ? $args['width'] : '100%',
        isset( $args['height'] ) ? $args['height'] : '800',
        $script
      );
    }
  }

}