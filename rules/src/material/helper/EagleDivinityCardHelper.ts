import { isMoveItemType, ItemMove, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { RuleId } from '../../rules/RuleId'
import { crystalTokens } from '../CrystalToken'
import { DivinityCard, DivinityCardId } from '../DivinityCard'
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

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    moves.push(...this.getEagleCard1Effect(move))
    moves.push(...this.getEagleCard3Effect(move))
    moves.push(...this.getEagleCard6Effect(move))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.getEagleCard5Effect(move))
    moves.push(...this.getEagleCard7Effect(move))
    moves.push(...this.getEagleCard8Effect(move))
    moves.push(...this.getEagleCard10Effect(move))
    moves.push(...this.getEagleCard11Effect(move))
    moves.push(...this.getEagleCard12Effect(move))
    return moves
  }

  getEagleCard1Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity1)) return []
    if (this.isTakeDivinityCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard2Effect(): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity2)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 5) {
      return [this.customMove(CustomMoveType.PayCrystalsToGainPotion, { player: this.player, amount: 5, potion: Potion.Leaf })]
    }
    return []
  }

  getEagleCard3Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity3)) return []
    if (this.isTakeDivinityCardMove(move)) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getEagleCard4Effect(): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity4)) return []
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= 5) {
      return [this.customMove(CustomMoveType.PayCrystalsToGainPotion, { player: this.player, amount: 5, potion: Potion.FlowerOrFruit })]
    }
    return []
  }

  getEagleCard5Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity5)) return []
    if (isMoveItemType(MaterialType.GroveTile)(move) && move.location.type === LocationType.PlayerGroveTiles && move.location.player === this.player) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard6Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity6)) return []
    console.log('Eagle card 6 move : ', move)
    if (this.isTakeDivinityCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard7Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity7)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard8Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity8)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
    }
    return []
  }

  getEagleCard9Effect(): MaterialMove[] {
    const amount = this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity9) ? 3 : 4
    const moves: MaterialMove[] = []
    if (this.game.rule?.id === RuleId.ChooseApprenticeToActivate || this.game.rule?.id === RuleId.ReactivateApprentice) return moves
    const crystals = this.material(MaterialType.CrystalToken).player(this.player)
    if (crystals.getQuantity() >= amount) {
      primaryResources.forEach((resource) => {
        moves.push(this.customMove(CustomMoveType.PayCrystalsToGainResource, { player: this.player, resource, amount }))
      })
    }
    return moves
  }

  getEagleCard10Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity10)) return []
    if (isMoveItemType(MaterialType.ApprenticeToken)(move) && move.location.type === LocationType.SpellBookApprenticeSpace) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 2 })]
    }
    return []
  }

  getEagleCard11Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity11)) return []
    if (this.isTakeSalamanderCardMove(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  getEagleCard12Effect(move: ItemMove): MaterialMove[] {
    if (!this.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity12)) return []
    if (this.isPlaceApprenticeInCauldronField(move)) {
      return [this.customMove(CustomMoveType.Score, { player: this.player, score: 1 })]
    }
    return []
  }

  checkPlayerHasEagleDivinityCard(cardId: DivinityCard): boolean {
    return (
      this.material(MaterialType.DivinityCard)
        .location(LocationType.PlayerEagleCards)
        .player(this.player)
        .id(({ front }: DivinityCardId) => front === cardId).length > 0
    )
  }

  isTakeDivinityCardMove(move: ItemMove): boolean {
    console.log('Is take divinity card : ', move)
    return (
      (isMoveItemType(MaterialType.DivinityCard)(move) && move.location.type === LocationType.PlayerEagleCards && move.location.player === this.player) ||
      (isMoveItemType(MaterialType.DivinityCard)(move) && move.location.type === LocationType.PlayerBearCards && move.location.player === this.player)
    )
  }

  isTakeSalamanderCardMove(move: ItemMove): boolean {
    return isMoveItemType(MaterialType.SalamanderCard)(move) && move.location.player === this.player
  }

  isPlaceApprenticeInCauldronField(move: ItemMove): boolean {
    const field = this.getFieldItem(move)
    if (field === undefined) return false
    return fieldData[field.id as FieldTile].type === FieldType.Cauldron
  }

  getFieldItem(move: ItemMove): MaterialItem | undefined {
    if (!isMoveItemType(MaterialType.ApprenticeToken)(move)) return
    const item = this.material(MaterialType.ApprenticeToken).getItem(move.itemIndex)
    if (item.location.type === LocationType.FieldApprenticeSpace || move.location.type !== LocationType.FieldApprenticeSpace) return
    return this.material(MaterialType.FieldTile).index(move.location.parent).getItem()
  }
}
