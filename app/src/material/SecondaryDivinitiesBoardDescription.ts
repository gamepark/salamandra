import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import SecondaryDivinitiesBoard from '../images/boards/SecondaryDivinitiesBoard.png'

class SecondaryDivinitiesBoardDescription extends BoardDescription {
  width = 16.65
  height = 10.65

  image = SecondaryDivinitiesBoard
  staticItem = { location: { type: LocationType.SecondaryDivinitiesLayout } }
}

export const secondaryDivinitiesBoardDescription = new SecondaryDivinitiesBoardDescription()
