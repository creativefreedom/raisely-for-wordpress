(function ($) {
  'use strict';
  $(function () {
    $('.raisely-setup-notice').on('click', '.notice-dismiss', function (event, el) {
      const $notice = $(this).parent('.notice.is-dismissible');
      const dismissUrl = $notice.data('dismiss-url');
      if (dismissUrl) $.get(dismissUrl);
    });
  });
})(jQuery);