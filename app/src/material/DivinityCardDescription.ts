import { CardDescription } from '@gamepark/react-game'
import { DivinityCard, DivinityType } from '@gamepark/salamandra/material/DivinityCard'
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
import EagleDivinityCardBack from '../images/cards/eagle/EagleCardBack.jpg'
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
import { DivinityCardHelp } from './help/DivinityCardHelp'

class BearDivinityCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImages = {
    [DivinityType.Bear]: BearDivinityCardBack,
    [DivinityType.Eagle]: EagleDivinityCardBack
  }

  images = {
    [DivinityCard.BearDivinity1]: BearDivinityCard01,
    [DivinityCard.BearDivinity2]: BearDivinityCard02,
    [DivinityCard.BearDivinity3]: BearDivinityCard03,
    [DivinityCard.BearDivinity4]: BearDivinityCard04,
    [DivinityCard.BearDivinity5]: BearDivinityCard05,
    [DivinityCard.BearDivinity6]: BearDivinityCard06,
    [DivinityCard.BearDivinity7]: BearDivinityCard07,
    [DivinityCard.BearDivinity8]: BearDivinityCard08,
    [DivinityCard.BearDivinity9]: BearDivinityCard09,
    [DivinityCard.BearDivinity10]: BearDivinityCard10,
    [DivinityCard.BearDivinity11]: BearDivinityCard11,
    [DivinityCard.BearDivinity12]: BearDivinityCard12,

    [DivinityCard.EagleDivinity1]: EagleDivinityCard01,
    [DivinityCard.EagleDivinity2]: EagleDivinityCard02,
    [DivinityCard.EagleDivinity3]: EagleDivinityCard03,
    [DivinityCard.EagleDivinity4]: EagleDivinityCard04,
    [DivinityCard.EagleDivinity5]: EagleDivinityCard05,
    [DivinityCard.EagleDivinity6]: EagleDivinityCard06,
    [DivinityCard.EagleDivinity7]: EagleDivinityCard07,
    [DivinityCard.EagleDivinity8]: EagleDivinityCard08,
    [DivinityCard.EagleDivinity9]: EagleDivinityCard09,
    [DivinityCard.EagleDivinity10]: EagleDivinityCard10,
    [DivinityCard.EagleDivinity11]: EagleDivinityCard11,
    [DivinityCard.EagleDivinity12]: EagleDivinityCard12
  }

  help = DivinityCardHelp
}

export const divinityCardDescription = new BearDivinityCardDescription()
