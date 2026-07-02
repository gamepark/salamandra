import { css } from '@emotion/react'
import { PlayMoveButton, RulesDialog, useGame, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, MaterialGame, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { DivinityCard } from '@gamepark/salamandra/material/DivinityCard'
import { EagleDivinityCardHelper } from '@gamepark/salamandra/material/helper/EagleDivinityCardHelper'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TradeCrystalToGainResources } from '../buttons/TradeCrystalToGainResources.tsx'
import { components } from '../material/help/utils'
import { salamandraLinkCss } from '../theme.ts'
import { isPlayerWinThisResource } from '../utils/resource.utils.ts'
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
  const canBuyResource = resource ? (moves.find((move) => isPlayerWinThisResource(move, player, resource)) as CustomMove | undefined) : undefined
  const eagleDivinityHelper = new EagleDivinityCardHelper(game, player)
  const hasDivinityThatDecreaseAmount = eagleDivinityHelper.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity9)

  if (!resource) return null
  return (
    <RulesDialog open close={onClose} css={dialogCss}>
      <h1>Echange de ressource</h1>
      <p css={effect1Css}>
        <Trans i18nKey="help.crystal.effect1" components={components} />
      </p>

      {hasDivinityThatDecreaseAmount && (
        <p css={boldCss}>
          <Trans
            i18nKey="help.divinity.discount.resource"
            components={{
              ...components,
              play: (
                <PlayMoveButton
                  css={salamandraLinkCss}
                  move={displayMaterialHelp(MaterialType.DivinityCard, { id: { front: DivinityCard.EagleDivinity9 } })}
                  local
                />
              )
            }}
          ></Trans>
        </p>
      )}
      <p>{canBuyResource && resource && <TradeCrystalToGainResources resource={resource} onPlay={onClose} />}</p>
    </RulesDialog>
  )
}

const dialogCss = css`
  > p {
    font-size: 2.5em;
  }

  > h1 {
    font-size: 3em;
  }
  padding: 1.5em 2.5em 2em;
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
