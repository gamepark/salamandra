import { TokenDescription } from '@gamepark/react-game'
import ScrollToken from '../images/tokens/ScrollToken.png'

class ScrollTokenDescription extends TokenDescription {
  width = 0.34
  height = 0.91

  image = ScrollToken
}

export const scrollTokenDescription = new ScrollTokenDescription()
