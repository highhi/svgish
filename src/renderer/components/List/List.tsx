/* tslint:disable-next-line:no-implicit-dependencies */
import { ipcRenderer } from 'electron'
import * as React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import Header from '../Header/Header'
import Item, { IItemProps } from '../Item/Item'

type TItems = IItemProps[]

export interface IListState {
  items: TItems
}

export interface IListProps extends IListState {
  setItems(items: TItems): void
}

function renderItems(items: TItems): JSX.Element[] {
  return items.map((item, index) => (
    <Item key={`${item.name}-${index}`} {...item} />
  ))
}

const enhance = compose<IListProps, {}>(
  pure,
  withState<IListState, TItems, 'items', 'setItems'>('items', 'setItems', []),
  lifecycle<IListProps, IListState>({
    componentDidMount() {
      ipcRenderer.on('optimaized', (_: any, data: TItems, err: Error) => {
        if (err) {
          throw err
        }
        this.props.setItems(this.props.items.concat(data))
      })
    }
  })
)

const List: React.SFC<IListProps> = ({ items }: IListProps) => {
  return (
    <>
      <Header />
      {renderItems(items)}
    </>
  )
}

export default enhance(List)
