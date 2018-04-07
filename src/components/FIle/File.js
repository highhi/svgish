import { h, Component } from 'preact';
import { observer } from 'mobx-preact';
import Row from '../Row/Row';
import Col from '../Col/Col';
const style = require('./style.css');

export default function File(props) {
  return(
    <Row class={style.header}>
      <Col>{props.name}</Col>
      <Col>{props.before}</Col>
      <Col>{props.after}</Col>
      <Col>{props.profit}</Col>
    </Row>
  );
}