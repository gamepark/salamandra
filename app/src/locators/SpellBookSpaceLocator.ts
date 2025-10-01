import { FlexLocator, ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { spellBookCardDescription } from '../material/SpellBookCardDescription'

class SpellBookSpaceLocator extends ListLocator {
  gap = { x: spellBookCardDescription.width + 0.5 }

  coordinates = { x: -55, y: -26.5 }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)', 'translateY(30%)']
}

export const spellBookSpaceLocator = new SpellBookSpaceLocator()
