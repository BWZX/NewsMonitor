#here is config for the spider

#is it mysql require?
MYSQL = True

#largest concurency requests amout
REQ_AMOUNTS = 1000000

#############- your config items -########################

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36"
}

##########################################################
#需要处理的网站 以及对应的处理方法 网址 等。方法名誉网站名相同
level1_sites = {  #大媒体，大门户网站
    #搜索引擎
    'baidu': 'https://www.baidu.com/',
    'sougou': 'https://www.sogou.com/',
    'weixin': 'http://weixin.sogou.com/',
    'toutiao': 'https://www.toutiao.com',
    'weibo': 'http://s.weibo.com/list/relpage?search=',
    
    #门户
    'touTiao': 'https://www.toutiao.com',
    'souHu': 'http://www.sohu.com',
    'xinLang': '*.sina.com.cn',
    'wangYi': '*.163.com',
    'weiBo': 'https://weibo.com/ttarticle/p/show?id=',
    'tengXun': '*.qq.com'
}

level2_sites={ #中小门户网站以及搜索引擎

}

level3_sites={ #个人监控

}
 