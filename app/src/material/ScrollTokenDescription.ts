import { TokenDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import ScrollToken from '../images/tokens/ScrollToken.png'
import { ScrollTokenHelp } from './help/ScrollTokenHelp'

class ScrollTokenDescription extends TokenDescription {
  width = 0.34 * 3.5
  height = 0.91 * 3.5

  transparency = true

  image = ScrollToken

  help = ScrollTokenHelp

  stockLocation = { type: LocationType.ScrollTokenStock }
  staticItem = { quantity: 15, location: this.stockLocation }
}

export const scrollTokenDescription = new ScrollTokenDescription()
