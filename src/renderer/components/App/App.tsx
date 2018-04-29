import * as React from 'react'
import Dragabble from '../Dragabble/Dragabble'
import List from '../List/List'
import Main from '../Main/Main'
import Options from '../Options/Options'
import Side from '../Side/Side'
import Wrapper from '../Wrapper/Wrapper'

export default function App(): JSX.Element {
  return (
    <Wrapper>
      <Main>
        <Dragabble />
        <List />
      </Main>
      <Side>
        <Options />
      </Side>
    </Wrapper>
  )
}
