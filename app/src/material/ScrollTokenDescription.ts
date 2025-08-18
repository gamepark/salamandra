import { TokenDescription } from '@gamepark/react-game'
import ScrollToken from '../images/tokens/ScrollToken.png'

class ScrollTokenDescription extends TokenDescription {
  width = 1.7
  height = 4.55

  image = ScrollToken
}

export const scrollTokenDescription = new ScrollTokenDescription()
