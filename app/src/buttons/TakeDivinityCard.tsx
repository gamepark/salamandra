import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type TakeDivinityCardProps = {
  divinityIndex?: number
  onPlay: () => void
}

export const TakeDivinityCard: FC<TakeDivinityCardProps> = (props) => {
  const { divinityIndex, onPlay } = props
  const takeCard = useLegalMove(
    (move) => isMoveItemType(MaterialType.DivinityCard)(move) && move.itemIndex === divinityIndex && move.location.player !== undefined
  )
  if (!takeCard || !divinityIndex) return
  return (
    <PlayMoveButton move={takeCard} onPlay={onPlay}>
      <Trans i18nKey="button.take.divinity" />
    </PlayMoveButton>
  )
}
