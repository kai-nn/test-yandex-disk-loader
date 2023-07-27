import requests

url = 'https://cloud-api.yandex.net/v1/disk/resources/upload?path=downloader'
# payload = open("request.json")
headers = {"Authorization": "OAuth y0_AgAAAAAJlBpGAAo-ZQAAAADoxIp3GyjgfFmASjeWLVvPU8BgIpk0Wv4"}
r = requests.get(url, headers=headers)


print(r)