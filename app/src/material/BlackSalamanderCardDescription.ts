import { CardDescription } from '@gamepark/react-game'
import { BlackSalamanderCard } from '@gamepark/salamandra/material/BlackSalamanderCard'
import BlackSalamander1 from '../images/cards/salamander/black/BlackSalamander1.jpg'
import BlackSalamander2 from '../images/cards/salamander/black/BlackSalamander2.jpg'
import BlackSalamander3 from '../images/cards/salamander/black/BlackSalamander3.jpg'
import BlackSalamander4 from '../images/cards/salamander/black/BlackSalamander4.jpg'
import BlackSalamander5 from '../images/cards/salamander/black/BlackSalamander5.jpg'
import BlackSalamander6 from '../images/cards/salamander/black/BlackSalamander6.jpg'
import BlackSalamander7 from '../images/cards/salamander/black/BlackSalamander7.jpg'
import BlackSalamander8 from '../images/cards/salamander/black/BlackSalamander8.jpg'
import BlackSalamanderCardBack from '../images/cards/salamander/black/BlackSalamanderBack.jpg'

class BlackSalamanderCardDescription extends CardDescription {
  width = 4.1
  height = 6.3
  borderRadius = 0.2

  backImage = BlackSalamanderCardBack

  images = {
    [BlackSalamanderCard.BlackSalamander1]: BlackSalamander1,
    [BlackSalamanderCard.BlackSalamander2]: BlackSalamander2,
    [BlackSalamanderCard.BlackSalamander3]: BlackSalamander3,
    [BlackSalamanderCard.BlackSalamander4]: BlackSalamander4,
    [BlackSalamanderCard.BlackSalamander5]: BlackSalamander5,
    [BlackSalamanderCard.BlackSalamander6]: BlackSalamander6,
    [BlackSalamanderCard.BlackSalamander7]: BlackSalamander7,
    [BlackSalamanderCard.BlackSalamander8]: BlackSalamander8
  }
}

export const blackSalamanderCardDescription = new BlackSalamanderCardDescription()
