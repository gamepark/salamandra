import { Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { BonusType } from '../Bonus'
import { fieldData, FieldTile } from '../FieldTile'
import { MaterialType } from '../MaterialType'

export class FieldTileHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getFieldBonus(location: Partial<Location>): MaterialMove[] {
    if(location.x !== 0) return []
    const moves: MaterialMove[] = []
    const fieldTileId = this.material(MaterialType.FieldTile).index(location.parent).getItem()?.id
    if (fieldTileId) {
      const bonuses = fieldData[fieldTileId as FieldTile].bonus
      bonuses.forEach((bonus) => {
        if (bonus.type === BonusType.Scroll) {
          // TODO ajouter un bonus de type Scroll
        }
        if (bonus.type === BonusType.Points) {
          moves.push(this.customMove(CustomMoveType.Score, { player: this.player, score: bonus.amount }))
        }
      })
    }
    return moves
  }
}
