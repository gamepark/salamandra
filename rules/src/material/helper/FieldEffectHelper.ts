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
    if (total === 0) return []
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
    moves.push(this.material(MaterialType.ScrollToken).createItem({ location: { type: LocationType.PlayerScrollTokenStock, player: this.player } }))
    moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: 3 }))
    return moves
  }

  twoPointsByCauldron(): MaterialMove[] {
    const cauldronIndexes = this.material(MaterialType.FieldTile)
      .location(LocationType.GameLayout)
      .filter<FieldTile>((item) => fieldData[item.id].type === FieldType.Cauldron)
      .getIndexes()
    const total = this.getNbFieldsWithPlayerApprentice(cauldronIndexes)
    if (total === 0) return []
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 2 })]
  }

  twoPointsByDivinityCard(): MaterialMove[] {
    const total = this.material(MaterialType.DivinityCard).player(this.player).length
    if (total === 0) return []
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 2 })]
  }

  threePointsBySalamanderCard(): MaterialMove[] {
    const total = this.material(MaterialType.SalamanderCard).player(this.player).length
    if (total === 0) return []
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * 3 })]
  }

  pointsByGroveTile(points: number): MaterialMove[] {
    const playerGroveTiles = this.material(MaterialType.GroveTile).location(LocationType.PlayerGroveTiles).player(this.player)
    const total = playerGroveTiles.length
    if (total === 0) return []
    return [this.customMove(CustomMoveType.Score, { player: this.player, score: total * points })]
  }

  private getNbFieldsWithPlayerApprentice(fieldsIndexes: number[]) {
    let total = 0
    fieldsIndexes.forEach((index) => {
      const apprentices = this.material(MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).id(this.player).parent(index)
      if (apprentices.length > 0) {
        total += 1
      }
    })
    return total
  }
}
