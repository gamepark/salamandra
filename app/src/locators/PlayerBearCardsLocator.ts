import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { divinityCardDescription } from '../material/DivinityCardDescription'

class PlayerBearCardsLocator extends Locator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 110, y: 37 }
  gap = { x: -0.06, y: -0.06 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(divinityCardDescription)
}

export const playerBearCardsLocator = new PlayerBearCardsLocator()
