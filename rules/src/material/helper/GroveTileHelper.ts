import { Location, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { BonusType, DivinityType } from '../Bonus'
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

  getEmptyGroveLocations(location: Partial<Location>): Location[] {
    const locations: Location[] = []
    const coordinates = { x: location.x ?? 0, y: location.y ?? 0 }
    if (this.checkIfEmptySpaceAtTopRight(coordinates)) {
      locations.push({ type: LocationType.GameLayout, x: coordinates.x + 0.5, y: coordinates.y - 0.5 })
    }
    if (this.checkIfEmptySpaceAtBottomRight(coordinates)) {
      locations.push({ type: LocationType.GameLayout, x: coordinates.x + 0.5, y: coordinates.y + 0.5 })
    }
    if (this.checkIfEmptySpaceAtBottomLeft(coordinates)) {
      locations.push({ type: LocationType.GameLayout, x: coordinates.x - 0.5, y: coordinates.y + 0.5 })
    }
    if (this.checkIfEmptySpaceAtTopLeft(coordinates)) {
      locations.push({ type: LocationType.GameLayout, x: coordinates.x - 0.5, y: coordinates.y - 0.5 })
    }
    return locations
  }

  checkIfEmptySpaceAtTopRight = (coordinates: XYCoordinates): boolean => {
    const fieldAtTop = this.checkIfHasField({ x: coordinates.x, y: coordinates.y - 1 })
    const fieldAtTopRight = this.checkIfHasField({ x: coordinates.x + 1, y: coordinates.y - 1 })
    const fieldAtRight = this.checkIfHasField({ x: coordinates.x + 1, y: coordinates.y })

    return fieldAtTop && fieldAtTopRight && fieldAtRight && !this.checkIfAlreadyHasGrove({ x: coordinates.x + 0.5, y: coordinates.y - 0.5 })
  }

  checkIfEmptySpaceAtBottomRight = (coordinates: XYCoordinates): boolean => {
    const fieldAtRight = this.checkIfHasField({ x: coordinates.x + 1, y: coordinates.y })
    const fieldAtBottomRight = this.checkIfHasField({ x: coordinates.x + 1, y: coordinates.y + 1 })
    const fieldAtBottom = this.checkIfHasField({ x: coordinates.x, y: coordinates.y + 1 })

    return fieldAtRight && fieldAtBottomRight && fieldAtBottom && !this.checkIfAlreadyHasGrove({ x: coordinates.x + 0.5, y: coordinates.y + 0.5 })
  }

  checkIfEmptySpaceAtBottomLeft = (coordinates: XYCoordinates): boolean => {
    const fieldAtBottom = this.checkIfHasField({ x: coordinates.x, y: coordinates.y + 1 })
    const fieldAtBottomLeft = this.checkIfHasField({ x: coordinates.x - 1, y: coordinates.y + 1 })
    const fieldAtLeft = this.checkIfHasField({ x: coordinates.x - 1, y: coordinates.y })

    return fieldAtBottom && fieldAtBottomLeft && fieldAtLeft && !this.checkIfAlreadyHasGrove({ x: coordinates.x - 0.5, y: coordinates.y + 0.5 })
  }

  checkIfEmptySpaceAtTopLeft = (coordinates: XYCoordinates): boolean => {
    const fieldAtLeft = this.checkIfHasField({ x: coordinates.x - 1, y: coordinates.y })
    const fieldAtTopLeft = this.checkIfHasField({ x: coordinates.x - 1, y: coordinates.y - 1 })
    const fieldAtTop = this.checkIfHasField({ x: coordinates.x, y: coordinates.y - 1 })

    return fieldAtLeft && fieldAtTopLeft && fieldAtTop && !this.checkIfAlreadyHasGrove({ x: coordinates.x - 0.5, y: coordinates.y - 0.5 })
  }

  checkIfHasField = (coordinates: XYCoordinates): boolean => {
    if (coordinates.y === 0 && coordinates.x === 0) return true
    if (coordinates.y === 0 && coordinates.x === 1) return true
    return (
      this.material(MaterialType.FieldTile).location((loc) => loc.type === LocationType.GameLayout && loc.y === coordinates.y && loc.x === coordinates.x)
        .length > 0
    )
  }

  checkIfAlreadyHasGrove = (coordinates: XYCoordinates): boolean => {
    return (
      this.material(MaterialType.GroveTile).location((loc) => loc.type === LocationType.GameLayout && loc.y === coordinates.y && loc.x === coordinates.x)
        .length > 0
    )
  }

  private checkGroveCrystal(coordinates: XYCoordinates, index: number) {
    const groveId = this.material(MaterialType.GroveTile)
      .location((loc) => loc.type === LocationType.GameLayout && loc.y === coordinates.y && loc.x === coordinates.x)
      .getItem()?.id
    return groveId ? groveData[groveId as GroveTile].crystals[index] : 0
  }

  getGroveBonus(index: number): MaterialMove[] {
    const moves: MaterialMove[] = []
    const groveId = this.material(MaterialType.GroveTile).getItem(index).id
    const bonus = groveData[groveId as GroveTile].bonus
    bonus.forEach((b) => {
      if (b.type === BonusType.Scroll) {
        moves.push(
          this.material(MaterialType.ScrollToken)
            .location(LocationType.ScrollTokenStock)
            .moveItem({ type: LocationType.PlayerScrollTokenStock, player: this.player })
        )
      }
      if (b.type === BonusType.Points) {
        moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: b.amount }))
      }
      if (b.type === BonusType.DivinityCard) {
        if (b.divinity === DivinityType.Eagle && this.eagleCards.length > 0) {
          moves.push(this.eagleCards.moveItem({ type: LocationType.PlayerEagleCards, player: this.player }))
        }
        if (b.divinity === DivinityType.Bear && this.bearCards.length > 0) {
          moves.push(this.bearCards.moveItem({ type: LocationType.PlayerBearCards, player: this.player }))
        }
      }
    })
    return moves
  }

  get eagleCards() {
    return this.material(MaterialType.DivinityCard)
      .location(LocationType.EagleDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get bearCards() {
    return this.material(MaterialType.DivinityCard)
      .location(LocationType.BearDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }
}
