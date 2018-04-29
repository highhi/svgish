/* tslint:disable-next-line:no-implicit-dependencies */
import { ipcRenderer } from 'electron'
import * as React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import pure from 'recompose/pure'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'
import Grid from '../Grid/Grid'
import Switch, { OnToggle } from '../Switch/Switch'

interface IOptions {
  [key: string]: boolean
}

interface IOptionsState {
  options: IOptions
}

interface IWithHandlers {
  onToggle: OnToggle
}

interface IOptionsProps extends IOptionsState, IWithHandlers {
  setOptions(options: IOptions): void
}

const Row = Grid.extend`
  grid-template-columns: auto 1fr;
  align-items: center;
`

const Col = styled.div`
  padding: 4px 6px 4px 0;
  color: #333;
  line-height: 1;
`

function renderOptions(options: IOptions, onToggle: OnToggle): JSX.Element[] {
  return Object.keys(options).map((key, index) => {
    const enabled = options[key]

    return (
      <Row key={`${key}-${index}`}>
        <Col>
          <Switch name={key} enabled={enabled} onToggle={onToggle} />
        </Col>
        <Col>{key}</Col>
      </Row>
    )
  })
}

const enhance = compose<IOptionsProps, {}>(
  pure,
  withState<{}, IOptions, 'options', 'setOptions'>('options', 'setOptions', {}),
  withHandlers<IOptionsProps, IWithHandlers>({
    onToggle: () => (name, enabled) => {
      ipcRenderer.send('change-option', name, enabled)
    }
  }),
  lifecycle<IOptionsProps, IOptionsState>({
    componentDidMount() {
      this.props.setOptions(ipcRenderer.sendSync('get-options'))
      ipcRenderer.on('observe-option', (_: any, option: IOptions) => {
        const { options } = this.props
        this.props.setOptions({ ...options, ...option })
      })
    }
  })
)

const Options: React.SFC<IOptionsProps> = ({
  options,
  onToggle
}): JSX.Element => {
  return <div>{renderOptions(options, onToggle)}</div>
}

export default enhance(Options)
