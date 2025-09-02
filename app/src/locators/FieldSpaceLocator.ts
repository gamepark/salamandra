import { ListLocator } from '@gamepark/react-game'
import { fieldTileDescription } from '../material/FieldTileDescription'
import { fieldStackLocator } from './FieldStackLocator'

class FieldSpaceLocator extends ListLocator {
  gap = { x: fieldTileDescription.width + 0.5 }
  coordinates = { x: fieldStackLocator.coordinates.x + this.gap.x, y: fieldStackLocator.coordinates.y }

  getHoverTransform = () => ['translateY(-80%)', 'translateZ(10em)', 'scale(2.3)']
}

export const fieldSpaceLocator = new FieldSpaceLocator()
