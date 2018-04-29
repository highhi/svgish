/* tslint:disable-next-line:no-implicit-dependencies */
import { ipcRenderer } from 'electron'
import * as React from 'react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'

type ReactDragEvent = React.DragEvent<HTMLDivElement>

interface IWithState {
  readonly draggable: boolean
  setDragging(draggable: boolean): boolean
}

interface IWithHandlers {
  handleOnDragEnter(event: ReactDragEvent): boolean
  handleOnDragLeave(event: ReactDragEvent): boolean
  handleOnDrop(event: ReactDragEvent): void
  handleOnDragOver(event: ReactDragEvent): void
}

interface IDraggableProps extends IWithState, IWithHandlers {}

interface IFileProp {
  name: string
  path: string
  size: number
}

function extractFileProps(fileList: FileList): IFileProp[] {
  const props = []
  const files = Array.from(fileList)

  for (const file of files) {
    props.push({ name: file.name, path: file.path, size: file.size })
  }

  return props
}

const enhance = compose<IDraggableProps, {}>(
  withState<IWithState, boolean, 'draggable', 'setDragging'>(
    'draggable',
    'setDragging',
    false
  ),
  withHandlers<IWithState, IWithHandlers>({
    handleOnDragEnter: ({ setDragging }) => (event: ReactDragEvent) => {
      event.preventDefault()
      return setDragging(true)
    },
    handleOnDragLeave: ({ setDragging }) => (event: ReactDragEvent) => {
      event.preventDefault()
      return setDragging(false)
    },
    handleOnDrop: () => (event: ReactDragEvent): void => {
      event.preventDefault()
      ipcRenderer.send('ondrop', extractFileProps(event.dataTransfer.files))
    },
    handleOnDragOver: () => (event: ReactDragEvent) => {
      event.preventDefault()
    }
  })
)

const Div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
`

const Dragabble: React.SFC<IDraggableProps> = ({
  draggable,
  handleOnDragEnter,
  handleOnDragLeave,
  handleOnDrop,
  handleOnDragOver
}): JSX.Element => {
  return (
    <Div
      draggable={draggable}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    />
  )
}

export default enhance(Dragabble)
