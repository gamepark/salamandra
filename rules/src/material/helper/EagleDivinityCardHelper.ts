import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { crystalTokens } from '../CrystalToken'
import { EagleDivinityCard } from '../EagleDivinityCard'
import { fieldData, FieldTile, FieldType } from '../FieldTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Potion } from '../Potion'
import { primaryResources } from '../PrimaryResource'

export class EagleDivinityCardHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getLegalMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getEagleCard2Effect())
    moves.push(...this.getEagleCard4Effect())
    moves.push(...this.getEagleCard9Effect())
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getEagleCard1Effect(move))
    moves.push(...this.getEagleCard3Effect(move))
    moves.push(...this.getEagleCard5Effect(move))
    moves.push(...this.getEagleCard6Effect(move))
    moves.push(...this.getEagleCard7Effect(move))
    moves.push(...this.getEagleCard8Effect(move))
    moves.push(...this.getEagleCard10Effect(move))
    moves.push(...this.getEagleCard11Effect(move))
    moves.push(...this.getEagleCard12Effect(move))
    return moves
  }

  getEagleCard1Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity1)) return []
    if (this.isTakeDivinityCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard2Effect(): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity2)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 5) {
      return [this.customMove(CustomMoveType.PayCristalsToGainPotion, { player: this.player, amount: 5, potion: Potion.Leaf })]
    }
    return []
  }

  getEagleCard3Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity3)) return []
    if (this.isTakeDivinityCardMove(move)) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getEagleCard4Effect(): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity4)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 5) {
      return [this.customMove(CustomMoveType.PayCristalsToGainPotion, { player: this.player, amount: 5, potion: Potion.FlowerOrFruit })]
    }
    return []
  }

  getEagleCard5Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity5)) return []
    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles && move.location.player === this.player) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard6Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity6)) return []
    if (this.isTakeDivinityCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard7Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity7)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard8Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity8)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getEagleCard9Effect(): MaterialMove[] {
    const amount = this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity9) ? 3 : 4
    const moves: MaterialMove[] = []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= amount) {
      primaryResources.forEach((resource) => {
        moves.push(this.customMove(CustomMoveType.PayCristalsToGainResource, { player: this.player, resource, amount }))
      })
    }
    return moves
  }

  getEagleCard10Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity10)) return []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && move.location.type === LocationType.SpellBookApprenticeSpace) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard11Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity11)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard12Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity12)) return []
    if (this.isPlaceApprenticeInCauldronField(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  checkPlayerHasEagleDivinityCard(cardId: EagleDivinityCard): boolean {
    return this.material(MaterialType.EagleDivinityCard).location(LocationType.PlayerEagleCards).player(this.player).id(cardId).length > 0
  }

  isTakeDivinityCardMove(move: ItemMove): boolean {
    return (
      (isMoveItemType(MaterialType.EagleDivinityCard)(move) && move.location.type === LocationType.PlayerEagleCards && move.location.player === this.player) ||
      (isMoveItemType(MaterialType.BearDivinityCard)(move) && move.location.type === LocationType.PlayerBearCards && move.location.player === this.player)
    )
  }

  isTakeSalamanderCardMove(move: ItemMove): boolean {
    return (
      (isMoveItemType(MaterialType.BlackSalamanderCard)(move) &&
        move.location.type === LocationType.PlayerBlackSalamanderCards &&
        move.location.player === this.player) ||
      (isMoveItemType(MaterialType.WhiteSalamanderCard)(move) &&
        move.location.type === LocationType.PlayerWhiteSalamanderCards &&
        move.location.player === this.player)
    )
  }

  isPlaceApprenticeInCauldronField(move: ItemMove): boolean {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return false
    if (move.location.type !== LocationType.FieldApprenticeSpace) return false
    const field = this.material(MaterialType.FieldTile).index(move.location.parent).getItem()
    if (field === undefined) return false
    return fieldData[field.id as FieldTile].type === FieldType.Cauldron
  }
}
