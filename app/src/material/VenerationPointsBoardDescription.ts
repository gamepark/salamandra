import { BoardDescription } from '@gamepark/react-game'
import VenerationPointsBoard from '../images/boards/VenerationPointsBoard.png'

class VenerationPointsBoardDescription extends BoardDescription {
  width = 11
  height = 5.55

  image = VenerationPointsBoard
}

export const venerationPointsBoardDescription = new VenerationPointsBoardDescription()
