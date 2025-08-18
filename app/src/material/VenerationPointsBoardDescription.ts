import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import VenerationPointsBoard from '../images/boards/VenerationPointsBoard.png'

class VenerationPointsBoardDescription extends BoardDescription {
  width = 40
  height = 20

  image = VenerationPointsBoard
  staticItem = { location: { type: LocationType.VenerationPointsLayout } }
}

export const venerationPointsBoardDescription = new VenerationPointsBoardDescription()
