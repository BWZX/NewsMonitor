#!/usr/bin/python  
# -*- coding: utf-8 -*-  

import pymongo
from pymongo import MongoClient
__client = MongoClient('mongodb://admin:%2B@node0:27017')
db_news =__client.newsMonitor.news
db_ent = __client.newsMonitor.ent
db_sports = __client.newsMonitor.sports
db_financ = __client.newsMonitor.finance
db_tech =__client.newsMonitor.tech
db_games = __client.newsMonitor.games
db_auto = __client.newsMonitor.auto
db_edu = __client.newsMonitor.edu
db_house = __client.newsMonitor.house