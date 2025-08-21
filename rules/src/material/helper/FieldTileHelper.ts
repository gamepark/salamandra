import { Location, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { MemoryType } from '../../rules/MemoryType'
import { BonusType } from '../Bonus'
import { CostType } from '../Cost'
import { crystalTokens } from '../CrystalToken'
import { EffectType, IngredientType } from '../Effect'
import { FieldColor, fieldData, FieldTile } from '../FieldTile'
import { LocationType } from '../LocationType'
import { MaterialType } from '../MaterialType'
import { Potion } from '../Potion'
import { PrimaryResource } from '../PrimaryResource'

export class FieldTileHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  getFieldBonus(fieldIndex: number): MaterialMove[] {
    const moves: MaterialMove[] = []
    const fieldTileId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem()?.id
    if (fieldTileId) {
      const bonuses = fieldData[fieldTileId as FieldTile].bonus
      bonuses.forEach((bonus) => {
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
      })
    }
    return moves
  }

  payFieldCoast(fieldIndex: number): MaterialMove[] {
    const moves: MaterialMove[] = []
    const fieldTileId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem()?.id
    if (fieldTileId) {
      const costs = fieldData[fieldTileId as FieldTile].cost
      costs.forEach((cost) => {
        if (cost.type === CostType.Crystal) {
          moves.push(
            ...this.material(MaterialType.CrystalToken)
              .money(crystalTokens)
              .removeMoney(cost.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
          )
        }
        if (cost.type === CostType.Resource) {
          const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
          playerResources[cost.resource] -= cost.amount
        }
      })
    }
    return moves
  }

  getActivationEffet(location: Partial<Location>): MaterialMove[] {
    const moves: MaterialMove[] = []
    const fieldTileId = this.material(MaterialType.FieldTile).index(location.parent).getItem()?.id
    if (fieldTileId) {
      const effect = fieldData[fieldTileId as FieldTile].activationEffect
      if (effect.type === EffectType.Crystal) {
        moves.push(
          ...this.material(MaterialType.CrystalToken)
            .money(crystalTokens)
            .addMoney(effect.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
        )
      }
      if (effect.type === EffectType.PrimaryResource) {
        const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
        playerResources[effect.resource] += effect.amount
        if (effect.hasCrystal) {
          moves.push(
            ...this.material(MaterialType.CrystalToken).money(crystalTokens).addMoney(1, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
          )
        }
      }
      if (effect.type === EffectType.Potion) {
        if (effect.ingredient.ingredientType === IngredientType.PrimaryResource) {
          if (effect.ingredient.ingredient) {
            const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
            playerResources[effect.ingredient.ingredient as PrimaryResource] -= effect.ingredient.amount
          }
        }
        if (effect.ingredient.ingredientType === IngredientType.Crystal) {
          moves.push(
            ...this.material(MaterialType.CrystalToken)
              .money(crystalTokens)
              .removeMoney(effect.ingredient.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
          )
        }
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        playerPotions[effect.potion] += 1
      }
      if (effect.type === EffectType.Special) {
        effect.ingredients.forEach((ingredient) => {
          if (ingredient.ingredientType === IngredientType.PrimaryResource) {
            if (ingredient.ingredient) {
              const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
              playerResources[ingredient.ingredient as PrimaryResource] -= ingredient.amount
            }
          }
          if (ingredient.ingredientType === IngredientType.Potion) {
            if (ingredient.ingredient) {
              const playerPotion = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
              playerPotion[ingredient.ingredient as Potion] -= ingredient.amount
            }
          }
          if (ingredient.ingredientType === IngredientType.Crystal) {
            moves.push(
              ...this.material(MaterialType.CrystalToken)
                .money(crystalTokens)
                .removeMoney(ingredient.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
            )
          }
        })
        moves.push(...effect.effect(this.game))
      }
    }
    return moves
  }

  checkIfAtLeastOneFieldAroundIsOfSameColor(fieldIndex: number): boolean {
    const field = this.material(MaterialType.FieldTile).index(fieldIndex).getItem()
    const fieldLocation = field?.location
    if (!field || !fieldLocation || fieldLocation.x === undefined || fieldLocation.y === undefined) return false
    const fieldColors = fieldData[field.id as FieldTile].colors
    const topFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x, y: fieldLocation.y - 1 }, fieldColors)
    const rightFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x + 1, y: fieldLocation.y }, fieldColors)
    const bottomFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x, y: fieldLocation.y + 1 }, fieldColors)
    const leftFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x - 1, y: fieldLocation.y }, fieldColors)
    return topFieldHasSameColor || rightFieldHasSameColor || bottomFieldHasSameColor || leftFieldHasSameColor
  }

  checkFieldColors(coordinates: XYCoordinates, fieldColors: FieldColor[]): boolean {
    const field = this.material(MaterialType.FieldTile).location(loc => loc.type === LocationType.GameLayout && loc.x === coordinates.x && loc.y === coordinates.y).getItem()
    if (!field) return false
    const colors = fieldData[field.id as FieldTile].colors
    return colors.some((color) => fieldColors.includes(color))
  }
}
