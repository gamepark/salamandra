import { TokenDescription } from '@gamepark/react-game'
import { CrystalToken } from '@gamepark/salamandra/material/CrystalToken'
import CristalToken1 from '../images/tokens/CristalToken1.png'
import CristalToken5 from '../images/tokens/CristalToken1.png'

class CrystalTokenDescription extends TokenDescription {
  width = 0.36
  height = 0.32

  images = {
    [CrystalToken.Crystal1]: CristalToken1,
    [CrystalToken.Crystal5]: CristalToken5
  }
}

export const crystalTokenDescription = new CrystalTokenDescription()
