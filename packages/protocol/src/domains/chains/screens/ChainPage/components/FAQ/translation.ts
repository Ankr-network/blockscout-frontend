import { Locale } from 'modules/i18n';

export const faqTranslation = {
  [Locale.en]: {
    bsc: {
      title: 'FAQ',
      item1Title:
        "What basics should I know before using Ankr's BNB Smart Chain (BSC) RPC endpoint?",
      item1Description:
        '<ul><li>For BNB Smart Chain, we use Archive nodes only, which provides for full historical data access, advanced querying capabilities, data integrity and verification, as well as improved analytics and performance.</li><li>For BNB Smart Chain, we provide access to both Mainnet and Testnet networks via HTTPS and WSS connection.</li><li>Quick links: <a href="https://www.ankr.com/docs/rpc-service/chains/chains-list/#bnb-smart-chain" target="_blank">quickstart docs</a>, <a href="https://www.bnbchain.org/en/bnb-smart-chain" target="_blank">website</a>, <a href="https://github.com/bnb-chain" target="_blank">GitHub</a>, <a href="https://bscscan.com/" target="_blank">block explorer</a></li></ul>',
      item2Title: 'What is the Chain ID for BNB Smart Chain (BSC) Mainnet?',
      item2Description:
        'The <code>Chain ID</code> for BNB Smart Chain Mainnet is <code>56</code>.',
      item3Title:
        'What is the official block explorer for BNB Smart Chain (BSC)?',
      item3Description:
        'The block explorer URL for BNB Smart Chain is <a href="https://bscscan.com/" target="_blank"><code>https://bscscan.com/</code></a>.',
      item4Title:
        "How can I add Ankr's BNB Smart Chain (BSC) Mainnet RPC endpoint into MetaMask?",
      item4Description:
        '<ol><li>In the MetaMask extension, click <b>Networks</b> (drop-down menu) > <b>Add network</b> to open <b>Settings</b>.</li><li>In the <b>Add a network</b> panel, click <b>Add a network manually</b>, then enter the network details and click <b>Save</b>: <ul><li><b>Network name</b>: <code>BNB Smart Chain Mainnet by Ankr RPC.</code></li><li><b>New RPC URL</b>: <code>https://rpc.ankr.com/bsc/</code></li><li><b>Chain ID</b>: <code>56</code>.</li><li><b>Currency symbol</b>: <code>BNB</code>.</li><li><b>Block explorer URL</b>: <code>https://bscscan.com/</code></li></ul></li></ol>',
      item5Title:
        'Can I interact with the BNB Smart Chain RPC endpoint for free?',
      item5Description:
        'Absolutely. We have two free-of-charge service plans for BSC — Public and Freemium. They both support HTTPS connection and Standard API calls but differ in query rate limits — 20 requests/second for Public and 30 requests/second for Freemium.',
      item6Title:
        'What are the benefits of using the Premium service plan for BSC or other blockchain interaction?',
      item6Description:
        'With the Premium service plan, you get superior rate limits of 1500 requests/second, top-performing globally distributed infrastructure of nodes, access to 55+ blockchains, 3 projects, a multi-project statistics dashboard, team accounts collaboration, WebSockets, and 24/7 priority portal support.',
    },
  },
};
