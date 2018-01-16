from ghost import Ghost
from pyquery import PyQuery as pq
from mongoconnect import *

KEY_WORD = 'news'
exec('database=db_'+KEY_WORD)

g=Ghost()
s=g.start(display=True)

def crawl_page(s):
    #select data
    ct = s.content
    d=pq(ct)
    ul = d('div.listInfo ul.titMode')
    cell=[]
    print('crawl page ing')
    for li in ul('li').items():
        href = li('a').attr('href')
        subclass = li('a strong').text()
        title = li('a span.txt').text()
        time = li('a span.time').text()
        cell.append({'_id': 'hash value','subcls': subclass, 'title': title, 'time': time, 'href': href})
    database.insert(cell)
    # print(cell)
    #if it has next page, into next    
    if s.exists('li a.next'):
        s.click('li a.next', btn=0)
        print('next page of the date')
        s.wait_for_page_loaded()
        s.show()
        crawl_page(s)
    else:
        return
    
    pass

s.open('http://'+KEY_WORD+'.qq.com/articleList/rolls/')
# s.content.encode('utf-8')
# print(s.content)
while True:   
    print('new date')   
    ct = s.content
    d=pq(ct)
    ll = d('div.CalendarCon tr td a')
    if len(ll) <=0:
        print('complete.')
        s.exit()
        break
    first = 1    
    for i in range(10):
        if not d('div.CalendarCon div tr td').eq(i).text():
            first +=1
        else:
            break

    for i in range(first,8):
        s.click('div.CalendarCon div table tbody tr td:nth-of-type('+str(i)+') a', btn=0)
        s.wait_for_page_loaded()
        s.show()
        # crawl_page(s)
        s.sleep(5)
    gg=6-first
    for i in range(2,len(ll)-gg):
        # print('div.CalendarCon div tbody tr td:nth-child(' + str(i) + ') a')
        s.click('div.CalendarCon div table tbody tr:nth-child('+str(i)+') td a', btn=0)
        s.wait_for_page_loaded()
        s.show()
        # crawl_page(s)
        s.sleep(5)
    
    s.click('div.CalendarHead table tbody tr td:nth-child(2) a', 0)
    s.wait_for_page_loaded()
    s.show()
    s.sleep(5)
    

    #if no next page, click next date, and then call itself.

