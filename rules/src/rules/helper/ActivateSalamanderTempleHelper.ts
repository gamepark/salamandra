import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart, PlayMoveContext } from '@gamepark/rules-api'
import { blackSalamanderBonus, blackSalamanderCost } from '../../material/BlackSalamanderCard'
import { Bonus, BonusType, DivinityType } from '../../material/Bonus'
import { Cost, CostType } from '../../material/Cost'
import { crystalTokens } from '../../material/CrystalToken'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Potion } from '../../material/Potion'
import { whiteSalamanderBonus, WhiteSalamanderCard, whiteSalamanderCost } from '../../material/WhiteSalamanderCard'
import { PlayerColor } from '../../PlayerColor'
import { CustomMoveType } from '../CustomMove'
import { MemoryType } from '../MemoryType'
import { RuleId } from '../RuleId'
import { NextRuleHelper } from './NextRuleHelper'

export class ActivateSalamanderTempleHelper extends MaterialRulesPart {
  player?: PlayerColor
  nextPlayer: PlayerColor

  constructor(game: MaterialGame, nextPlayer: PlayerColor, player = game.rule?.player) {
    super(game)
    this.player = player
    this.nextPlayer = nextPlayer
  }

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

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.WhiteSalamanderCard)(move) && move.location.type === LocationType.PlayerWhiteSalamanderCards) {
      this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.ChooseApprenticeToActivate])
      moves.push(...this.pay(whiteSalamanderCost))
      moves.push(...this.getWhiteSalamanderBonus(move.itemIndex))
      moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    }
    if (isMoveItemType(MaterialType.BlackSalamanderCard)(move) && move.location.type === LocationType.PlayerBlackSalamanderCards) {
      this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.ChooseApprenticeToActivate])
      moves.push(...this.pay(blackSalamanderCost))
      moves.push(...this.getBlackSalamanderBonus(move.itemIndex))
      moves.push(...new NextRuleHelper(this.game).moveToNextRule())
    }
    return moves
  }

  getWhiteSalamanderBonus(itemIndex: number): MaterialMove[] {
    const salamanderId = this.material(MaterialType.WhiteSalamanderCard).index(itemIndex).getItem()?.id
    if (salamanderId) {
      const bonuses: Bonus[] = whiteSalamanderBonus[salamanderId as WhiteSalamanderCard]
      return bonuses.flatMap((bonus) => this.getSalamanderCardBonus(bonus))
    }
    return []
  }

  getBlackSalamanderBonus(itemIndex: number): MaterialMove[] {
    const salamanderId = this.material(MaterialType.BlackSalamanderCard).index(itemIndex).getItem()?.id
    if (salamanderId) {
      const bonuses: Bonus[] = blackSalamanderBonus[salamanderId as WhiteSalamanderCard]
      return bonuses.flatMap((bonus) => this.getSalamanderCardBonus(bonus))
    }
    return []
  }

  get whiteSalamanderCards() {
    return this.material(MaterialType.WhiteSalamanderCard)
      .location(LocationType.WhiteSalamanderStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get blackSalamanderCards() {
    return this.material(MaterialType.BlackSalamanderCard)
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
    return this.material(MaterialType.EagleDivinityCard)
      .location(LocationType.EagleDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  get bearCards() {
    return this.material(MaterialType.BearDivinityCard)
      .location(LocationType.BearDivinityStack)
      .maxBy((item) => item.location.x ?? 0)
  }

  private pay(cost: Cost[]): MaterialMove[] {
    const moves: MaterialMove[] = []
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
        this.material(MaterialType.ScrollToken)
          .location(LocationType.ScrollTokenStock)
          .moveItem({ type: LocationType.PlayerScrollTokenStock, player: this.player })
      )
    }
    if (bonus.type === BonusType.Points) {
      moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: bonus.amount }))
    }
    if (bonus.type === BonusType.DivinityCard) {
      if (bonus.divinity === DivinityType.Eagle && this.eagleCards.length > 0) {
        moves.push(this.eagleCards.moveItem({ type: LocationType.PlayerEagleCards, x: undefined, player: this.player }))
      }
      if (bonus.divinity === DivinityType.Bear && this.bearCards.length > 0) {
        moves.push(this.bearCards.moveItem({ type: LocationType.PlayerBearCards, x: undefined, player: this.player }))
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
