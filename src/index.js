import * as RaiselyDonationForm from './blocks/RaiselyDonationForm';

const { registerBlockType } = wp.blocks

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = (block) => {

  if (!block) {
    return;
  }
  const { metadata, settings, name } = block;

  registerBlockType(name, Object.assign(metadata, settings));
};
[RaiselyDonationForm].forEach(registerBlock);