import { Location, MaterialGame, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { CustomMoveType } from '../../rules/CustomMove'
import { MemoryType } from '../../rules/MemoryType'
import { BonusType } from '../Bonus'
import { CostType } from '../Cost'
import { crystalTokens } from '../CrystalToken'
import { EffectType, Ingredient, IngredientType } from '../Effect'
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
    const fieldTileId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem<FieldTile>()?.id
    if (fieldTileId) {
      const bonuses = fieldData[fieldTileId].bonus
      bonuses.forEach((bonus) => {
        if (bonus.type === BonusType.Scroll) {
          moves.push(
            ...this.material(MaterialType.ScrollToken)
              .location(LocationType.ScrollTokenStock)
              .limit(bonus.count)
              .moveItems({ type: LocationType.PlayerScrollTokenStock, player: this.player })
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
    const fieldTileId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem<FieldTile>()?.id
    if (fieldTileId) {
      const costs = fieldData[fieldTileId].cost
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
    const fieldTileId = this.material(MaterialType.FieldTile).index(location.parent).getItem<FieldTile>()?.id
    if (fieldTileId) {
      const effect = fieldData[fieldTileId].activationEffect
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
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        playerPotions[effect.potion] += 1
      }
      if (effect.type === EffectType.Special) {
        moves.push(...effect.effect(this.game))
      }
    }
    return moves
  }

  checkIfAtLeastOneFieldAroundIsOfSameColor(fieldIndex: number): boolean {
    const field = this.material(MaterialType.FieldTile).index(fieldIndex).getItem<FieldTile>()
    const fieldLocation = field?.location
    if (!field || !fieldLocation || fieldLocation.x === undefined || fieldLocation.y === undefined) return false
    const fieldColors = fieldData[field.id].colors
    const topFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x, y: fieldLocation.y - 1 }, fieldColors)
    const rightFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x + 1, y: fieldLocation.y }, fieldColors)
    const bottomFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x, y: fieldLocation.y + 1 }, fieldColors)
    const leftFieldHasSameColor = this.checkFieldColors({ x: fieldLocation.x - 1, y: fieldLocation.y }, fieldColors)
    return topFieldHasSameColor || rightFieldHasSameColor || bottomFieldHasSameColor || leftFieldHasSameColor
  }

  checkFieldColors(coordinates: XYCoordinates, fieldColors: FieldColor[]): boolean {
    const field = this.material(MaterialType.FieldTile)
      .location((loc) => loc.type === LocationType.GameLayout && loc.x === coordinates.x && loc.y === coordinates.y)
      .getItem<FieldTile>()
    if (!field) return false
    const colors = fieldData[field.id].colors
    return colors.some((color) => fieldColors.includes(color))
  }

  canActivate(fieldIndex: number): boolean {
    const fieldId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem<FieldTile>()?.id
    if (fieldId === undefined) return false
    const data = fieldData[fieldId]
    switch (data.activationEffect.type) {
      case EffectType.Crystal:
        return true
      case EffectType.PrimaryResource:
        return true
      case EffectType.Potion:
        return this.checkIfCanPay([data.activationEffect.ingredient])
      case EffectType.Special:
        return this.checkIfCanPay(data.activationEffect.ingredients)
    }
  }

  private checkIfCanPay(ingredients: Ingredient[]): boolean {
    let canPay = true
    ingredients.forEach((ingredient) => {
      if (ingredient.ingredientType === IngredientType.Crystal && this.playerCrystals.getQuantity() < ingredient.amount) {
        canPay = false
      }
      if (ingredient.ingredientType === IngredientType.PrimaryResource) {
        const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
        if (ingredient.ingredient) {
          if (playerResources[ingredient.ingredient as PrimaryResource] < ingredient.amount) {
            canPay = false
          }
        } else {
          if (
            playerResources[PrimaryResource.Leaf] < ingredient.amount &&
            playerResources[PrimaryResource.Flower] < ingredient.amount &&
            playerResources[PrimaryResource.Fruit] < ingredient.amount
          ) {
            canPay = false
          }
        }
      }
      if (ingredient.ingredientType === IngredientType.Potion) {
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        if (playerPotions[ingredient.ingredient as Potion] < ingredient.amount) {
          canPay = false
        }
      }
    })
    return canPay
  }

  payActivation(fieldIndex: number): MaterialMove[] {
    const fieldId = this.material(MaterialType.FieldTile).index(fieldIndex).getItem<FieldTile>()?.id
    if (fieldId === undefined) return []
    const data = fieldData[fieldId]
    switch (data.activationEffect.type) {
      case EffectType.Crystal:
        return []
      case EffectType.PrimaryResource:
        return []
      case EffectType.Potion:
        return this.payIngredients([data.activationEffect.ingredient])
      case EffectType.Special:
        return this.payIngredients(data.activationEffect.ingredients)
    }
  }

  private payIngredients(ingredients: Ingredient[]): MaterialMove[] {
    const moves: MaterialMove[] = []
    ingredients.forEach((ingredient) => {
      if (ingredient.ingredientType === IngredientType.Crystal) {
        moves.push(
          ...this.material(MaterialType.CrystalToken)
            .money(crystalTokens)
            .removeMoney(ingredient.amount, { type: LocationType.PlayerCrystalTokenStock, player: this.player })
        )
      }
      if (ingredient.ingredientType === IngredientType.PrimaryResource) {
        const playerResources = this.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, this.player)
        if (ingredient.ingredient) {
          playerResources[ingredient.ingredient as PrimaryResource] -= ingredient.amount
        } else {
          if (playerResources[PrimaryResource.Leaf] >= ingredient.amount) {
            playerResources[PrimaryResource.Leaf] -= ingredient.amount
          } else if (playerResources[PrimaryResource.Flower] >= ingredient.amount) {
            playerResources[PrimaryResource.Flower] -= ingredient.amount
          } else if (playerResources[PrimaryResource.Fruit] >= ingredient.amount) {
            playerResources[PrimaryResource.Fruit] -= ingredient.amount
          }
        }
      }
      if (ingredient.ingredientType === IngredientType.Potion) {
        const playerPotions = this.remind<Record<Potion, number>>(MemoryType.PlayerPotions, this.player)
        playerPotions[ingredient.ingredient as Potion] -= ingredient.amount
      }
    })
    return moves
  }

  get playerCrystals() {
    return this.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(this.player)
  }
}
