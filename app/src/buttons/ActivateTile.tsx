import { PlayMoveButton, useLegalMove, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialRules } from '@gamepark/rules-api'
import { EffectType } from '@gamepark/salamandra/material/Effect.ts'
import { fieldData, FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { Trans } from 'react-i18next'
import { components } from '../material/help/utils'

type ActivateApprenticeToGainCrystalProps = {
  itemIndex?: number
  onPlay?: () => void
}

export const ActivateTile = (props: ActivateApprenticeToGainCrystalProps) => {
  const { onPlay, itemIndex } = props
  const rules = useRules<MaterialRules>()!
  const work = useLegalMove<CustomMove>((move) => {
    return isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move) && move.data === itemIndex
  })

  if (!work) return null
  const apprentice = rules.material(MaterialType.ApprenticeToken).getItem(work.data)

  const fieldTileId = rules.material(MaterialType.FieldTile).index(apprentice.location.parent).getItem<FieldTile>()!.id
  const effect = fieldData[fieldTileId].activationEffect
  if (effect.type === EffectType.Crystal) return null

  return (
    <PlayMoveButton move={work} onPlay={onPlay}>
      <Trans i18nKey="button.apprentice.work" components={components} />
    </PlayMoveButton>
  )
}
