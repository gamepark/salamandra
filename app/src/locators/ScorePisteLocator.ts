import { DeckLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Location } from '@gamepark/rules-api'

class ScorePisteLocator extends DeckLocator {
  parentItemType = MaterialType.VenerationPointsBoard

  getPositionOnParent(location: Location) {
    switch (location.id) {
      case 0:
        return { x: 7.5, y: 71.5 }
      default:
        return { x: 0, y: 0 }
    }
  }
}

export const scorePisteLocator = new ScorePisteLocator()
