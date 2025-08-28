import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { blackSalamanderCardDescription } from '../material/BlackSalamanderCardDescription'

class PlayerBlackSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 176, y: 54 }
  gap = { y: 3.5 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(blackSalamanderCardDescription)
}

export const playerBlackSalamanderCardsLocator = new PlayerBlackSalamanderCardsLocator()
