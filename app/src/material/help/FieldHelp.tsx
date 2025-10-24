import { css } from '@emotion/react'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Bonus, BonusType } from '@gamepark/salamandra/material/Bonus.ts'
import { Cost, CostType } from '@gamepark/salamandra/material/Cost'
import { Effect, EffectType, Ingredient, IngredientType } from '@gamepark/salamandra/material/Effect.ts'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { range } from 'es-toolkit'
import { times } from 'es-toolkit/compat'
import { Trans, useTranslation } from 'react-i18next'
import cauldron from '../../images/icons/cauldron.png'
import flowerFruitPotion from '../../images/icons/flower-fruit-potion.jpg'
import flower from '../../images/icons/flower.jpg'
import fruit from '../../images/icons/fruit.jpg'
import leafPotion from '../../images/icons/leaf-potion.jpg'
import leaf from '../../images/icons/leaf.jpg'
import score from '../../images/icons/score.png'
import billhook from '../../images/icons/sickle.png'
import { crystalTokenDescription } from '../CrystalTokenDescription'
import { divinityCardDescription } from '../DivinityCardDescription.ts'
import { scrollTokenDescription } from '../ScrollTokenDescription.ts'
import { potionImages, primaryResourceImages } from './utils'

export const FieldHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  if (!item.id) return <h2>{t('help.field')}</h2>
  const field = item.id as FieldTile
  const { cost, bonus, activationEffect } = fieldData[field]
  const isFree = cost.length === 0
  return (
    <>
      <h2>{isFree ? t('help.field.start') : t('help.field')}</h2>
      {!isFree && <p><Trans i18nKey="help.field.cost" components={{ cost: <CostDisplay resources={cost}/> }}/></p>}
      <p><Trans i18nKey="help.field.bonus" components={{ bonus: <BonusesDisplay bonuses={bonus}/> }}/></p>
      <FieldEffectHelp effect={activationEffect} field={field}/>
    </>
  )
}

type CostDisplayProps = {
  resources: Cost[]
}

const CostDisplay = ({ resources }: CostDisplayProps) => {
  const images = resources.flatMap((cost: Cost) => getImages(cost))
  return (
    <>
      {images.map((image, index) => <Picture key={index} src={image}/>)}
    </>
  )
}

const getImages = (cost: Cost) => {
  if (cost.type === CostType.Crystal) {
    return times(cost.amount, () => crystalTokenDescription.image)
  }

  if (cost.type === CostType.Resource) {
    return times(cost.amount, () => primaryResourceImages[cost.resource])
  }

  return potionImages[cost.potion]
}

const BonusesDisplay = ({ bonuses }: { bonuses: Bonus[] }) => {
  return <>{bonuses.map((bonus, index) => <BonusDisplay key={index} bonus={bonus}/>)}</>
}

const BonusDisplay = ({ bonus }: { bonus: Bonus }) => {
  switch (bonus.type) {
    case BonusType.Crystal:
      return <>{range(bonus.amount).map((key) => <Picture key={key} src={crystalTokenDescription.image}/>)}</>
    case BonusType.DivinityCard:
      return <><Picture src={divinityCardDescription.backImages[bonus.divinity]}/></>
    case BonusType.Points:
      return <>{bonus.amount}<Picture src={score}/></>
    case BonusType.Scroll:
      return <>{range(bonus.count).map((key) => <Picture key={key} src={scrollTokenDescription.image}/>)} </>
    default:
      return null
  }
}

const FieldEffectHelp = ({ effect, field }: { effect: Effect, field: FieldTile }) => {
  switch (effect.type) {
    case EffectType.Crystal:
      return <p><Trans i18nKey="help.field.harvest" components={{
        billhook: <Picture src={billhook}/>,
        effect: <BonusDisplay bonus={{ type: BonusType.Crystal, amount: effect.amount }}/>
      }}/></p>
    case EffectType.PrimaryResource:
      return <p><Trans i18nKey="help.field.harvest" components={{
        billhook: <Picture src={billhook}/>,
        effect: <>
          <Picture src={ResourceImage[effect.resource]}/>
          {effect.hasCrystal && <BonusDisplay bonus={{ type: BonusType.Crystal, amount: 1 }}/>}
        </>
      }}/></p>
    case EffectType.Potion:
      return <p><Trans i18nKey="help.field.harvest" components={{
        billhook: <Picture src={billhook}/>,
        effect: <Trans i18nKey="help.field.potion" components={{
          cost: <IngredientDisplay ingredient={effect.ingredient}/>,
          potion: <Picture src={effect.potion === Potion.Leaf ? leafPotion : flowerFruitPotion}/>
        }}/>
      }}/></p>
    case EffectType.Special:
      if (field === FieldTile.Field9) {
        return <p><Trans i18nKey="help.field.harvest" components={{
          billhook: <Picture src={billhook}/>,
          effect: <Trans i18nKey="help.field.9" components={{ crystal: <Picture src={crystalTokenDescription.image}/> }}/>
        }}/></p>
      } else {
        return <>
          <h3><Trans i18nKey="help.field.cauldron" components={{ cauldron: <Picture src={cauldron} css={css`height: 1em;`}/> }}/></h3>
          <p><Trans i18nKey={`help.field.${field}`} components={{
            crystal: <Picture src={crystalTokenDescription.image}/>,
            scroll: <Picture src={scrollTokenDescription.image}/>,
            leaf: <Picture src={leaf}/>,
            flower: <Picture src={flower}/>,
            fruit: <Picture src={fruit}/>,
            cauldron: <Picture src={cauldron}/>,
            potion1: <Picture src={leafPotion}/>,
            potion2: <Picture src={flowerFruitPotion}/>
          }}/></p>
        </>
      }
    default:
      return null
  }
}

const ResourceImage = {
  [PrimaryResource.Leaf]: leaf,
  [PrimaryResource.Flower]: flower,
  [PrimaryResource.Fruit]: fruit
}

const IngredientDisplay = ({ ingredient }: { ingredient: Ingredient }) => {
  switch (ingredient.ingredientType) {
    case IngredientType.PrimaryResource:
      return <Picture src={ResourceImage[ingredient.ingredient as PrimaryResource]}/>
    case IngredientType.Crystal:
      return <BonusDisplay bonus={{ type: BonusType.Crystal, amount: ingredient.amount }}/>
    case IngredientType.Potion:
      return null
  }
}
