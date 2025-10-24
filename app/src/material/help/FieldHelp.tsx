import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { Cost, CostType } from '@gamepark/salamandra/material/Cost'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile'
import { times } from 'es-toolkit/compat'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { crystalTokenDescription } from '../CrystalTokenDescription'
import { potionImages, primaryResourceImages } from './utils'

export const FieldHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  if (!item.id) return null
  const cost = fieldData[item.id as FieldTile].cost
  const isFree = cost.length === 0
  return (
    <>
      <h2>{isFree ? t('help.field.start') : t('help.field')}</h2>
      {!isFree && <p><Trans i18nKey="help.field.cost" components={{ cost: <CostDisplay resources={fieldData[item.id as FieldTile].cost}/> }}/></p>}
      {/*<p><Trans i18nKey="help.field.bonus" components={{ bonus: <></> }}/></p>*/}
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
