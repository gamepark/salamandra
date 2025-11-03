import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
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

export const FieldEffectHelp = ({ effect, field }: { effect: Effect; field: FieldTile }) => {
  switch (effect.type) {
    case EffectType.Crystal:
      return (
        <p>
          <Trans
            i18nKey="help.field.harvest"
            components={{
              billhook: <Picture src={billhook} />,
              effect: <BonusDisplay bonus={{ type: BonusType.Crystal, amount: effect.amount }} />
            }}
          />
        </p>
      )
    case EffectType.PrimaryResource:
      return (
        <p>
          <Trans
            i18nKey="help.field.harvest"
            components={{
              billhook: <Picture src={billhook} />,
              effect: (
                <>
                  <Picture src={ResourceImage[effect.resource]} css={roundedCss} />
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
            i18nKey="help.field.harvest"
            components={{
              billhook: <Picture src={billhook} />,
              effect: (
                <Trans
                  i18nKey="help.field.potion"
                  components={{
                    cost: <IngredientDisplay ingredient={effect.ingredient} />,
                    potion: <Picture src={effect.potion === Potion.Leaf ? leafPotion : flowerFruitPotion} css={roundedCss} />
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
              i18nKey="help.field.harvest"
              components={{
                billhook: <Picture src={billhook} />,
                effect: <Trans i18nKey="help.field.9" components={{ crystal: <Picture src={crystalTokenDescription.image} /> }} />
              }}
            />
          </p>
        )
      } else {
        return (
          <>
            <h3>
              <Trans
                i18nKey="help.field.cauldron"
                components={{
                  cauldron: (
                    <Picture
                      src={cauldron}
                      css={css`
                        height: 1em;
                      `}
                    />
                  )
                }}
              />
            </h3>
            <p>
              <Trans
                i18nKey={`help.field.${field}`}
                components={{
                  crystal: <Picture src={crystalTokenDescription.image} />,
                  scroll: <Picture src={scrollTokenDescription.image} />,
                  leaf: <Picture src={leaf} css={roundedCss} />,
                  flower: <Picture src={flower} css={roundedCss} />,
                  fruit: <Picture src={fruit} css={roundedCss} />,
                  cauldron: <Picture src={cauldron} />,
                  potion1: <Picture src={leafPotion} css={roundedCss} />,
                  potion2: <Picture src={flowerFruitPotion} css={roundedCss} />
                }}
              />
            </p>
          </>
        )
      }
    default:
      return null
  }
}

const IngredientDisplay = ({ ingredient }: { ingredient: Ingredient }) => {
  switch (ingredient.ingredientType) {
    case IngredientType.PrimaryResource:
      return <Picture src={ResourceImage[ingredient.ingredient as PrimaryResource]} css={roundedCss} />
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
            <Picture key={key} src={crystalTokenDescription.image} />
          ))}
        </>
      )
    case BonusType.DivinityCard:
      return (
        <>
          <Picture src={divinityCardDescription.backImages[bonus.divinity]} />
        </>
      )
    case BonusType.Points:
      return (
        <>
          {bonus.amount}
          <Picture src={score} />
        </>
      )
    case BonusType.Scroll:
      return (
        <>
          {range(bonus.count).map((key) => (
            <Picture key={key} src={scrollTokenDescription.image} />
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

const roundedCss = {
  borderRadius: '1em'
}
