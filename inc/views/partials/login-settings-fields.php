<?php
/**
 * Login Settings Fields.
 *
 * @package RaiselyWP
 */
?>
<div class="inside">
  <table class="form-table">

    <tbody>
      <tr>
        <th scope="row">
          <label for="raisely_login_credentials[username]">Raisely Email</label>
        </th>
        <td>
          <input type="email" class="code widefat" name="raisely_login_credentials[username]" id="raisely_login_credentials[username]" placeholder="Email" value="<?= raisely()->settings->get_setting('login_credentials')['username'] ?>">
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="row">
          <label for="raisely_login_credentials[password]">Raisely Password</label>
        </th>
        <td>
          <input type="password" class="code widefat" name="raisely_login_credentials[password]" id="raisely_login_credentials[password]" placeholder="Password" value="">
        </td>
      </tr>
    </tbody>

  </table>
</div>