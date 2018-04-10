import { ipcRenderer } from 'electron';
import { h, Component } from 'preact';
import Row from '../Row/Row';
import Col from '../Col/Col';
import Switch from '../Switch/Switch';
const style = require('./style.css');

export default class Option extends Component {
  onToggle = (event, enabled) => {
    const { optionName } = this.props;
    ipcRenderer.send('toggled', optionName, enabled);
  }

  render(props) {
    return(
      <Row class={style.option}>
        <Col class={style['option-desc']}>{props.optionDescription}</Col>
        <Col class={style['option-switch']}><Switch onToggle={this.onToggle} /></Col>
      </Row>
    );
  }
}