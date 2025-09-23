import { FlexLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { spellBookCardDescription } from '../material/SpellBookCardDescription'

class SpellBookSpaceLocator extends FlexLocator {
  gap = { x: spellBookCardDescription.width + 0.5 }
  lineSize = 3
  lineGap = { y: spellBookCardDescription.height + 0.5, z: 2 }

  getCoordinates(location: Location): Partial<Coordinates> {
    const { x = 0, y } = { x: -50, y: -36.5 }
    return location.x && location.x >= 3 ? { x: x + this.gap.x / 2, y } : { x, y }
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2.5)', 'translateY(30%)']
}

export const spellBookSpaceLocator = new SpellBookSpaceLocator()
