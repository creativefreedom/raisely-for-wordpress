const ScriptAppender = ({ condition, src, parent, onMount }) => {

  // Check condition
  if (!condition) return null;

  // Check if script already exists
  const existingScript = parent.querySelector(`script[src="${src}"]`);

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = src;

    if (!!onMount) {
      script.addEventListener('load', () => onMount(script));
    }

    parent.appendChild(script);

  }


  return null;
}
export default ScriptAppender;
