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

    wp_enqueue_script( 'raisely-embed' );

    ob_start();
    do_shortcode( sprintf( '[raisely_donation_form campaign=%s]', $attributes['campaignPath'] ) );
    $block_markup = sprintf( '<div class="wp-raisely-block-donation-form">%s</div>', ob_get_contents() );
    ob_get_clean();

    return $block_markup;
  }
}