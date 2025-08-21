import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { bearDivinityCardDescription } from '../material/BearDivinityCardDescription'

class PlayerBearCardsLocator extends ListLocator {
  parentItemType = MaterialType.PlayerMat
  positionOnParent = { x: 132, y: 54 }
  gap = { y: 3.5 }

  getParentItem(location: Location, context: MaterialContext): MaterialItem | undefined {
    return context.rules.material(this.parentItemType).player(location.player).getItem()
  }

  locationDescription = new DropAreaDescription(bearDivinityCardDescription)
}

export const playerBearCardsLocator = new PlayerBearCardsLocator()
