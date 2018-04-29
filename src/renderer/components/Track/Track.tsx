import styled from 'styled-components'
import { Enabled } from '../Switch/Switch'

interface ITrackPrps {
  enabled: Enabled
}

const Track = styled.div`
  width: 36px;
  height: 20px;
  border-radius: 30px;
  background-color: ${(props: ITrackPrps) =>
    props.enabled ? '#0084ff' : '#4d4d4d'};
  transition: all 0.2s ease;
`

export default Track
