import { h, Component } from 'preact';
import { observer } from 'mobx-preact';
import { ipcRenderer } from 'electron';
import fileListStore, { convertForStore } from '../../store/file-list-store';
import File from '../FIle/File';
const style = require('./style.css');

ipcRenderer.on('optimaized', (_, file) => {
  fileListStore.addFile(file);
});

@observer
export default class Filelist extends Component {
  renderFiles = () => {
    return this.props.store.files.map((file, index) => <File key={index} {...file} />);
  }

  render() {
    return <div class={style.filelist}>{this.renderFiles()}</div>;
  }
}