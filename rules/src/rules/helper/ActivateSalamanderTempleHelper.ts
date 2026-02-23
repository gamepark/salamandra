import { isMoveItemType, ItemMove, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { Bonus, BonusType } from '../../material/Bonus'
import { Cost, CostType } from '../../material/Cost'
import { DivinityType } from '../../material/DivinityCard'
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
    if (this.canpay(whiteSalamanderCost) && this.whiteSalamanderCards.length > 0) {
      moves.push(this.whiteSalamanderCards.moveItem({ type: LocationType.PlayerWhiteSalamanderCards, player: this.player }))
    }
    if (this.canpay(blackSalamanderCost) && this.blackSalamanderCards.length > 0) {
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

  afterItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    if (!isMoveItemType(MaterialType.SalamanderCard)(move)) return []
    if (move.location.type !== LocationType.PlayerWhiteSalamanderCards && move.location.type !== LocationType.PlayerBlackSalamanderCards) return []
    const item = this.material(MaterialType.SalamanderCard).index(move.itemIndex).getItem(move.itemIndex)
    const deck = item.location.type === LocationType.PlayerWhiteSalamanderCards ? this.whiteSalamanderCards : this.blackSalamanderCards
    if (deck.length === 0) return []
    return [deck.rotateItem(true)]
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
    return this.material(MaterialType.SalamanderCard).location(LocationType.WhiteSalamanderStack).deck()
  }

  get blackSalamanderCards() {
    return this.material(MaterialType.SalamanderCard).location(LocationType.BlackSalamanderStack).deck()
  }

  get playerApprenticeTokenInField() {
    const rotation = this.remind(MemoryType.ActualRound) % 2 !== 0
    return this.material(MaterialType.ApprenticeToken)
      .location(LocationType.FieldApprenticeSpace)
      .filter((item) => item.id !== undefined && item.id === this.player)
      .rotation(rotation)
  }

  get eagleCards() {
    return this.material(MaterialType.DivinityCard).location(LocationType.EagleDivinityStack).deck()
  }

  get bearCards() {
    return this.material(MaterialType.DivinityCard).location(LocationType.BearDivinityStack).deck()
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
        moves.push(this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player).deleteItem(c.amount))
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
        this.material(MaterialType.ScrollToken).createItem({
          location: { type: LocationType.PlayerScrollTokenStock, player: this.player },
          quantity: bonus.count
        })
      )
    }
    if (bonus.type === BonusType.Points) {
      moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: bonus.amount }))
    }
    const bearCards = this.bearCards
    if (bonus.type === BonusType.DivinityCard) {
      const eagleCards = this.eagleCards
      if (bonus.divinity === DivinityType.Eagle && eagleCards.length > 0) {
        moves.push(eagleCards.dealOne({ type: LocationType.PlayerEagleCards, player: this.player }))
        if (eagleCards.length > 1) moves.push(eagleCards.rotateItem(true))
      }
      if (bonus.divinity === DivinityType.Bear && bearCards.length > 0) {
        moves.push(bearCards.dealOne({ type: LocationType.PlayerBearCards, player: this.player }))
        if (bearCards.length > 1) moves.push(bearCards.rotateItem(true))
      }
    }
    if (bonus.type === BonusType.Special) {
      moves.push(...bonus.effect(this.game))
    }
    if (bonus.type === BonusType.Crystal) {
      moves.push(
        this.material(MaterialType.CrystalToken).createItem({
          location: { type: LocationType.PlayerCrystalTokenStock, player: this.player },
          quantity: bonus.amount
        })
      )
    }
    return moves
  }
}
