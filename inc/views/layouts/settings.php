<?php
/**
 * Plugin settings page template.
 *
 * @package RaiselyWP
 */
?>
<div class="wrap">
  <h1>Raisely Donation Form Settings</h1>
  <p>Configure your Raisely donation form to be used as a shortcode or in a block anywhere on your site. Use the shortcode (<em>[raisely_donation_form campaign={campaign-id}]</em>) or Raisely Donation Form block to add your donation form to WordPress. Questions or problems? Go to <a href="https://support.raisely.com/" target="_blank">support.raisely.com</a>.</p>
  <hr>
  <?php if( ! empty( raisely()->settings->get_setting('auth_method') ) ) : ?>
    <div id="poststuff">
      <form method="post" action="options.php">
          <div class="postbox">
            <?php 
              settings_fields( 'raisely-auth-settings' );
              do_settings_sections( 'raisely_auth_settings' );
            ?>
          </div>
          <?php submit_button( 'Reset Authentication', 'delete' ); ?>
      </form>
    </div>
  <?php else : ?>
    <div id="poststuff">
      <?php settings_errors(); ?>
      <form method="post" action="options.php">
        <div class="postbox">
          <?php 
            settings_fields( 'raisely-api-settings' );
            do_settings_sections( 'raisely_settings' );
          ?>
        </div>
        <?php submit_button( 'Submit' ); ?>
      </form>
      <form method="post" action="options.php">
        <div class="postbox">
          <?php 
            settings_fields( 'raisely-login-settings' );
            do_settings_sections( 'raisely_login_settings' );
          ?>
        </div>
        <?php submit_button( 'Login' ); ?>
      </form>
    </div>
  <?php endif; ?>
</div>