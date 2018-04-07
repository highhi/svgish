import { h } from 'preact';
import Row from '../Row/Row';
import Col from '../Col/Col';
const style = require('./style.css');

export default function Header() {
  return(
    <Row class={style.header}>
      <Col>File</Col>
      <Col>Before</Col>
      <Col>After</Col>
      <Col>Profit</Col>
    </Row>
  );
}