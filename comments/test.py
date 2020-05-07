# -*- coding: utf-8 -*-
#返回一段文本是积极的还是消极的
#@params: text
#@author: pyj 2017.03.24
#@return: 0~1 (语义积极的概率，越接近1情感表现越积极)

from snownlp import SnowNLP
import sys

file=open('comments.txt','r',encoding='UTF-8')
file2=open('score.txt','w',encoding='UTF-8')       
for line in file.readlines():    
     s = SnowNLP(line)
     s = round(s.sentiments,2)
     file2.write(str(s) + "#" + line)
file.close()
file2.close()