import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  children?: React.ReactNode
}

const Div = styled.div`
  padding: 4px 12px;
`

const Col: React.SFC<IProps> = (props: IProps): JSX.Element => {
  return <Div>{props.children}</Div>
}

export default Col
