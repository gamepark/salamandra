import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { fieldTileDescription } from '../material/FieldTileDescription'
import { FieldStackDescription } from './description/FieldStackDescription'

class FieldStackLocator extends DeckLocator {
  coordinates = { x: -19.5, y: 37 }
  location = { type: LocationType.FieldStack }
  locationDescription = new FieldStackDescription(fieldTileDescription)

  getAreaCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules } = context
    const deckSize = Math.min(rules.material(MaterialType.FieldTile).location(LocationType.FieldStack).length, 20)
    return {
      x: this.coordinates.x + -0.05 * (deckSize - 1),
      y: this.coordinates.y + -0.05 * (deckSize - 1),
      z: 5
    }
  }
}

export const fieldStackLocator = new FieldStackLocator()
