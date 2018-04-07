import { h, Component } from 'preact';
import { observable, action } from 'mobx';
import Header from '../Header/Header';
import Droppable from '../Droppable/Droppable';
import FileList from '../Filelist/Filelist';
import fileListStore from '../../store/file-list-store';
require('./style.css');

export default function App() {
  return <div>
    <Header />
    <Droppable />
    <FileList store={fileListStore} />
  </div>;
}