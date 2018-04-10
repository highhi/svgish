import { h, Component } from 'preact';
import cx from 'classnames';
const style = require('./style.css');

export default class Switch extends Component {
  state = { enabled: true };

  onToggle = event => {
    event.preventDefault();

    const enabled = !this.state.enabled;
    this.props.onToggle && this.props.onToggle(event, enabled);
    this.setState({ enabled });
  }

  render(_, state) {
    const styleThumb = cx(style['switch-thumb'], {
      [style['switch-thumb--checked']]: state.enabled,
    });

    const styleTrack = cx(style['switch-track'], {
      [style['switch-track--checked']]: state.enabled,
    });

    return(
      <div class={style['switch']}>
        <div class={styleTrack}></div>
        <a class={styleThumb} onClick={this.onToggle} ></a>
      </div>
    );
  }
}