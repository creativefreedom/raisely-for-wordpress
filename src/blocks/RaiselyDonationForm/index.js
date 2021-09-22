/**
 * Internal dependencies
 */
import edit from './edit';
import { logo } from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { name } = metadata;
export { metadata, name };

export const settings = {
  icon: logo,
  description: __('Displays a Raisely campaign donation form.', 'raisely'),
  example: {},
  edit,
};
