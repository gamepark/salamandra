import { CardDescription } from '@gamepark/react-game'
import { SalamanderCard, SalamanderCardColor } from '@gamepark/salamandra/material/SalamanderCard'
import BlackSalamander1 from '../images/cards/salamander/black/BlackSalamander1.jpg'
import BlackSalamander2 from '../images/cards/salamander/black/BlackSalamander2.jpg'
import BlackSalamander3 from '../images/cards/salamander/black/BlackSalamander3.jpg'
import BlackSalamander4 from '../images/cards/salamander/black/BlackSalamander4.jpg'
import BlackSalamander5 from '../images/cards/salamander/black/BlackSalamander5.jpg'
import BlackSalamander6 from '../images/cards/salamander/black/BlackSalamander6.jpg'
import BlackSalamander7 from '../images/cards/salamander/black/BlackSalamander7.jpg'
import BlackSalamander8 from '../images/cards/salamander/black/BlackSalamander8.jpg'
import BlackSalamanderCardBack from '../images/cards/salamander/black/BlackSalamanderBack.jpg'
import WhiteSalamander1 from '../images/cards/salamander/white/WhiteSalamander1.jpg'
import WhiteSalamander2 from '../images/cards/salamander/white/WhiteSalamander2.jpg'
import WhiteSalamander3 from '../images/cards/salamander/white/WhiteSalamander3.jpg'
import WhiteSalamander4 from '../images/cards/salamander/white/WhiteSalamander4.jpg'
import WhiteSalamander5 from '../images/cards/salamander/white/WhiteSalamander5.jpg'
import WhiteSalamander6 from '../images/cards/salamander/white/WhiteSalamander6.jpg'
import WhiteSalamander7 from '../images/cards/salamander/white/WhiteSalamander7.jpg'
import WhiteSalamander8 from '../images/cards/salamander/white/WhiteSalamander8.jpg'
import WhiteSalamanderCardBack from '../images/cards/salamander/white/WhiteSalamanderBack.jpg'
import { SalamanderCardHelp } from './help/SalamanderCardHelp'

class SalamanderCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImages = {
    [SalamanderCardColor.White]: WhiteSalamanderCardBack,
    [SalamanderCardColor.Black]: BlackSalamanderCardBack
  }

  images = {
    [SalamanderCard.BlackSalamander1]: BlackSalamander1,
    [SalamanderCard.BlackSalamander2]: BlackSalamander2,
    [SalamanderCard.BlackSalamander3]: BlackSalamander3,
    [SalamanderCard.BlackSalamander4]: BlackSalamander4,
    [SalamanderCard.BlackSalamander5]: BlackSalamander5,
    [SalamanderCard.BlackSalamander6]: BlackSalamander6,
    [SalamanderCard.BlackSalamander7]: BlackSalamander7,
    [SalamanderCard.BlackSalamander8]: BlackSalamander8,
    [SalamanderCard.WhiteSalamander1]: WhiteSalamander1,
    [SalamanderCard.WhiteSalamander2]: WhiteSalamander2,
    [SalamanderCard.WhiteSalamander3]: WhiteSalamander3,
    [SalamanderCard.WhiteSalamander4]: WhiteSalamander4,
    [SalamanderCard.WhiteSalamander5]: WhiteSalamander5,
    [SalamanderCard.WhiteSalamander6]: WhiteSalamander6,
    [SalamanderCard.WhiteSalamander7]: WhiteSalamander7,
    [SalamanderCard.WhiteSalamander8]: WhiteSalamander8
  }

  help = SalamanderCardHelp
}

export const salamanderCardDescription = new SalamanderCardDescription()
