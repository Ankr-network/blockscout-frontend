import { sleep } from '../../utils/sleep';
import { toggleBodyScroll } from '../../utils/toggleBodyScroll';
import { CLASSES } from './const';
import './modal.css';

export interface IModalProps {
  autoOpen?: boolean;
  closeButton?: boolean;
  maxWidth?: number;
  content: string | Element;
  className?: string;
  boxPadding?: boolean;
  closeOnVerlayClick?: boolean;
  onClose?: (modal: HTMLDivElement) => void;
  onOpen?: (modal: HTMLDivElement) => void;
}

export class Modal {
  private options: IModalProps;

  modal: HTMLDivElement;

  overlay: HTMLDivElement;

  closeButton: HTMLButtonElement;

  handleESCKeydown: (event: KeyboardEvent) => void;

  constructor(props?: IModalProps) {
    const defaults: IModalProps = {
      autoOpen: false,
      closeButton: true,
      maxWidth: 600,
      content: '',
      boxPadding: true,
      closeOnVerlayClick: true,
    };

    this.options = { ...defaults, ...props };
  }

  public async open() {
    this.buildOut();
    this.initializeEvents();
    toggleBodyScroll(true);
    await sleep(10); // need a small delay
    this.modal.classList.add(CLASSES.modalOpened);
  }

  private buildOut() {
    // Create modal element
    this.modal = document.createElement('div');
    this.modal.className = [
      CLASSES.modal,
      ...(this.options.className
        ? [this.options.className]
        : [CLASSES.modalFade]),
    ].join(' ');

    this.overlay = document.createElement('div');
    this.overlay.className = CLASSES.overlay;
    this.modal.appendChild(this.overlay);

    // Create content area and append to modal
    const contentHolder = document.createElement('div');
    contentHolder.className = [
      CLASSES.box,
      ...(this.options.className
        ? [this.options.className]
        : [CLASSES.modalFade]),
      ...(this.options.boxPadding ? [CLASSES.boxPadding] : []),
    ].join(' ');
    contentHolder.style.maxWidth = `${this.options.maxWidth}px`;

    if (typeof this.options.content === 'string') {
      contentHolder.innerHTML = this.options.content;
    } else {
      contentHolder.appendChild(this.options.content);
    }

    this.overlay.appendChild(contentHolder);

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement('button');
      this.closeButton.className = CLASSES.closeBtn;
      this.closeButton.innerHTML = '&times;';
      contentHolder.appendChild(this.closeButton);
    }

    // Append DocumentFragment to body
    document.body.appendChild(this.modal);

    // Fire on open callback
    if (typeof this.options.onOpen === 'function') {
      this.options.onOpen(this.modal);
    }
  }

  initializeEvents() {
    const { closeButton, overlay, options } = this;

    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }

    if (options.closeOnVerlayClick) {
      const handleOverlayClick = (ev: MouseEvent) => {
        const isOverlay = (ev.target as HTMLDivElement).classList.contains(
          CLASSES.overlay,
        );

        if (isOverlay) {
          this.close.bind(this)();
        }
      };

      overlay.addEventListener('click', handleOverlayClick);
    }

    this.handleESCKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', this.handleESCKeydown);
  }

  public close() {
    const { modal, options, handleESCKeydown } = this;

    modal.classList.remove(CLASSES.modalOpened);

    modal.addEventListener('transitionend', () => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
        document.removeEventListener('keydown', handleESCKeydown);

        // enable body scroll
        toggleBodyScroll(false);

        if (typeof options.onClose === 'function') {
          // Fire on close callback
          options.onClose(modal);
        }
      }
    });
  }
}
