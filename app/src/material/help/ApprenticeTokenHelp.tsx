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
import {
  components,
  helpContainerCss,
  helpHeaderCss,
  helpTitleCss,
  helpOrnamentCss,
  diamondCss,
  helpImportantCss,
  helpSecondaryCss,
  helpButtonGridCss
} from './utils'
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
    <div css={helpContainerCss}>
      <div css={helpHeaderCss}>
        <h2 css={helpTitleCss}>{t('help.apprentice')}</h2>
        <div css={helpOrnamentCss}><span css={diamondCss} /></div>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.apprentice.work" components={components} />
        </p>
      </div>

      <div css={helpImportantCss}>
        <p>
          <Trans i18nKey="help.apprentice.state" components={components} />
        </p>
      </div>

      <div css={[helpSecondaryCss, infoRowCss]}>
        <MaterialComponent
          type={MaterialType.DruidTile}
          itemIndex={druitIndex}
          itemId={item.id}
          css={pointerCss}
          onClick={() => play(displayMaterialHelp(MaterialType.DruidTile, item, druitIndex), { transient: true })}
        />
        <span>
          <Trans i18nKey={isSameRotation ? 'help.apprentice.active' : 'help.apprentice.inactive'} components={components} />
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
              <Trans i18nKey="help.apprentice.field" components={components} />
            </span>
          </>
        )}
      </div>

      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, item, closeDialog } = props
  return (
    <div css={helpButtonGridCss}>
      <ActivateTile onPlay={closeDialog} itemIndex={itemIndex} />
      <FlipApprentice onPlay={closeDialog} itemIndex={itemIndex} item={item} />
      <ActivateApprenticeToGainCrystal onPlay={closeDialog} itemIndex={itemIndex} />
    </div>
  )
}

const infoRowCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6em;
  flex-wrap: wrap;

  > span {
    flex: 1;
    min-width: 6em;
  }
`

const pointerCss = css`
  cursor: pointer;
`
