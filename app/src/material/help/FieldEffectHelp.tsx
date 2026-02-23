import { Bonus, BonusType } from '@gamepark/salamandra/material/Bonus.ts'
import { Effect, EffectType, Ingredient, IngredientType } from '@gamepark/salamandra/material/Effect.ts'
import { FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { range } from 'es-toolkit'
import { Trans } from 'react-i18next'
import flower from '../../images/icons/flower.jpg'
import fruit from '../../images/icons/fruit.jpg'
import leaf from '../../images/icons/leaf.jpg'
import score from '../../images/icons/score.png'
import { crystalTokenDescription } from '../CrystalTokenDescription.ts'
import { divinityCardDescription } from '../DivinityCardDescription.ts'
import { scrollTokenDescription } from '../ScrollTokenDescription.ts'
import cauldron from '../../images/icons/cauldron.png'
import flowerFruitPotion from '../../images/icons/flower-fruit-potion.jpg'
import leafPotion from '../../images/icons/leaf-potion.jpg'
import billhook from '../../images/icons/sickle.png'
import { HelpIcon, HelpRoundedIcon } from './utils'

export const FieldEffectHelp = ({ effect, field }: { effect: Effect; field: FieldTile }) => {
  switch (effect.type) {
    case EffectType.Crystal:
      return (
        <p>
          <Trans
            i18nKey="help.field.harvest.effect"
            components={{
              effect: <BonusDisplay bonus={{ type: BonusType.Crystal, amount: effect.amount }} />
            }}
          />
        </p>
      )
    case EffectType.PrimaryResource:
      return (
        <p>
          <Trans
            i18nKey="help.field.harvest.effect"
            components={{
              effect: (
                <>
                  <HelpRoundedIcon src={ResourceImage[effect.resource]} />
                  {effect.hasCrystal && <BonusDisplay bonus={{ type: BonusType.Crystal, amount: 1 }} />}
                </>
              )
            }}
          />
        </p>
      )
    case EffectType.Potion:
      return (
        <p>
          <Trans
            i18nKey="help.field.harvest.effect"
            components={{
              effect: (
                <Trans
                  i18nKey="help.field.potion"
                  components={{
                    cost: <IngredientDisplay ingredient={effect.ingredient} />,
                    potion: <HelpRoundedIcon src={effect.potion === Potion.Leaf ? leafPotion : flowerFruitPotion} />
                  }}
                />
              )
            }}
          />
        </p>
      )
    case EffectType.Special:
      if (field === FieldTile.Field9) {
        return (
          <p>
            <Trans
              i18nKey="help.field.harvest.effect"
              components={{
                effect: <Trans i18nKey="help.field.9" components={{ crystal: <HelpIcon src={crystalTokenDescription.image} /> }} />
              }}
            />
          </p>
        )
      } else {
        return (
          <p>
            <Trans
              i18nKey={`help.field.${field}`}
              components={{
                crystal: <HelpIcon src={crystalTokenDescription.image} />,
                scroll: <HelpIcon src={scrollTokenDescription.image} />,
                leaf: <HelpRoundedIcon src={leaf} />,
                flower: <HelpRoundedIcon src={flower} />,
                fruit: <HelpRoundedIcon src={fruit} />,
                cauldron: <HelpIcon src={cauldron} />,
                potion1: <HelpRoundedIcon src={leafPotion} />,
                potion2: <HelpRoundedIcon src={flowerFruitPotion} />
              }}
            />
          </p>
        )
      }
    default:
      return null
  }
}

const IngredientDisplay = ({ ingredient }: { ingredient: Ingredient }) => {
  switch (ingredient.ingredientType) {
    case IngredientType.PrimaryResource:
      return <HelpRoundedIcon src={ResourceImage[ingredient.ingredient as PrimaryResource]} />
    case IngredientType.Crystal:
      return <BonusDisplay bonus={{ type: BonusType.Crystal, amount: ingredient.amount }} />
    case IngredientType.Potion:
      return null
  }
}

export const BonusDisplay = ({ bonus }: { bonus: Bonus }) => {
  switch (bonus.type) {
    case BonusType.Crystal:
      return (
        <>
          {range(bonus.amount).map((key) => (
            <HelpIcon key={key} src={crystalTokenDescription.image} />
          ))}
        </>
      )
    case BonusType.DivinityCard:
      return <HelpIcon src={divinityCardDescription.backImages[bonus.divinity]} />
    case BonusType.Points:
      return (
        <>
          {bonus.amount}
          <HelpIcon src={score} />
        </>
      )
    case BonusType.Scroll:
      return (
        <>
          {range(bonus.count).map((key) => (
            <HelpIcon key={key} src={scrollTokenDescription.image} />
          ))}{' '}
        </>
      )
    default:
      return null
  }
}

const ResourceImage = {
  [PrimaryResource.Leaf]: leaf,
  [PrimaryResource.Flower]: flower,
  [PrimaryResource.Fruit]: fruit
}
