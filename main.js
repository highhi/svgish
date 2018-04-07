'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const Svgo = require('svgo');
const fs = require('fs-extra');
const trush = require('trash');
const bytes = require('bytes');

// try {
// 	require('electron-reloader')(module);
// } catch (err) {
//   throw new Error(err);
// }

const svgo = new Svgo({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanUpEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    transformsWithOnePath: false,
  },{
    removeDimensions: true,
  },{
    removeAttrs: {attrs: '(stroke|fill)'},
  }]
});

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#20262e',
    titleBarStyle: 'hidden-inset',
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => (mainWindow = null));

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return;
    app.quit();
  });

  app.on('activate', () => {
    if (mainWindow !== null) return;
    createWindow();
  });
}

app.on('ready', createWindow);

async function outputFile(content, path) {
  try {
    await trush([path]);
    await fs.outputFile(path, content, 'utf8');
    return fs.stat(path);
  } catch(err) {
    return Promise.reject(err);
  }
}

async function optimaize(path) {
  try {
    const content = await fs.readFile(path, 'utf8');
    const { data } = await svgo.optimize(content);
    return outputFile(data, path);
  } catch(err) {
    return Promise.reject(err);
  }
}

ipcMain.on('drop', async (event, name, path, size) => {
  const optimaizedSize = (await optimaize(path)).size;
  const profit = `${Math.round(100 / size * (size - optimaizedSize))}%`;
  const before = bytes(size);
  const after = bytes(optimaizedSize);
  event.sender.send('optimaized', { name, before, after, profit });
});