import { MoneyDescription } from '@gamepark/react-game'
import { CrystalToken } from '@gamepark/salamandra/material/CrystalToken'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import CristalToken1 from '../images/tokens/CristalToken1.png'
import CristalToken5 from '../images/tokens/CristalToken1.png'

class CrystalTokenDescription extends MoneyDescription {
  width = 1.8
  height = 1.6

  images = {
    [CrystalToken.Crystal1]: CristalToken1,
    [CrystalToken.Crystal5]: CristalToken5
  }

  stockLocation = { type: LocationType.CristalTokenStock }

  staticItems = [
    { id: CrystalToken.Crystal1, quantity: 30, location: this.stockLocation },
    { id: CrystalToken.Crystal5, quantity: 12, location: this.stockLocation }
  ]
}

export const crystalTokenDescription = new CrystalTokenDescription()
