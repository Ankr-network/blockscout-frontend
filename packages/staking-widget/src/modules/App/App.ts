import { IModalProps, Modal } from '../Modal';
import './app.css';
import { CLASSES, DEFAULT_STAKING_URL } from './const';

interface IAppProps
  extends Omit<
    IModalProps,
    'content' | 'maxWidth' | 'boxPadding' | 'closeOnVerlayClick'
  > {
  url?: string;
}

export class App {
  private modal: Modal;

  private url: string;

  constructor(props: IAppProps = {}) {
    const { url, ...modalProps } = props;
    this.url = url ?? DEFAULT_STAKING_URL;

    this.modal = new Modal({
      ...modalProps,
      content: this.createContent(),
      maxWidth: 1200,
      boxPadding: false,
      closeOnVerlayClick: false,
    });
  }

  private createContent() {
    const container = document.createElement('div');
    container.className = CLASSES.box;

    const title = document.createElement('div');
    title.innerHTML = 'Ankr Staking app';
    title.className = CLASSES.title;

    const iframe = document.createElement('iframe');
    iframe.src = this.url;
    iframe.className = CLASSES.frame;

    container.appendChild(title);
    container.appendChild(iframe);

    return container;
  }

  public open() {
    this.modal.open();
  }

  public close() {
    this.modal.open();
  }
}
