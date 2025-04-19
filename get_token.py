import requests

def get_access_token(api_key, secret_key):
    url = "https://aip.baidubce.com/oauth/2.0/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": api_key,
        "client_secret": secret_key
    }
    response = requests.post(url, data=data)
    return response.json().get("access_token")

# 使用示例
access_token = get_access_token("BvUsRWMK3CnFQdjGbrwCl9RF", "pL7Mao1qOlQvPcxRo89lkcD7KqE8rr0T") # AK SK
print("获取到的Access Token:", access_token)

# Token: 24.1c6c3a889c7f623cf97526d2c3ae2d7c.2592000.1747633589.282335-118555727