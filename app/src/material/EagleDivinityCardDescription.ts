import { CardDescription } from '@gamepark/react-game'
import { EagleDivinityCard } from '@gamepark/salamandra/material/EagleDivinityCard'
import EagleDivinityCard01 from '../images/cards/eagle/EagleCard01.jpg'
import EagleDivinityCard02 from '../images/cards/eagle/EagleCard02.jpg'
import EagleDivinityCard03 from '../images/cards/eagle/EagleCard03.jpg'
import EagleDivinityCard04 from '../images/cards/eagle/EagleCard04.jpg'
import EagleDivinityCard05 from '../images/cards/eagle/EagleCard05.jpg'
import EagleDivinityCard06 from '../images/cards/eagle/EagleCard06.jpg'
import EagleDivinityCard07 from '../images/cards/eagle/EagleCard07.jpg'
import EagleDivinityCard08 from '../images/cards/eagle/EagleCard08.jpg'
import EagleDivinityCard09 from '../images/cards/eagle/EagleCard09.jpg'
import EagleDivinityCard10 from '../images/cards/eagle/EagleCard10.jpg'
import EagleDivinityCard11 from '../images/cards/eagle/EagleCard11.jpg'
import EagleDivinityCard12 from '../images/cards/eagle/EagleCard12.jpg'
import EagleDivinityCardBack from '../images/cards/eagle/EagleCardBack.jpg'
import { EagleDivinityCardHelp } from './help/EagleDivinityCardHelp'

class EagleDivinityCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImage = EagleDivinityCardBack

  images = {
    [EagleDivinityCard.EagleDivinity1]: EagleDivinityCard01,
    [EagleDivinityCard.EagleDivinity2]: EagleDivinityCard02,
    [EagleDivinityCard.EagleDivinity3]: EagleDivinityCard03,
    [EagleDivinityCard.EagleDivinity4]: EagleDivinityCard04,
    [EagleDivinityCard.EagleDivinity5]: EagleDivinityCard05,
    [EagleDivinityCard.EagleDivinity6]: EagleDivinityCard06,
    [EagleDivinityCard.EagleDivinity7]: EagleDivinityCard07,
    [EagleDivinityCard.EagleDivinity8]: EagleDivinityCard08,
    [EagleDivinityCard.EagleDivinity9]: EagleDivinityCard09,
    [EagleDivinityCard.EagleDivinity10]: EagleDivinityCard10,
    [EagleDivinityCard.EagleDivinity11]: EagleDivinityCard11,
    [EagleDivinityCard.EagleDivinity12]: EagleDivinityCard12
  }

  help = EagleDivinityCardHelp
}

export const eagleDivinityCardDescription = new EagleDivinityCardDescription()
