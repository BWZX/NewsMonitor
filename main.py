import aiohttp
import asyncio
import config
import processData as pd
import sys

async def fetchData(word):
    conn = aiohttp.TCPConnector(limit=config.REQ_AMOUNTS)    
    s = aiohttp.ClientSession(headers = config.HEADERS, connector=conn)
    output = await pd.baidu(s, word)

if __name__ == '__main__':
    assert(len(sys.argv)>=3)
    words = sys.argv[2:]
    loop = asyncio.get_event_loop()
    tasks = [fetchData(word) for word in words]    
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close() 
