import { CardDescription } from '@gamepark/react-game'
import { SpellBookCard } from '@gamepark/salamandra/material/SpellBookCard'
import SpellBookCard01 from '../images/cards/spellbook/SpellbookCard01.jpg'
import SpellBookCard02 from '../images/cards/spellBook/SpellBookCard02.png'
import SpellBookCard03 from '../images/cards/spellBook/SpellBookCard03.png'
import SpellBookCard04 from '../images/cards/spellBook/SpellBookCard04.png'
import SpellBookCard05 from '../images/cards/spellBook/SpellBookCard05.png'
import SpellBookCard06 from '../images/cards/spellBook/SpellBookCard06.png'
import SpellBookCard07 from '../images/cards/spellBook/SpellBookCard07.png'
import SpellBookCard08 from '../images/cards/spellBook/SpellBookCard08.png'
import SpellBookCard09 from '../images/cards/spellBook/SpellBookCard09.png'
import SpellBookCard10 from '../images/cards/spellBook/SpellBookCard10.png'

class SpellBookCardDescription extends CardDescription {
  width = 8
  height = 5.4

  images = {
    [SpellBookCard.SpellBook1]: SpellBookCard01,
    [SpellBookCard.SpellBook2]: SpellBookCard02,
    [SpellBookCard.SpellBook3]: SpellBookCard03,
    [SpellBookCard.SpellBook4]: SpellBookCard04,
    [SpellBookCard.SpellBook5]: SpellBookCard05,
    [SpellBookCard.SpellBook6]: SpellBookCard06,
    [SpellBookCard.SpellBook7]: SpellBookCard07,
    [SpellBookCard.SpellBook8]: SpellBookCard08,
    [SpellBookCard.SpellBook9]: SpellBookCard09,
    [SpellBookCard.SpellBook10]: SpellBookCard10
  }
}

export const spellBookCardDescription = new SpellBookCardDescription()
