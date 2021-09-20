<?php
namespace raisely;

/**
 * @package 	RaiselyWP
 * @author    Raisely
 * @link      https://raisely.com/
 */

function base_64_Encode_SVG( $svg ) {
  // Encode SVG string
  $svg = rawurlencode( $svg );

  // Unescapse string
  $string = '';
  $length = strlen( $svg );
  for( $i = 0; $i < $length; $i ++ ) {
    if ( $svg[$i] == '%' && $svg[$i + 1] == 'u') {
      $value = hexdec ( substr ( $svg, $i + 2, 4 ) );
      if ( $value < 0x7f ) {
        $string .= chr ( $value );
      } else if ( $value < 0x800) {
        $string .= chr ( 0xc0 | ( $value >> 6 ) ) . chr ( 0x80 | ( $value & 0x3f ) );
      } else {
        $string .= chr ( 0xe0 | ( $value >> 12 ) ) . chr ( 0x80 | ( ( $value >> 6 ) & 0x3f ) ) . chr ( 0x80 | ( $value & 0x3f ) );
      }
      $i += 5;
    } else if ( $svg[$i] == '%' ) {
      $string .= urldecode ( substr ( $svg, $i, 3 ) );
      $i += 2;
    } else {
      $string .= $svg[$i];
    }
  }

  // Return with prefix
  return 'data:image/svg+xml;base64,' . base64_encode( $string );
}