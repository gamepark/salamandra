import { ListLocator, OriginType } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { fieldTileDescription } from '../material/FieldTileDescription'
import { fieldStackLocator } from './FieldStackLocator'

class FieldSpaceLocator extends ListLocator {
  gap = { y: fieldTileDescription.width + 0.5 }

  getCoordinates(): Partial<Coordinates> {
    const coordinates = { ...fieldStackLocator.coordinates }
    coordinates.y! += this.gap.y
    return coordinates
  }

  getHoverTransform = () => ['translateX(-80%)', 'translateZ(10em)', 'scale(2.3)']

  locationOrigin = { x: OriginType.Max, y: OriginType.Min }
}

export const fieldSpaceLocator = new FieldSpaceLocator()
