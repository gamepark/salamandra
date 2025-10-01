import { MoneyDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import CristalToken1 from '../images/tokens/CristalToken1.png'
import { CrystalTokenHelp } from './help/CrystalTokenHelp'

class CrystalTokenDescription extends MoneyDescription {
  width = 1.8
  height = 1.6

  transparency = true

  image = CristalToken1

  stockLocation = { type: LocationType.CristalTokenStock }
  staticItem = { quantity: 15, location: this.stockLocation }

  help = CrystalTokenHelp
}

export const crystalTokenDescription = new CrystalTokenDescription()
