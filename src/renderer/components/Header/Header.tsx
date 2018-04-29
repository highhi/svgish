import * as React from 'react'
import styled from 'styled-components'
import Col from '../Col/Col'
import Row from '../Row/Row'

const ListHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: 30px;
  background-color: #1c2128;
`

const Header: React.SFC = () => {
  return (
    <ListHeader>
      <Row>
        <Col>File</Col>
        <Col>Before</Col>
        <Col>After</Col>
        <Col>Profit</Col>
      </Row>
    </ListHeader>
  )
}

export default Header
