
# encoding:utf-8

import requests
import base64

'''
菜品识别
'''

request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish"
# 二进制方式打开图片文件
f = open('E:\\CAL_\\testing_img\FIRED-CHICKEN.jpg', 'rb')
img = base64.b64encode(f.read())

params = {"image":img,"top_num":5}
access_token = '[24.f894248a0ca56e3d580b91a1b1600f53.2592000.1747624424.282335-118555727]'
request_url = request_url + "?access_token=" + access_token
headers = {'content-type': 'application/x-www-form-urlencoded'}
response = requests.post(request_url, data=params, headers=headers)
if response:
    print (response.json())
