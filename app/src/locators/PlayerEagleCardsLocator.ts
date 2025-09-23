import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { divinityCardDescription } from '../material/DivinityCardDescription'
import { playerBearCardsLocator } from './PlayerBearCardsLocator'

class PlayerEagleCardsLocator extends Locator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerBearCardsLocator.positionOnParent.x, y: playerBearCardsLocator.positionOnParent.y + 22 }
  gap = { x: -0.06, y: -0.06 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(divinityCardDescription)
}

export const playerEagleCardsLocator = new PlayerEagleCardsLocator()
