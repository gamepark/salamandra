import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { MemoryType } from '../../rules/MemoryType'
import { RuleId } from '../../rules/RuleId'
import { FieldColor, fieldData, FieldTile, FieldType } from '../FieldTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'

export class FieldEffectHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  gainPointsForSpecificField(points: number, fieldColor: FieldColor): MaterialMove[] {
    const fieldsIndexes = this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .filter<FieldTile>((item) => fieldData[item.id].colors.includes(fieldColor))
      .getIndexes()
    const total = this.getNbFieldsWithPlayerApprentice(fieldsIndexes)
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * points })]
  }

  reactivateApprentice(): MaterialMove[] {
    this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.ReactivateApprentice])
    return []
  }

  takeGroveTile(): MaterialMove[] {
    this.memorize<RuleId[]>(MemoryType.NextRules, (old?: RuleId[]) => [...(old ?? []), RuleId.TakeGroveTile])
    return []
  }

  takeScrollAndThreePoints(): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(
      this.material(MaterialType.ScrollToken)
        .location(LocationType.ScrollTokenStock)
        .moveItem({ type: LocationType.PlayerScrollTokenStock, player: this.player })
    )
    moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: 3 }))
    return moves
  }

  twoPointsByCauldron(): MaterialMove[] {
    const cauldronIndexes = this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .filter<FieldTile>((item) => fieldData[item.id].type === FieldType.Cauldron)
      .getIndexes()
    const total = this.getNbFieldsWithPlayerApprentice(cauldronIndexes)
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 2 })]
  }

  twoPointsByDivinityCard(): MaterialMove[] {
    const playerEagleDivinityCards = this.material(MaterialType.EagleDivinityCard).location(LocationType.PlayerEagleCards).player(this.player)
    const playerBearDivinityCards = this.material(MaterialType.BearDivinityCard).location(LocationType.PlayerBearCards).player(this.player)
    const total = playerBearDivinityCards.length + playerEagleDivinityCards.length
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 2 })]
  }

  threePointsBySalamanderCard(): MaterialMove[] {
    const playerWhiteSalamanderCards = this.material(MaterialType.WhiteSalamanderCard).location(LocationType.PlayerWhiteSalamanderCards).player(this.player)
    const playerBlackSalamanderCards = this.material(MaterialType.BlackSalamanderCard).location(LocationType.PlayerBlackSalamanderCards).player(this.player)
    const total = playerBlackSalamanderCards.length + playerWhiteSalamanderCards.length
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 3 })]
  }

  threePointsByGroveTile(): MaterialMove[] {
    const playerGroveTiles = this.material(MaterialType.GroveTile).location(LocationType.PlayerGroveTiles).player(this.player)
    const total = playerGroveTiles.length
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 3 })]
  }

  private getNbFieldsWithPlayerApprentice(fieldsIndexes: number[]) {
    let total = 0
    fieldsIndexes.forEach((index) => {
      const apprentices = this.material(MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).parent(index)
      if (apprentices.length > 0) {
        total += 1
      }
    })
    return total
  }
}
