import { isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { Bonus, BonusType, DivinityType } from '../../material/Bonus'
import { Cost, CostType } from '../../material/Cost'
import { crystalTokens } from '../../material/CrystalToken'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Potion } from '../../material/Potion'
import { blackSalamanderCost, salamanderBonus, SalamanderCard, SalamanderCardColor, whiteSalamanderCost } from '../../material/SalamanderCard'
import { PlayerColor } from '../../PlayerColor'
import { CustomMoveType } from '../CustomMove'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class ActivateSalamanderTempleHelper extends PlayerTurnRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []
    if (this.playerApprenticeTokenInField.length === 0) return moves
    if (this.canpay(whiteSalamanderCost)) {
      moves.push(this.whiteSalamanderCards.moveItem({ type: LocationType.PlayerWhiteSalamanderCards, player: this.player }))
    }
    if (this.canpay(blackSalamanderCost)) {
      moves.push(this.blackSalamanderCards.moveItem({ type: LocationType.PlayerBlackSalamanderCards, player: this.player }))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (
      isMoveItemType(MaterialType.SalamanderCard)(move) &&
      (move.location.type === LocationType.PlayerBlackSalamanderCards || move.location.type === LocationType.PlayerWhiteSalamanderCards)
    ) {
      moves.push(...this.onBuySalamanderCard(move))
    }
    return moves
  }

  onBuySalamanderCard(move: MoveItem) {
    const moves: MaterialMove[] = []
    this.memorize<RuleId[]>(MemoryType.NextRules, (old: RuleId[] = []) => old.concat(RuleId.ChooseApprenticeToActivate))
    const item = this.material(MaterialType.SalamanderCard).index(move.itemIndex).getItem<{ front: SalamanderCard; back: SalamanderCardColor }>()!
    moves.push(...this.pay(item))
    moves.push(...this.getSalamanderBonus(item))
    moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    return moves
  }

  getSalamanderBonus(item: MaterialItem<PlayerColor, LocationType, { front: SalamanderCard; back: SalamanderCardColor }>): MaterialMove[] {
    const salamanderId = item.id
    const bonuses: Bonus[] = salamanderBonus[salamanderId.front]
    return bonuses.flatMap((bonus) => this.getSalamanderCardBonus(bonus))
  }

  get whiteSalamanderCards() {
    return this.material(MaterialType.SalamanderCard)
      .location(LocationType.WhiteSalamanderStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get blackSalamanderCards() {
    return this.material(MaterialType.SalamanderCard)
      .location(LocationType.BlackSalamanderStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .rotation(rotation)
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

  private pay(item: MaterialItem<PlayerColor, LocationType, { front: SalamanderCard; back: SalamanderCardColor }>): MaterialMove[] {
    const moves: MaterialMove[] = []
    const cost = item.id.back === SalamanderCardColor.Black ? blackSalamanderCost : whiteSalamanderCost
    for (const c of cost) {
      if (c.type === CostType.Potion) {
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        playerPotions[c.potion] -= 1
      }
      if (c.type === CostType.Crystal) {
        moves.push(
          ...this.material(MaterialType.CrystalToken)
            .money(crystalTokens)
            .removeMoney(c.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
        )
      }
    }
    return moves
  }

  private canpay(cost: Cost[]) {
    let canPay = true
    for (const c of cost) {
      if (c.type === CostType.Potion) {
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        if (playerPotions[c.potion] < 1) canPay = false
      }
      if (c.type === CostType.Crystal) {
        const playerCrystals = this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player).getQuantity()
        if (playerCrystals < c.amount) canPay = false
      }
    }
    return canPay
  }

  private getSalamanderCardBonus(bonus: Bonus): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (bonus.type === BonusType.Scroll) {
      moves.push(
        ...this.material(MaterialType.ScrollToken)
          .location(LocationType.ScrollTokenStock)
          .moveItems({ type: LocationType.PlayerScrollTokenStock, player: this.player }, bonus.count)
      )
    }
    if (bonus.type === BonusType.Points) {
      moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: bonus.amount }))
    }
    if (bonus.type === BonusType.DivinityCard) {
      if (bonus.divinity === DivinityType.Eagle && this.eagleCards.length > 0) {
        moves.push(this.eagleCards.moveItem({ type: LocationType.PlayerEagleCards, player: this.player }))
      }
      if (bonus.divinity === DivinityType.Bear && this.bearCards.length > 0) {
        moves.push(this.bearCards.moveItem({ type: LocationType.PlayerBearCards, player: this.player }))
      }
    }
    if (bonus.type === BonusType.Special) {
      moves.push(...bonus.effect(this.game))
    }
    if (bonus.type === BonusType.Crystal) {
      moves.push(
        ...this.material(MaterialType.CrystalToken)
          .money(crystalTokens)
          .addMoney(bonus.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
      )
    }
    return moves
  }
}
