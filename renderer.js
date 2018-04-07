const { ipcRenderer } = require('electron'); 

const TYPE_SVG = '/svg+xml';

document.getElementById('js-drag').addEventListener('dragover', event => {
  event.preventDefault();
});

document.getElementById('js-drag').addEventListener('drop', event => {
  event.preventDefault();
  const svgs = Array.from(event.dataTransfer.files)
    .filter(file => file.type.includes('/svg+xml'))
    .map(file => ({ name: file.name, path: file.path }));

  ipcRenderer.send('drop', svgs);
});

ipcRenderer.on('fileread', (event, svg) => {
  console.log(svg);
});