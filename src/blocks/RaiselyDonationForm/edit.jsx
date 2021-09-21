/**
 * Internal dependencies
 */
import { metadata } from './index';
import ScriptAppender from '../../components/ScriptAppender'
import "./styles.css";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useEffect, useState, useRef, useCallback } = wp.element;
const apiFetch = wp.apiFetch;
const {
  BlockIcon,
  BlockControls
} = wp.blockEditor;
const {
  Placeholder,
  Button,
  SelectControl,
  Spinner,
  ToolbarButton,
  ToolbarGroup,
} = wp.components;

export default function DonationFormEdit({ attributes, setAttributes, ...props }) {
  const { campaignPath } = attributes;
  const { icon, title } = metadata;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaignsList, setCampaignsList] = useState([]);
  const [embedCampaignPath, setCampaignPath] = useState(campaignPath);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [preview, setPreview] = useState(!!campaignPath);
  const [formWrapper, setFormWrapper] = useState(null);

  const formWrapperRef = useCallback(setFormWrapper, []);

  const isIframeLoaded = useRef(null);
  const isStillMounted = useRef();


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
          setError(<span>Setup your connection with Raisely on the <a href={window?.raiselyBlocks?.settingsPage} target="_blank">Raisely Settings page</a> to retrieve a list of your Raisely campaigns.</span>)
        }
      }
    }).catch((e) => {
      if (isStillMounted.current) {
        console.error(e);
        setCampaignsList([]);
        setLoading(false);
        setError("Oops... Something went wrong. Please try again later.")
      }
    });

    return () => {
      isStillMounted.current = false;
      if (isIframeLoaded.current) {
        clearInterval(isIframeLoaded.current);
      }
    };
  }, []);

  const onScriptMount = () => {
    const iframeLoadedInterval = setInterval(() => {
      const iframe = formWrapper.querySelector('iframe');

      if (!!iframe) {

        // Set on load events
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", () => setIframeLoaded(true));
        } else {
          iframe.onload = () => setIframeLoaded(true);
        }

        iframe.style.pointerEvents = 'none';
        isIframeLoaded.current = null;
        clearInterval(isIframeLoaded.current);
      }
    }, 1000);
    isIframeLoaded.current = iframeLoadedInterval;
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          {preview && (
            <ToolbarButton
              className="components-toolbar__control"
              label={__('Edit URL')}
              icon={'edit'}
              onClick={() => setPreview(false)}
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      <div class="wp-raisely-block-donation-form">
        {!preview ? (
          <Placeholder
            icon={<BlockIcon icon={icon} showColors />}
            label={`${title} Campaign`}
            className="wp-block-embed"
            instructions={__(
              'Raisely Campaign you wish to embed'
            )}
          >
            {loading ? (
              <Spinner />
            ) : error ? (
              <p>{error}</p>
            ) : !campaignsList.length ? (
              <p>There are no campaigns to select from.</p>
            ) : (
              <>
                <SelectControl
                  className="raisely-placeholder__input"
                  value={campaignPath}
                  onChange={value => setCampaignPath(value)}
                  options={campaignsList.map(({ path, name }) => ({ value: path, label: name }))}
                />
                <Button className="is-primary" onClick={() => {
                  console.log({ embedCampaignPath })
                  setAttributes({ campaignPath: embedCampaignPath })
                  setPreview(true);
                }}>
                  Embed
                </Button></>
            )}
          </Placeholder>
        ) : (
          <div
            id="raisely-donate"
            data-campaign-path={campaignPath}
            data-width="100%"
            data-height="800"
            ref={formWrapperRef}
          >
            {!iframeLoaded && (<Spinner />)}
            <ScriptAppender
              condition={!!formWrapper}
              src="https://cdn.raisely.com/v3/public/embed.js"
              parent={formWrapper}
              onMount={onScriptMount}
            />
          </div>
        )}
      </div>
    </>
  )
}