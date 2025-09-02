import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { whiteSalamanderCardDescription } from '../material/WhiteSalamanderCardDescription'
import { playerEagleCardsLocator } from './PlayerEagleCardsLocator'

class PlayerWhiteSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerEagleCardsLocator.positionOnParent.x, y: playerEagleCardsLocator.positionOnParent.y + 22 }
  gap = { y: 3.5 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(whiteSalamanderCardDescription)
}

export const playerWhiteSalamanderCardsLocator = new PlayerWhiteSalamanderCardsLocator()
