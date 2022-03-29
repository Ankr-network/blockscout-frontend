export const ZENDESK_KEY = '2c84d5a5-9756-4ba5-9eed-9fc1e21ee4f4';

export const SETTINGS = {
  launcher: {
    chatLabel: {
      'en-US': 'Need Help',
    },
    mobile: {
      labelVisible: false,
    },
  },
  contactForm: {
    fields: [
      { id: 'description', prefill: { '*': 'My pre-filled description' } },
    ],
  },
};

const hideFieldByKey = (key: string) => {
  const iframe = document.getElementById('webWidget');

  if (iframe) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fieldLabel = iframe.contentWindow.document.body.querySelector(
      `label[data-fieldid='key:${key}']`,
    );
    if (fieldLabel) {
      fieldLabel.parentElement.style.display = 'none';
    }
  }
};

const API_ENDPOINT = '360049219293';
const NODE_TYPE = '360049245773';
const PRODUCT = '1500005699061';
const TELEGRAM_ID = '360049258734';

// eslint-disable-next-line
const TRANSACTION_ID = '1500005753502';

export const hideUselessFields = () => {
  hideFieldByKey(API_ENDPOINT);
  hideFieldByKey(NODE_TYPE);
  hideFieldByKey(PRODUCT);
  hideFieldByKey(TELEGRAM_ID);
};
