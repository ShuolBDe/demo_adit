!function(globle){
  var STYLE = {adscale: 0.5, imgscale: 1, opacity: 0.65};
  var adImg = new Image();
  adImg.src = 'static/resource/ad.jpg';
  function Adit(selector) {
    this.canvas = getCanvas(selector);
    this.ctx = this.canvas.getContext('2d');
  }
  Adit.prototype.getCanvas = function() {
    return this.canvas;
  };
  Adit.prototype.getCxt = function() {
    return this.ctx;
  };
  Adit.prototype.reset = function(selector) {
    this.canvas = getCanvas(selector);
    this.ctx = this.canvas.getContext('2d');
  };
  Adit.prototype.preview = function(file) {
    if(!file) throw TypeError('argument expect as a file');
    var img = new Image();
    var self = this;
    file2DataUrl(file).then((dataUrl) => {
      img.src = dataUrl;
    });
    img.onload = () => {
      var height = self.canvas.height;
      self.resize(img.width * STYLE.imgscale, img.height * STYLE.imgscale);
      self.ctx.drawImage(img, 0, 0, img.width * STYLE.imgscale, img.height * STYLE.imgscale);
    };
  };
  Adit.prototype.resize = function(width, height) {
    var canvas = this.getCanvas();
    canvas.width = width;
    canvas.height = height;
  };
  Adit.prototype.adit = function() {
    this.ctx.globalAlpha = STYLE.opacity;
    this.ctx.drawImage(adImg, this.canvas.width - adImg.width * STYLE.adscale, 0, adImg.width * STYLE.adscale, adImg.height * STYLE.adscale);
    this.ctx.globalAlpha = 1;
  };
  Adit.prototype.getDataURL = function() {
    return adit.canvas.toDataURL();
  };
  Adit.prototype.upload = function(url, handler) {
    var xhr = getXHR(url, handler),
      formData = new FormData();
    this.canvas.toBlob((blob) => {
      var file = new File([blob], 'image/png');
      formData.append('file', file);
      xhr.send(formData);
    }, 'image/png');
  };
  Adit.prototype.editStyle = function(style) {
    for(var prop in style) {
      prop in STYLE && style[prop] && (STYLE[prop] = style[prop]);
    }
  }

  function getXHR(url, handler) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handler;
    xhr.open('POST', url);
    // xhr.setRequestHeader('Content-Type', 'image/png');
    return xhr;
  }
  function getCanvas(selector) {
    var target = document.querySelector(selector);
    if(!target) {
      throw Error('There\'s no elements exists!');
    } else if(target.nodeName !== 'CANVAS'){
      throw TypeError('Target must be a canvas');
    }
    return target;
  }

  function file2DataUrl(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }
  globle.Adit = Adit;
}(window);
