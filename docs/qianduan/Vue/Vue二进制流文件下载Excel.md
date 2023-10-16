# vue二进制流文件下载Excel(携带token)

## responseType要设置为 ‘blob’
```javaScript
// 下载接口
export const downcsv = (data) => {
    return service({
      url: '/downcsv',
      method: 'get',
      data: data,
      responseType: 'blob'
    })
}
```
## 下载代码
```javaScript
 downloadFile(params) {
      downcsv(params).then((data) => {
         let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
         const fileName = (this.publisher || '全部')+ '销售 ' + params.startdate + '至' + params.enddate
         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             window.navigator.msSaveOrOpenBlob(blob, fileName)
         } else {
             let objectUrl = (window.URL || window.webkitURL).createObjectURL(blob)
             let downFile = document.createElement('a')
             downFile.style.display = 'none'
             downFile.href = objectUrl
             downFile.download = fileName // 下载后文件名
             document.body.appendChild(downFile)
             console.dir(downFile);
             downFile.click()
             document.body.removeChild(downFile)
             window.URL.revokeObjectURL(objectUrl) 
         }
     }).finally(() => {
         this.loading = false;
     })
 },
```
## 知识扩展
文件上传后缀名与文件类型对照表
```javaScript
1、xls
application/vnd.ms-excel
2、xlsx
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
3、ppt
application/vnd.ms-powerpoint
4、pptx
application/vnd.openxmlformats-officedocument.presentationml.presentation
5、doc
application/msword
6、docx
application/vnd.openxmlformats-officedocument.wordprocessingml.document
7、zip
application/x-zip-compressed
8、rar
application/x-zip-compressed
9、wmv
video/x-ms-wmv
10、mp3
audio/mpeg
11、mp4
video/mp4
12、gif
image/gif
13、jpg
image/jpeg
14、png
image/png
15、bmp
image/bmp
16、psd
application/octet-stream
17、ico
image/x-icon
18、7z
application/octet-stream
19、exe
application/octet-stream
20、avi
video/avi
21、rmvb
application/vnd.rn-realmedia-vbr
22、3gp
application/octet-stream
23、flv
application/octet-stream
24、wav
audio/wav
25、krc
application/octet-stream
26、lrc
application/octet-stream
27、txt
text/plain
28、pdf
application/pdf
29、chm
application/octet-stream
30、mdb
application/msaccess
31、sql
application/octet-stream
32、con
application/octet-stream
33、log
text/plain
34、dat
application/octet-stream
35、ini
application/octet-stream
36、php
application/octet-stream
37、html 和 htmhtm
text/html
38、ttf
application/octet-stream
39、fon
application/octet-stream
40、js
application/x-javascript
41、xml
text/xml
42、dll
application/octet-stream
```