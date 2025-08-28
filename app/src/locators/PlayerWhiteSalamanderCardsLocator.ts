import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { whiteSalamanderCardDescription } from '../material/WhiteSalamanderCardDescription'

class PlayerWhiteSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 154, y: 54 }
  gap = { y: 3.5 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(whiteSalamanderCardDescription)
}

export const playerWhiteSalamanderCardsLocator = new PlayerWhiteSalamanderCardsLocator()
