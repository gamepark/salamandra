import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { BearDivinityCard } from '../BearDivinityCard'
import { crystalTokens } from '../CrystalToken'
import { EagleDivinityCard } from '../EagleDivinityCard'
import { FieldColor, fieldData, FieldTile, FieldType } from '../FieldTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Potion } from '../Potion'

export class BearDivinityCardHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getLegalMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getBearCard6Effect())
    moves.push(...this.getBearCard8Effect())
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getBearCard9Effect(move))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getBearCard1Effect(move))
    moves.push(...this.getBearCard2Effect(move))
    moves.push(...this.getBearCard3Effect(move))
    moves.push(...this.getBearCard4Effect(move))
    moves.push(...this.getBearCard5Effect(move))
    moves.push(...this.getBearCard7Effect(move))
    moves.push(...this.getBearCard10Effect(move))
    moves.push(...this.getBearCard11Effect(move))
    moves.push(...this.getBearCard12Effect(move))
    return moves
  }

  getBearCard1Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity1)) return []
    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles && move.location.player === this.player) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getBearCard2Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity2)) return []
    if (this.isPlaceApprenticeInCauldronField(move)) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getBearCard3Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity3)) return []
    if (isMoveItemType(MaterialType.FieldTile)(move) && move.location.type === LocationType.GameLayout) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getBearCard4Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity4)) return []
    if (isMoveItemType(MaterialType.ScrollToken)(move) && move.location.type === LocationType.PlayerScrollTokenStock && move.location.player === this.player) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getBearCard5Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity5)) return []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && move.location.type === LocationType.SpellBookApprenticeSpace) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(2, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getBearCard6Effect(): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity6)) return []
    if (this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity4)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 6) {
      return [this.customMove(CustomMoveType.PayCristalsToGainPotion, { player: this.player, amount: 6, potion: Potion.FlowerOrFruit })]
    }
    return []
  }

  getBearCard7Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity7)) return []
    if (isMoveItemType(MaterialType.FieldTile)(move) && move.location.type === LocationType.GameLayout) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getBearCard8Effect(): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity8)) return []
    if (this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity2)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 6) {
      return [this.customMove(CustomMoveType.PayCristalsToGainPotion, { player: this.player, amount: 6, potion: Potion.Leaf })]
    }
    return []
  }

  getBearCard9Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity9)) return []
    if (!this.isPlaceApprenticeInSpecificColorField(move, FieldColor.Purple)) return []
    const item = this.material(move.itemType).getItem(move.itemIndex)
    if (item.location.rotation !== move.location.rotation) return []
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
  }

  getBearCard10Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity10)) return []
    if (this.isPlaceApprenticeInSpecificColorField(move, FieldColor.White)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getBearCard11Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity11)) return []
    if (this.isPlaceApprenticeInSpecificColorField(move, FieldColor.Orange)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getBearCard12Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasBearDivinityCard(BearDivinityCard.BearDivinity12)) return []
    if (this.isPlaceApprenticeInSpecificColorField(move, FieldColor.Green)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  checkPlayerHasBearDivinityCard(cardId: BearDivinityCard): boolean {
    return this.material(MaterialType.BearDivinityCard).location(LocationType.PlayerBearCards).player(this.player).id(cardId).length > 0
  }

  checkPlayerHasEagleDivinityCard(cardId: EagleDivinityCard): boolean {
    return this.material(MaterialType.EagleDivinityCard).location(LocationType.PlayerEagleCards).player(this.player).id(cardId).length > 0
  }

  isPlaceApprenticeInCauldronField(move: ItemMove): boolean {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return false
    if (move.location.type !== LocationType.FieldApprenticeSpace) return false
    const field = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()
    if (field === undefined) return false
    return fieldData[field.id as FieldTile].type === FieldType.Cauldron
  }

  isPlaceApprenticeInSpecificColorField(move: ItemMove, color: FieldColor): move is MoveItem {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return false
    if (move.location.type !== LocationType.FieldApprenticeSpace) return false
    const field = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()
    if (field === undefined) return false
    return fieldData[field.id as FieldTile].colors.includes(color)
  }
}
