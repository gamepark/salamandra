import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Bonus, BonusType } from '@gamepark/salamandra/material/Bonus.ts'
import { Cost, CostType } from '@gamepark/salamandra/material/Cost'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile'
import { range } from 'es-toolkit'
import { times } from 'es-toolkit/compat'
import { Trans, useTranslation } from 'react-i18next'
import score from '../../images/icons/score.png'
import { crystalTokenDescription } from '../CrystalTokenDescription'
import { divinityCardDescription } from '../DivinityCardDescription.ts'
import { scrollTokenDescription } from '../ScrollTokenDescription.ts'
import { potionImages, primaryResourceImages } from './utils'

export const FieldHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  if (!item.id) return <h2>{t('help.field')}</h2>
  const { cost, bonus } = fieldData[item.id as FieldTile]
  const isFree = cost.length === 0
  return (
    <>
      <h2>{isFree ? t('help.field.start') : t('help.field')}</h2>
      {!isFree && <p><Trans i18nKey="help.field.cost" components={{ cost: <CostDisplay resources={cost}/> }}/></p>}
      <p><Trans i18nKey="help.field.bonus" components={{ bonus: <BonusesDisplay bonuses={bonus}/> }}/></p>
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
