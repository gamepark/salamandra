import { CardDescription } from '@gamepark/react-game'
import { WhiteSalamanderCard } from '@gamepark/salamandra/material/WhiteSalamanderCard'
import WhiteSalamander1 from '../images/cards/salamander/white/WhiteSalamander1.jpg'
import WhiteSalamander2 from '../images/cards/salamander/white/WhiteSalamander2.jpg'
import WhiteSalamander3 from '../images/cards/salamander/white/WhiteSalamander3.jpg'
import WhiteSalamander4 from '../images/cards/salamander/white/WhiteSalamander4.jpg'
import WhiteSalamander5 from '../images/cards/salamander/white/WhiteSalamander5.jpg'
import WhiteSalamander6 from '../images/cards/salamander/white/WhiteSalamander6.jpg'
import WhiteSalamander7 from '../images/cards/salamander/white/WhiteSalamander7.jpg'
import WhiteSalamander8 from '../images/cards/salamander/white/WhiteSalamander8.jpg'
import WhiteSalamanderCardBack from '../images/cards/salamander/white/WhiteSalamanderBack.jpg'
import { WhiteSalamanderCardHelp } from './help/WhiteSalamanderCardHelp'

class WhiteSalamanderCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImage = WhiteSalamanderCardBack

  images = {
    [WhiteSalamanderCard.WhiteSalamander1]: WhiteSalamander1,
    [WhiteSalamanderCard.WhiteSalamander2]: WhiteSalamander2,
    [WhiteSalamanderCard.WhiteSalamander3]: WhiteSalamander3,
    [WhiteSalamanderCard.WhiteSalamander4]: WhiteSalamander4,
    [WhiteSalamanderCard.WhiteSalamander5]: WhiteSalamander5,
    [WhiteSalamanderCard.WhiteSalamander6]: WhiteSalamander6,
    [WhiteSalamanderCard.WhiteSalamander7]: WhiteSalamander7,
    [WhiteSalamanderCard.WhiteSalamander8]: WhiteSalamander8
  }

  help = WhiteSalamanderCardHelp
}

export const whiteSalamanderCardDescription = new WhiteSalamanderCardDescription()
