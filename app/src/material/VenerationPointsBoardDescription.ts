import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import MajoritiesHelp from '../images/boards/MajoritiesHelp.jpg'
import { VenerationPointsBoardHelp } from './help/VenerationPointsBoardHelp.tsx'

class VenerationPointsBoardDescription extends BoardDescription {
  width = 6.7 * 2
  height = 1.2 * 2
  borderRadius = 0.5
  image = MajoritiesHelp
  staticItem = { location: { type: LocationType.VenerationPointsLayout } }
  help = VenerationPointsBoardHelp
}

export const venerationPointsBoardDescription = new VenerationPointsBoardDescription()
