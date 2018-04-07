import { observable, action } from 'mobx';

class FileListStore {
  @observable files = [];

  @action addFile = file => {
    this.files.push(file);
  }

  @action clear = () => {
    this.files = [];
  }
}

export default new FileListStore();
