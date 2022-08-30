export const pythonWss = `import asyncio
import json
import time
import websockets

def create_req_body(r_id, method, params):
    data = {
        "jsonrpc": "2.0",
        "id": r_id,
        "method": method,
        "params": params
    }
    return json.dumps(data)

async def do_wss(url):
    req_json = create_req_body(1, "eth_subscribe", ["newHeads"])
    async with websockets.connect(url) as wss:
        await wss.send(req_json)
        subscription_response = await wss.recv()
        print(subscription_response)
        subscribe_result = json.loads(subscription_response)['result']
        req_json = create_req_body(2, "eth_unsubscribe", [subscribe_result])

        start_time = int(time.time())
        end_time = start_time + 5
        while end_time > int(time.time()):
            recv_data = await wss.recv()
            print(recv_data)
            print('\n')
        await wss.send(req_json)
        unsubscription_response = await wss.recv()
        print(unsubscription_response)


class TestWSS:

    def test_wss(self):
        url = '__url__'  # url string
        asyncio.get_event_loop().run_until_complete(do_wss(url))`;
