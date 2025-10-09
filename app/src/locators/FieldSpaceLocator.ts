import { ListLocator, MaterialContext, OriginType } from '@gamepark/react-game'
import { Coordinates, Location } from '../../../../rules-api/src'
import { fieldTileDescription } from '../material/FieldTileDescription'
import { fieldStackLocator } from './FieldStackLocator'

class FieldSpaceLocator extends ListLocator {
  gap = { y: fieldTileDescription.width + 0.5 }

  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const coordinates = fieldStackLocator.getCoordinates(_location, context)
    coordinates.y! += this.gap.y
    return coordinates
  }

  getHoverTransform = () => ['translateX(-80%)', 'translateZ(10em)', 'scale(2.3)']

  locationOrigin = { x: OriginType.Max, y: OriginType.Min }
}

export const fieldSpaceLocator = new FieldSpaceLocator()
