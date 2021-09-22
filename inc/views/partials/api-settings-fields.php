<?php
/**
 * API Settings Fields.
 *
 * @package RaiselyWP
 */
?>
<div class="inside">
  <table class="form-table">

    <tbody>
      <tr>
        <th scope="row">
          <label for="raisely_api_key"><?php _e( 'API Key', 'raisely' ); ?></label>
        </th>
        <td>
          <input type="text" class="code widefat" name="raisely_api_key" id="raisely_api_key" placeholder="Enter your API Key" value="<?= raisely()->settings->get_setting('api_key'); ?>">
          <?php 
            printf( 
              '<p class="description">%s <a href="https://admin.raisely.com/campaigns/" target="_blank">%s</a> %s</p>',
              __( 'Enter a your campaign API Key. You can obtain your API key by first selecting the campaign from the', 'raisely' ),
              __( 'Campaigns dashboard', 'raisely' ),
              __( 'in Raisely and navigating to API and Webhooks under Settings.', 'raisely' ),
            );
          ?>
        </td>
      </tr>
    </tbody>

  </table>
</div>