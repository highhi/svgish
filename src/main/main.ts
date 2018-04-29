'use strict'

import * as storage from '@highhi/electron-json-storage-promise'
import bytes = require('bytes')
/* tslint:disable-next-line:no-implicit-dependencies */
import { app, BrowserWindow, ipcMain } from 'electron'
import * as fs from 'fs-extra'
import * as path from 'path'
import SVGO = require('svgo')
import trush = require('trash')
import * as url from 'url'

const STOREAGE_KEY = 'svgish-options-v2'
const defaultOption = {
  cleanupAttrs: true,
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeTitle: true,
  removeDesc: true,
  removeUselessDefs: true,
  removeEditorsNSData: true,
  removeEmptyAttrs: true,
  removeHiddenElems: true,
  removeEmptyText: true,
  removeEmptyContainers: true,
  removeViewBox: false,
  cleanUpEnableBackground: true,
  convertStyleToAttrs: true,
  convertColors: true,
  convertPathData: true,
  convertTransform: true,
  removeUnknownsAndDefaults: true,
  removeNonInheritableGroupAttrs: true,
  removeUselessStrokeAndFill: true,
  removeUnusedNS: true,
  cleanupIDs: true,
  cleanupNumericValues: true,
  moveElemsAttrsToGroup: true,
  moveGroupAttrsToElems: true,
  collapseGroups: true,
  removeRasterImages: false,
  mergePaths: true,
  convertShapeToPath: true,
  sortAttrs: true,
  transformsWithOnePath: false,
  removeDimensions: true
}

let svgo: SVGO
let mainWindow: Electron.BrowserWindow | null

async function createWindow(): Promise<void> {
  if (!storage.has(STOREAGE_KEY)) {
    storage
      .set(STOREAGE_KEY, defaultOption)
      .then(options => {
        svgo = initSvgo(options)
      })
      .catch(err => {
        throw err
      })
  } else {
    storage
      .get(STOREAGE_KEY)
      .then(options => {
        svgo = initSvgo(options)
      })
      .catch(err => {
        throw err
      })
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#20262e',
    titleBarStyle: 'hidden-inset'
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
    svgo = null
  })

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
      return
    }
    app.quit()
  })

  app.on('activate', () => {
    if (mainWindow !== null) {
      return
    }
    createWindow()
  })
}

app.on('ready', createWindow)

async function outputFile(path: string, data: string): Promise<void> {
  await trush([path])
  return fs.outputFile(path, data, 'utf8')
}

interface IProps {
  name: string
  path: string
  size: number
}

interface IOptimaizedProps {
  name: string
  before: string
  after: string
  profit: string
}

async function optimaize({
  name,
  path,
  size
}: IProps): Promise<IOptimaizedProps> {
  try {
    const content = await fs.readFile(path, 'utf8')
    const { data } = await svgo.optimize(content)

    await outputFile(path, data)

    const optimaizedSize = (await fs.stat(path)).size
    const profit = `${Math.round(100 / size * (size - optimaizedSize))}%`
    const before = bytes(size)
    const after = bytes(optimaizedSize)
    return { name, before, after, profit }
  } catch (err) {
    return Promise.reject(err)
  }
}

interface ISvgoOptions {
  [key: string]: boolean
}

function convertOptionsForSvgo(options: ISvgoOptions): ISvgoOptions[] {
  const converted = []
  for (const key of Object.keys(options)) {
    converted.push({ [key]: options[key] })
  }
  return converted
}

function initSvgo(options: ISvgoOptions) {
  return new SVGO({ plugins: convertOptionsForSvgo(options) as any })
}

ipcMain.on('ondrop', async (event: Electron.Event, props: IProps[]) => {
  try {
    const data = await Promise.all(props.map(prop => optimaize(prop)))
    event.sender.send('optimaized', data)
  } catch (err) {
    event.sender.send('optimaized', {}, err)
  }
})

ipcMain.on(
  'change-option',
  async (event: Electron.Event, optionName: string, enabled: boolean) => {
    const option = { [optionName]: enabled }
    const options = await storage.set(STOREAGE_KEY, option)
    svgo = initSvgo(options)
    event.sender.send('observe-option', option)
  }
)

ipcMain.on('get-options', async (event: Electron.Event) => {
  const options = await storage.get(STOREAGE_KEY)
  event.returnValue = options
})
