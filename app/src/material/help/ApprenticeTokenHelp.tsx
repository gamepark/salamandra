/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialComponent, MaterialHelpProps, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder, MaterialRules } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ActivateApprenticeToGainCrystal } from '../../buttons/ActivateApprenticeToGainCrystal'
import { ActivateTile } from '../../buttons/ActivateTile'
import { FlipApprentice } from '../../buttons/FlipApprentice'
import { components, descriptionCss } from './utils'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ApprenticeTokenHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  const druid = rules.material(MaterialType.DruidTile).id(item.id)
  const druitIndex = druid.getIndex()
  const druitRotation = druid.getItem()!.location.rotation
  const isSameRotation = item.location?.rotation === druitRotation
  const field = item.location?.type === LocationType.FieldApprenticeSpace ? rules.material(MaterialType.FieldTile).index(item.location.parent!) : undefined
  const play = usePlay()

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
        <MaterialComponent
          type={MaterialType.DruidTile}
          itemIndex={druitIndex}
          itemId={item.id}
          css={pointerCss}
          onClick={() => play(displayMaterialHelp(MaterialType.DruidTile, item, druitIndex), { transient: true })}
        />
        <span>
          <Trans defaults={isSameRotation ? 'help.apprentice.active' : 'help.apprentice.inactive'} components={components} />
        </span>
        {!!field && (
          <>
            <MaterialComponent
              type={MaterialType.FieldTile}
              css={pointerCss}
              onClick={() => play(displayMaterialHelp(MaterialType.FieldTile, field.getItem(), field.getIndex()), { transient: true })}
              itemIndex={field.getIndex()}
              itemId={field.getItem()!.id}
            />
            <span>
              <Trans defaults="help.apprentice.field" components={components} />
            </span>
          </>
        )}
      </div>
      <hr />
      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, item, closeDialog } = props
  return (
    <div css={buttonGridCss}>
      <ActivateApprenticeToGainCrystal onPlay={closeDialog} itemIndex={itemIndex} />
      <ActivateTile onPlay={closeDialog} itemIndex={itemIndex} />
      <FlipApprentice onPlay={closeDialog} itemIndex={itemIndex} item={item} />
    </div>
  )
}

const buttonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`

const druitImageCss = css`
  font-size: 0.8em;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;

  > span {
    margin-left: 1em;
    flex: 1;
  }
`

const pointerCss = css`
  cursor: pointer;
`
