import styled from 'styled-components'
import { Enabled } from '../Switch/Switch'

interface IThumbProps {
  enabled: Enabled
}

const Thumb = styled.div`
  display: inline-block;
  position: absolute;
  top: 1px;
  left: ${(props: IThumbProps) => (props.enabled ? '1px' : '17px')};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.25s ease;
`

export default Thumb
