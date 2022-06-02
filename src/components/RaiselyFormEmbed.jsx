import ScriptAppender from './ScriptAppender';

const { useEffect, useState, useRef, useCallback } = wp.element;

const RaiselyFormEmbed = ({ campaignPath, onIframeLoaded, scriptId }) => {
  const isIframeLoaded = useRef(null);
  const [formWrapper, setFormWrapper] = useState(null);
  const formWrapperRef = useCallback(setFormWrapper, []);

  useEffect(() => {
    return () => {
      if (isIframeLoaded.current) {
        clearInterval(isIframeLoaded.current);
      }
    };
  }, []);

  const onScriptMount = () => {
    const iframeLoadedInterval = setInterval(() => {
      const iframe = formWrapper.querySelector('iframe');

      if (!!iframe) {
        iframe.style.pointerEvents = 'none';
        onIframeLoaded()
        clearInterval(isIframeLoaded.current);
        isIframeLoaded.current = null;
      }
    }, 1000);
    isIframeLoaded.current = iframeLoadedInterval;
  };

  return (
    <div
      id={'raisely-donate'}
      data-campaign-path={campaignPath}
      data-width='100%'
      data-height='800'
      ref={formWrapperRef}
    >
      <ScriptAppender
        id={scriptId}
        condition={!!formWrapper}
        src='https://cdn.raisely.com/v3/public/embed.js'
        parent={formWrapper}
        onMount={onScriptMount}
      />
    </div>
  );
};

export default RaiselyFormEmbed;
