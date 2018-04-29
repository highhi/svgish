import * as React from 'react'
import Grid from '../Grid/Grid'

interface IProps {
  children?: React.ReactNode
}

const Div = Grid.extend`
  grid-template-columns: 1fr 15% 15% 15%;
`

const Row: React.SFC<IProps> = (props: IProps): JSX.Element => {
  return <Div>{props.children}</Div>
}

export default Row
