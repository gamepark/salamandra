/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialComponent, MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ActivateApprenticeToGainCrystal } from '../../buttons/ActivateApprenticeToGainCrystal'
import { ActivateTile } from '../../buttons/ActivateTile'
import { components } from './utils'

export const ApprenticeTokenHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  const druid = rules.material(MaterialType.DruidTile).id(item.id)
  const druitIndex = druid.getIndex()
  const druitRotation = druid.getItem()!.location.rotation
  const isSameRotation = item.location?.rotation === druitRotation

  return (
    <div css={descriptionCss}>
      <h2>{t('help.apprentice')}</h2>
      <p>
        <Trans defaults="help.apprentice.work" components={components} />
      </p>
      <p>
        <Trans defaults="help.apprentice.state" components={components} />
      </p>
      <div css={druitImageCss}>
        <MaterialComponent type={MaterialType.DruidTile} itemIndex={druitIndex} itemId={item.id} />
        <span>
          <Trans defaults={isSameRotation ? 'help.apprentice.active' : 'help.apprentice.inactive'} components={components} />
        </span>
      </div>
      <hr />
      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog } = props
  return (
    <div css={buttonGridCss}>
      <ActivateTile onPlay={closeDialog} itemIndex={itemIndex} />
      <ActivateApprenticeToGainCrystal onPlay={closeDialog} itemIndex={itemIndex} />
    </div>
  )
}

const buttonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`

const descriptionCss = css`
  font-size: 0.8em;
  white-space: pre-wrap;
  max-width: 45em;

  > h2 {
    text-align: center;
    margin-top: 0;
  }
`

const druitImageCss = css`
  font-size: 0.8em;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  > span {
    margin-left: 1em;
  }
`
