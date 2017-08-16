fis3-prepackager-file-hash
=====================

fis3 文件中获取当前文件hash值或指定文件hash值

## 安装

```html
  npm install fis3-prepackager-file-hash --save
```

## 使用方法

### 配置

```js
fis.match('::package', {
  prepackager: fis.plugin('file-hash')
})
```

### 文件中使用

```js
var thisFileHash = '__fileHash__';
var thatFileHash = '__fileHash__(/test.js)__';  // 相对于开发目录路径
```



