export const curlWss = `# bash
wscat -c __url__
# subscribe
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
# unsubscribe
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["The result value returned after successful subscription"]}`;
