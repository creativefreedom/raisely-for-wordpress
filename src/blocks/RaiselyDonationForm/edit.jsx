import "./styles.css";

import RaiselyFormEmbed from '../../components/RaiselyFormEmbed'
import ScriptAppender from '../../components/ScriptAppender'
/**
 * Internal dependencies
 */
import { metadata } from './index';
import { onIframeLoad } from "../../util";

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { useEffect, useState, useRef, useCallback } = wp.element;
const apiFetch = wp.apiFetch;
const {
  BlockIcon,
  BlockControls,
  useBlockProps,
  InspectorControls
} = wp.blockEditor;
const {
  BaseControl,
  Button,
  SelectControl,
  PanelBody,
  Placeholder,
  Spinner,
  ToolbarButton,
  ToolbarGroup,
} = wp.components;

export default function DonationFormEdit({ attributes, setAttributes, clientId, ...props }) {
  const { campaignPath } = attributes;
  const { icon, title } = metadata;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaignsList, setCampaignsList] = useState([]);
  const [embedCampaignPath, setCampaignPath] = useState(campaignPath);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [preview, setPreview] = useState(!!campaignPath);
  const [embedKey, setEmbedKey] = useState(1);

  const isIframeLoaded = useRef(null);
  const isStillMounted = useRef();

  const blockProps = useBlockProps();

  useEffect(() => {
    isStillMounted.current = true;

    if (window.raiselyBlocks?.nonce) {
      apiFetch.use(apiFetch.createNonceMiddleware(window.raiselyBlocks.nonce));
    }

    apiFetch({
      path: `/raisely/v1/campaigns-list`,
    }).then(res => {
      if (isStillMounted.current) {
        setLoading(false);
        if (res.auth) {
          setCampaignsList(res.data);
        } else {
          setError(
            <span>{__('Setup your connection with Raisely on the', 'raisely')} <a href={window?.raiselyBlocks?.settingsPage} target="_blank">{__('Raisely Settings page', 'raisely')}</a> {__('to retrieve a list of your Raisely campaigns.', 'raisely')}</span>
          )
        }
      }
    }).catch((e) => {
      if (isStillMounted.current) {
        console.error(e);
        setCampaignsList([]);
        setLoading(false);
        setError(__("Oops... Something went wrong. Please try again later.", 'raisely'))
      }
    });

    return () => {
      isStillMounted.current = false;
      if (isIframeLoaded.current) {
        clearInterval(isIframeLoaded.current);
      }
    };
  }, []);

  const instructions = !error ? __('Raisely Campaign you wish to embed', 'raisely') : '';

  return (
    <>
      <div {...blockProps}>
        <BlockControls>
          <ToolbarGroup>
            {preview && (
              <ToolbarButton
                className="components-toolbar__control"
                label={__('Edit URL', 'raisely')}
                icon={'edit'}
                onClick={() => setPreview(false)}
              />
            )}
          </ToolbarGroup>
        </BlockControls>
        {!preview ? (
          <Placeholder
            icon={<BlockIcon icon={icon} showColors />}
            label={sprintf(__(`%s Campaign`, 'raisely'), title)}
            className="wp-block-embed"
            instructions={instructions}
          >
            {loading ? (
              <Spinner />
            ) : error ? (
              <p>{error}</p>
            ) : !campaignsList.length ? (
              <p>{__('There are no campaigns to select from.', 'raisely')}</p>
            ) : (
              <form onSubmit={() => {
                setAttributes({ campaignPath: embedCampaignPath })
                setPreview(true);
              }}>
                <select
                  className="raisely-placeholder__input"
                  value={campaignPath}
                  onChange={e => setCampaignPath(e.target.value)}
                >
                  {campaignsList.map(({ path, name }) => (
                    <option key={path} value={path}>{name}</option>
                  ))}
                </select>
                <Button className="is-primary" type="submit">
                  {_x('Embed', 'raisely')}
                </Button>
              </form>
            )}
          </Placeholder>
        ) : (
          <>
            <InspectorControls>
              <PanelBody
                title={__('Campaign Options', 'raisely')}
                initialOpen={true}
              >
                <BaseControl>
                  <SelectControl
                    className="raisely-placeholder__input"
                    label="Select a campaign"
                    value={campaignPath}
                    onChange={value => {
                      setAttributes({ campaignPath: value });
                      setCampaignPath(value);
                      setEmbedKey(embedKey + 1);
                    }}
                    options={campaignsList.map(({ path, name }) => ({ value: path, label: name }))}
                  />
                </BaseControl>
              </PanelBody>
            </InspectorControls>
            {!iframeLoaded && (<Spinner />)}
            <RaiselyFormEmbed
              key={`${clientId}_raisely_embed_${embedKey}`}
              scriptId={clientId}
              campaignPath={campaignPath}
              onIframeLoaded={() => setIframeLoaded(true)}
            />
          </>
        )}
      </div>
    </>
  )
}