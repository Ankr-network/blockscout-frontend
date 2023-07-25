export const loadJquery = () => {
  const script = document.createElement('script');

  script.src =
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
  const jqueryScript = document.getElementsByTagName('script');
  const src = Array.from(jqueryScript).filter(item => item.src === script.src);

  if (src.length === 0) {
    document.body.appendChild(script);
  }
};
