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
          <label for="raisely_api_key">API Key</label>
        </th>
        <td>
          <input type="text" class="code widefat" name="raisely_api_key" id="raisely_api_key" placeholder="Enter your API Key" value="<?= raisely()->settings->get_setting('api_key'); ?>">
          <p class="description">Enter a your campaign API Key. You can obtain your API key by first selecting the campaign from the <a href="https://admin.raisely.com/campaigns/" target="_blank">Campaigns dashboard</a> in Raisely and navigating to API and Webhooks under Settings.</p>
        </td>
      </tr>
    </tbody>

  </table>
</div>