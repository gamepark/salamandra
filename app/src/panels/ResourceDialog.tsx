/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { linkButtonCss, PlayMoveButton, RulesDialog, useGame, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, MaterialGame, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { EagleDivinityCard } from '@gamepark/salamandra/material/EagleDivinityCard'
import { EagleDivinityCardHelper } from '@gamepark/salamandra/material/helper/EagleDivinityCardHelper'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TradeResourceToGainResources } from '../buttons/TradeResourceToGainResources'
import { components } from '../material/help/utils'
import { isWinThisResource } from './SalamandraPlayerPanel'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type ResourceDialogProps = {
  player: PlayerColor
  resource?: PrimaryResource
  onClose?: () => void
}

export const ResourceDialog: FC<ResourceDialogProps> = (props) => {
  const { player, resource, onClose } = props
  const game = useGame<MaterialGame>()!
  const moves = useLegalMoves<MaterialMove>()
  const open = !!resource
  const canBuy = open ? (moves.find((move) => isWinThisResource(move, player, resource)) as CustomMove | undefined) : undefined
  const eagleDivinityHelper = new EagleDivinityCardHelper(game, player)
  const hasDivinityThatDecreaseAmount = eagleDivinityHelper.checkPlayerHasEagleDivinityCard(EagleDivinityCard.EagleDivinity9)

  if (!resource) return null
  return (
    <RulesDialog open close={onClose} css={dialogCss}>
      <h1>Echange de ressource</h1>
      <p css={effect1Css}>
        <Trans defaults="help.crystal.effect1" components={components} />
      </p>

      {hasDivinityThatDecreaseAmount && (
        <p css={boldCss}>
          Grâve à votre{' '}
          <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.EagleDivinityCard, { id: EagleDivinityCard.EagleDivinity9 })} local>
            carte divinité
          </PlayMoveButton>{' '}
          cet échange ne coute que 3 cristaux.
        </p>
      )}
      <p>{canBuy && <TradeResourceToGainResources resource={resource} onPlay={onClose} />}</p>
    </RulesDialog>
  )
}

const dialogCss = css`
  > p {
    font-size: 2em;
  }

  > h1 {
    font-size: 3em;
  }
  padding: 0 2em 0 2em;
  width: 70em;
  white-space: pre-wrap;
`

const effect1Css = css`
  white-space: pre-wrap;
  line-break: normal;
  display: block;
`
const boldCss = css`
  font-weight: bold;
`
