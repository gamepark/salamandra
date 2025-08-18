import { CardDescription } from '@gamepark/react-game'
import { SpellBookCard } from '@gamepark/salamandra/material/SpellBookCard'
import SpellBookCard01 from '../images/cards/spellbook/SpellbookCard01.jpg'
import SpellBookCard02 from '../images/cards/spellbook/SpellbookCard02.jpg'
import SpellBookCard03 from '../images/cards/spellbook/SpellbookCard03.jpg'
import SpellBookCard04 from '../images/cards/spellbook/SpellbookCard04.jpg'
import SpellBookCard05 from '../images/cards/spellbook/SpellbookCard05.jpg'
import SpellBookCard06 from '../images/cards/spellbook/SpellbookCard06.jpg'
import SpellBookCard07 from '../images/cards/spellbook/SpellbookCard07.jpg'
import SpellBookCard08 from '../images/cards/spellbook/SpellbookCard08.jpg'
import SpellBookCard09 from '../images/cards/spellbook/SpellbookCard09.jpg'
import SpellBookCard10 from '../images/cards/spellbook/SpellbookCard10.jpg'

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
