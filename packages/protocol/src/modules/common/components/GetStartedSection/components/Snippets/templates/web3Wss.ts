export const web3Wss = `const WebSocket = require('ws');

const url = '__url__'  // url string

const request = '{"id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}';  

const ws = new WebSocket(url);

ws.on('open', function open() {
    ws.send(request);
});
ws.on('message', function incoming(data) {
    res = JSON.parse(data)
    if (res.result != null) {
        console.log(\`Subscription: \${res.result}\`);
    } else if (res.params != null && res.params["result"] != null) {
        console.log(\`New pending transaction: \${res.params['result']}\`);
    } else {
        console.log(\`Unexpected: \${data}\`);
    }
});`;
