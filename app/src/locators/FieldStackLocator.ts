import { DeckLocator, MaterialContext, OriginType } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { fieldTileDescription } from '../material/FieldTileDescription'
import { FieldStackDescription } from './description/FieldStackDescription'

class FieldStackLocator extends DeckLocator {
  location = { type: LocationType.FieldStack }
  locationDescription = new FieldStackDescription(fieldTileDescription)
  coordinates = { x: -5, y: 10, z: 2 }

  locationOrigin = { x: OriginType.Max, y: OriginType.Min }

  getAreaCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const { rules } = context
    const coordinates = this.getCoordinates(location, context)
    const deckSize = Math.min(rules.material(MaterialType.FieldTile).location(LocationType.FieldStack).length, 20)
    return {
      x: coordinates.x! + -0.05 * (deckSize - 1),
      y: coordinates.y! + -0.05 * (deckSize - 1) - 0.5,
      z: 5
    }
  }

  navigationSorts = []
}

export const fieldStackLocator = new FieldStackLocator()
