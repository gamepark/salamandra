import { CardDescription } from '@gamepark/react-game'
import { BearDivinityCard } from '@gamepark/salamandra/material/BearDivinityCard'
import BearDivinityCard01 from '../images/cards/bear/BearCard01.jpg'
import BearDivinityCard02 from '../images/cards/bear/BearCard02.jpg'
import BearDivinityCard03 from '../images/cards/bear/BearCard03.jpg'
import BearDivinityCard04 from '../images/cards/bear/BearCard04.jpg'
import BearDivinityCard05 from '../images/cards/bear/BearCard05.jpg'
import BearDivinityCard06 from '../images/cards/bear/BearCard06.jpg'
import BearDivinityCard07 from '../images/cards/bear/BearCard07.jpg'
import BearDivinityCard08 from '../images/cards/bear/BearCard08.jpg'
import BearDivinityCard09 from '../images/cards/bear/BearCard09.jpg'
import BearDivinityCard10 from '../images/cards/bear/BearCard10.jpg'
import BearDivinityCard11 from '../images/cards/bear/BearCard11.jpg'
import BearDivinityCard12 from '../images/cards/bear/BearCard12.jpg'
import BearDivinityCardBack from '../images/cards/bear/BearCardBack.jpg'

class BearDivinityCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImage = BearDivinityCardBack

  images = {
    [BearDivinityCard.BearDivinity1]: BearDivinityCard01,
    [BearDivinityCard.BearDivinity2]: BearDivinityCard02,
    [BearDivinityCard.BearDivinity3]: BearDivinityCard03,
    [BearDivinityCard.BearDivinity4]: BearDivinityCard04,
    [BearDivinityCard.BearDivinity5]: BearDivinityCard05,
    [BearDivinityCard.BearDivinity6]: BearDivinityCard06,
    [BearDivinityCard.BearDivinity7]: BearDivinityCard07,
    [BearDivinityCard.BearDivinity8]: BearDivinityCard08,
    [BearDivinityCard.BearDivinity9]: BearDivinityCard09,
    [BearDivinityCard.BearDivinity10]: BearDivinityCard10,
    [BearDivinityCard.BearDivinity11]: BearDivinityCard11,
    [BearDivinityCard.BearDivinity12]: BearDivinityCard12
  }
}

export const bearDivinityCardDescription = new BearDivinityCardDescription()
