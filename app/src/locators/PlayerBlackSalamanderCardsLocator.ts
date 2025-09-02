import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { blackSalamanderCardDescription } from '../material/BlackSalamanderCardDescription'
import { playerWhiteSalamanderCardsLocator } from './PlayerWhiteSalamanderCardsLocator'

class PlayerBlackSalamanderCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: playerWhiteSalamanderCardsLocator.positionOnParent.x, y: playerWhiteSalamanderCardsLocator.positionOnParent.y + 22 }
  gap = { y: 3.5 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(blackSalamanderCardDescription)
}

export const playerBlackSalamanderCardsLocator = new PlayerBlackSalamanderCardsLocator()
