import { MaterialHelpProps } from '@gamepark/react-game'
import { Bonus } from '@gamepark/salamandra/material/Bonus.ts'
import { Cost, CostType } from '@gamepark/salamandra/material/Cost'
import { fieldData, FieldTile, FieldType } from '@gamepark/salamandra/material/FieldTile'
import { times } from 'es-toolkit/compat'
import { Trans, useTranslation } from 'react-i18next'
import { crystalTokenDescription } from '../CrystalTokenDescription'
import { BonusDisplay, FieldEffectHelp } from './FieldEffectHelp.tsx'
import {
  components,
  potionImages,
  primaryResourceImages,
  HelpIcon,
  HelpRoundedIcon,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpSecondaryCss,
  helpCostLabeledCss,
  helpImportantLabeledCss,
  helpGainLabeledCss
} from './utils'

export const FieldHelp = ({ item }: MaterialHelpProps) => {
  const { t } = useTranslation()
  if (!item.id) return <FieldDeckHelp />
  const field = item.id as FieldTile
  const { cost, bonus, activationEffect } = fieldData[field]
  const isFree = cost.length === 0
  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{isFree ? t('help.field.start') : t('help.field')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      {!isFree && (
        <div css={helpCostLabeledCss}>
          <Trans defaults="help.field.cost.label" components={components} />
          <p><CostDisplay resources={cost} /></p>
        </div>
      )}

      <div css={helpGainLabeledCss}>
        <Trans defaults="help.field.bonus.label" components={components} />
        <p>
          <Trans i18nKey="help.field.bonus" components={{ ...components, bonus: <BonusesDisplay bonuses={bonus} /> }} />
        </p>
      </div>

      <div css={helpImportantLabeledCss}>
        <Trans defaults={fieldData[field].type === FieldType.Cauldron ? 'help.field.cauldron.label' : 'help.field.harvest.label'} components={components} />
        <FieldEffectHelp effect={activationEffect} field={field} />
      </div>
    </div>
  )
}

type CostDisplayProps = {
  resources: Cost[]
}

const CostDisplay = ({ resources }: CostDisplayProps) => {
  const images = resources.flatMap((cost: Cost) => getCostImages(cost))
  return (
    <>
      {images.map(({ image, rounded }, index) =>
        rounded ? <HelpRoundedIcon key={index} src={image} /> : <HelpIcon key={index} src={image} />
      )}
    </>
  )
}

const getCostImages = (cost: Cost) => {
  if (cost.type === CostType.Crystal) {
    return times(cost.amount, () => ({ image: crystalTokenDescription.image, rounded: false }))
  }

  if (cost.type === CostType.Resource) {
    return times(cost.amount, () => ({ image: primaryResourceImages[cost.resource], rounded: true }))
  }

  return [{ image: potionImages[cost.potion], rounded: true }]
}

const FieldDeckHelp = () => {
  const { t } = useTranslation()
  return (
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.field.deck')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>
      <div css={helpSecondaryCss}>
        <p>
          <Trans defaults="help.field.deck.description" components={components} />
        </p>
      </div>
    </div>
  )
}

const BonusesDisplay = ({ bonuses }: { bonuses: Bonus[] }) => {
  return (
    <>
      {bonuses.map((bonus, index) => (
        <BonusDisplay key={index} bonus={bonus} />
      ))}
    </>
  )
}
