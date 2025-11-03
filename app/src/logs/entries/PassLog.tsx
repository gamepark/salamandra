import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogComponents } from '../../material/help/utils.tsx'

export const PassLog: FC<MaterialLogProps> = ({ context }) => {
  const player = usePlayerName(context.action.playerId)
  return <Trans defaults="log.pass" values={{ player }} components={LogComponents} />
}
