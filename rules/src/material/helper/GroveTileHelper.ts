import { Location, MaterialGame, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { crystalTokens } from '../CrystalToken'
import { groveData, GroveTile } from '../GroveTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'

export class GroveTileHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getGroveCrystals(location: Partial<Location>) {
    const fieldLocation = this.material(MaterialType.FieldTile).index(location.parent).getItem()?.location
    if (!fieldLocation || fieldLocation.x === undefined || fieldLocation.y === undefined) return []

    let nbCrystals = 0

    const topLeftCrystal = this.checkGroveCrystal({ x: fieldLocation.x - 0.5, y: fieldLocation.y - 0.5 }, 2)
    const topRightCrystal = this.checkGroveCrystal({ x: fieldLocation.x + 0.5, y: fieldLocation.y - 0.5 }, 3)
    const bottomRightCrystal = this.checkGroveCrystal({ x: fieldLocation.x + 0.5, y: fieldLocation.y + 0.5 }, 0)
    const bottomLeftCrystal = this.checkGroveCrystal({ x: fieldLocation.x - 0.5, y: fieldLocation.y + 0.5 }, 1)

    if (location.x === 0) {
      nbCrystals += topLeftCrystal
      nbCrystals += topRightCrystal
    }
    if (location.x === 1) {
      nbCrystals += topRightCrystal
      nbCrystals += bottomRightCrystal
    }
    if (location.x === 2) {
      nbCrystals += bottomRightCrystal
      nbCrystals += bottomLeftCrystal
    }
    if (location.x === 3) {
      nbCrystals += topLeftCrystal
      nbCrystals += bottomLeftCrystal
    }
    if (nbCrystals) {
      return this.material(MaterialType.CrystalToken)
          .money(crystalTokens)
          .addMoney(nbCrystals, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  private checkGroveCrystal(coordinates: XYCoordinates, index: number) {
    const groveId = this.material(MaterialType.GroveTile)
      .location((loc) => loc.type === LocationType.GameLayout && loc.y === coordinates.y && loc.x === coordinates.x)
      .getItem()?.id
    return groveId ? groveData[groveId as GroveTile].crystals[index] : 0
  }
}
