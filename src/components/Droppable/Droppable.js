import { h, Component } from 'preact';
import { ipcRenderer } from 'electron';
import fileListStore from '../../store/file-list-store';
const style = require('./style.css');

export default class Droppable extends Component {
  onDragOver = event => {
    event.preventDefault();
  }

  onDrop = event => {
    event.preventDefault();
    Array.from(event.dataTransfer.files).forEach(file => {
      ipcRenderer.send('drop', file.name, file.path, file.size);
    });
  }

  render() {
    return <div onDrop={this.onDrop} onDragOver={this.onDragOver} class={style.droparea}></div>;
  }
}

