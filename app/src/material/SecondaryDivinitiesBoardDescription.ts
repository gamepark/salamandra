import { BoardDescription } from '@gamepark/react-game'
import SecondaryDivinitiesBoard from '../images/boards/SecondaryDivinitiesBoard.png'

class SecondaryDivinitiesBoardDescription extends BoardDescription {
  width = 5.55
  height = 3.55

  image = SecondaryDivinitiesBoard
}

export const secondaryDivinitiesBoardDescription = new SecondaryDivinitiesBoardDescription()
