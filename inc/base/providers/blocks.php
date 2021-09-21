<?php
namespace raisely;

/**
 * Blocks
 * 
 * @package RaiselyWP
 */
class Blocks
{
  /**
	 * Initialises Blocks provider.
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
    add_action( 'init', [$this, 'register_blocks'] );
  }

  public function register_blocks()
  {
    register_block_type_from_metadata(
      RAISELY_WP_PLUGIN_PATH . 'src/blocks/RaiselyDonationForm',
      [
        'render_callback' => [$this, 'render_donation_form_block'],
      ]
    );
  }

  /**
   * Renders the `raisely/donation-form` block on server.
   * 
   * @access  public
   *
   * @param   array $attributes The block attributes.
   * @return  string            Returns the donation form content.
   */
  public function render_donation_form_block( $attributes )
  {
    if( empty( $attributes['campaignPath'] ) ) return;

    ob_start();
    do_shortcode( sprintf( 
      '[raisely_donation_form campaign=%s]', 
      $attributes['campaignPath'] 
    ) );
    $block_markup = sprintf( '<div class="wp-raisely-block-donation-form">%s</div>', ob_get_contents() );
    ob_get_clean();

    return $block_markup;
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