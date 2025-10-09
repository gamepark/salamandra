import { ListLocator, OriginType } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { spellBookCardDescription } from '../material/SpellBookCardDescription'

class SpellBookSpaceLocator extends ListLocator {
  gap = { x: spellBookCardDescription.width + 0.5 }

  coordinates = { x: 23, y: spellBookCardDescription.height / 2 + 1 }

  getHoverTransform = (item: MaterialItem) => {
    const transform = ['translateZ(10em)', 'scale(2)', 'translateY(25%)']
    if (item.location.x === 0) return ['translateX(40%)', ...transform]
    return transform
  }

  locationOrigin = { x: OriginType.Min, y: OriginType.Min }
}

export const spellBookSpaceLocator = new SpellBookSpaceLocator()
