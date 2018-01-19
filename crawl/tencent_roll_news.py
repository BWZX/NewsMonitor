#!/usr/bin/python  
# -*- coding: utf-8 -*-  

import urllib, urllib.request
from pyquery import PyQuery as pq
from mongoconnect import *
import hashlib
from hdfs import Config

client = Config().get_client('dev')
KEY_WORD = 'news'
exec('database=db_'+KEY_WORD)

def fetchData(item):    
    request=urllib.request.Request(item['href'])  
    result=urllib.request.urlopen(request, timeout=25)
    if result.code == 200 or 204:
        ts = str(result.read(),encoding='gbk')
        d=pq(ts)
        d=d('div#content')
        head = d('div.hd h1')
        clas = d('div.a_Info span.a_catlog').text()
        source = d('div.a_Info span.a_source').text()
        time = d('div.a_Info span.a_time').text()
        print(time)
        body = d('div#Cnt-Main-Article-QQ').text()
        hashid=hashlib.md5((item['title']+item['time']).encode()).hexdigest()
        #mongo updata class and source,
        database.update({'_id': hashid}, {'$set':{'source': source, 'category': clas, 'time': time}})
        client.write('/'+KEY_WORD + '/'+ str(hashid), data=body, encoding='utf-8')
    else:
        print('request fail.')
        return 

if __name__ == '__main__':
    for it in database.find():
        print(it)
        fetchData(it)
