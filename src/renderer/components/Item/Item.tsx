import * as React from 'react'
import Col from '../Col/Col'
import Row from '../Row/Row'

export interface IItemProps {
  name: string
  before: string
  after?: string
  profit?: string
  children?: React.ReactNode
}

const Item: React.SFC<IItemProps> = (props: IItemProps) => {
  return (
    <Row>
      <Col>{props.name}</Col>
      <Col>{props.before}</Col>
      <Col>{props.after}</Col>
      <Col>{props.profit}</Col>
    </Row>
  )
}

export default Item
