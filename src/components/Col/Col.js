import { h } from 'preact';
import cx from 'classnames';
const style = require('./style.css');

export default function Col(props) {
  return (
    <div class={cx(style.col, props.class)}>{props.children}</div>
  );
}