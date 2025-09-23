import { CardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import SalamanderTempleTile from '../images/tiles/SalamanderTempleTile.png'

class SalamanderTempleTileDescription extends CardDescription {
  width = 18.2
  height = 9.2

  transparency = true

  image = SalamanderTempleTile

  staticItem = { location: { type: LocationType.GameLayout, x: 0.5, y: 0 } }
}

export const salamanderTempleTileDescription = new SalamanderTempleTileDescription()
