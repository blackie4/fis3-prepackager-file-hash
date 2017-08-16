
var reg1 = /('|")__fileHash__\((\/[^\\?\\*\\|<>:"]+)\)__\1/mg;
var reg2 = /('|")__fileHash__\1/mg;

module.exports = function (ret, pack, settings, opt) {
  fis.util.map(ret.src, function (subpath, file) {
    var content = file.getContent();
    if (content.replace) {
      // 指定文件hash
      content = content.replace(reg1, function (str, quote, filePath) {
        var resFile = getMapFile(filePath);
        if (!resFile) return str;
        return quote + resFile.getHash() + quote;
      });
      // 当前文件hash
      content = content.replace(reg2, function (str, quote) {
        return quote + file.getHash() + quote;
      })
      file.setContent(content);
    }
  });
};

function getMapFile(filePath) {
  var file = ret.pkg[filePath] || ret.src[filePath];
  var v_path = "";
  if (!file) {
    for (var k in ret.pkg) {
      v_path = ret.pkg[k].domain + (ret.pkg[k].url ? ret.pkg[k].url : ret.pkg[k].release);
      if (v_path === filePath) {
        return ret.pkg[k];
      }
    }
    for (var k in ret.src) {
      v_path = ret.src[k].domain + (ret.src[k].url ? ret.src[k].url : ret.src[k].release);
      if (v_path === filePath) {
        return ret.src[k];
      }
    }
  }
  return file;
}
