import * as React from 'react'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import Thumb from '../Thumb/Thumb'
import Track from '../Track/Track'

export type ReactMouseEvent = React.MouseEvent<HTMLDivElement>
export type Enabled = boolean
export type OnToggle = (name: string, enabled: boolean) => void

interface ISwitchProps {
  name: string
  enabled: Enabled
  onToggle: OnToggle
}

interface IWithHandlers {
  handleOnClick(event: ReactMouseEvent): void
}

const Div = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  line-height: 1;
`

const enhance = withHandlers<ISwitchProps, IWithHandlers>({
  handleOnClick: props => (event: ReactMouseEvent) => {
    event.preventDefault()
    props.onToggle(props.name, props.enabled)
  }
})

const Switch: React.SFC<ISwitchProps & IWithHandlers> = (
  props
): JSX.Element => {
  return (
    <Div>
      <Track enabled={props.enabled} />
      <Thumb enabled={props.enabled} onClick={props.handleOnClick} />
    </Div>
  )
}

export default enhance(Switch)
