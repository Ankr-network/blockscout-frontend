import { Component } from 'react';

declare global {
  interface Window {
    zE?(args: any): void;
    zESettings: any;
  }
}

const canUseDOM = () => {
  if (
    typeof window === 'undefined' ||
    !window.document ||
    !window.document.createElement
  ) {
    return false;
  }

  return true;
};

export const ZendeskAPI = (...args: any) => {
  if (canUseDOM() && window.zE) {
    window.zE.apply(null, args);
  } else {
    /* eslint-disable no-console */
    console.log('Zendesk is not initialized yet');
    /* eslint-enable no-console */
  }
};

interface IZendeskProps {
  zendeskKey: string;
  [objKey: string]: any;
}

export default class Zendesk extends Component<IZendeskProps> {
  constructor(props: IZendeskProps) {
    super(props);
    this.insertScript = this.insertScript.bind(this);
    this.onScriptLoaded = this.onScriptLoaded.bind(this);
  }

  componentDidMount() {
    if (canUseDOM() && !window.zE) {
      const { zendeskKey, ...other } = this.props;
      this.insertScript(zendeskKey);
      window.zESettings = other;
    }
  }

  componentWillUnmount() {
    if (!canUseDOM() || !window.zE) {
      return;
    }

    delete window.zE;
    delete window.zESettings;
  }

  onScriptLoaded() {
    const { onLoaded } = this.props;

    if (typeof onLoaded === 'function') {
      onLoaded();
    }
  }

  insertScript(zendeskKey: string) {
    const script = document.createElement('script');
    script.async = true;
    script.id = 'ze-snippet';
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    script.addEventListener('load', this.onScriptLoaded);
    document.body.appendChild(script);
  }

  render() {
    return null;
  }
}
