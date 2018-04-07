import { h } from 'preact';
import cx from 'classnames';
const style = require('./style.css');

export default function Row(props) {
  return(
    <div class={cx(style.row, props.class)}>{props.children}</div>
  );
}