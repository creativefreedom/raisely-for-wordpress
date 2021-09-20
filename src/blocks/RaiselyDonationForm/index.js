/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { logo } from './icon';
import metadata from './block.json';

const { name } = metadata;
export { metadata, name };

export const settings = {
  icon: logo,
  example: {},
  edit,
  save
};
