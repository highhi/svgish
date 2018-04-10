import { h, Component } from 'preact';
import cx from 'classnames';
import Row from '../Row/Row';
import Col from '../Col/Col';
import Option from '../Option/Option';
const style = require('./style.css');

export default function Options() {
  return(
    <div class={style['options']}>
      <Option optionName="cleanupAttrs" optionDescription="cleanup attributes from newlines, trailing, and repeating spaces" />
    </div>
  );
}