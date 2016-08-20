var adit = new Adit('#canvas');

document.querySelector('#file').addEventListener('change', function() {
  adit.preview(this.files[0]);
});

document.querySelector('#adit').addEventListener('click', function() {
  adit.adit();
});

document.querySelector('#download').addEventListener('click', function() {
  this.href = adit.getDataURL();
  this.download = 'composite.png';
});

document.querySelector('#upload').addEventListener('click', function() {
  adit.upload('http://127.0.0.1:8080/api/adopt', function() {
    if(this.readyState == 4) {
      console.log('uploaded');
    }
  });
});
