import { css } from '@emotion/react'
import { linkButtonCss, PlayMoveButton, RulesDialog, useGame, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, MaterialGame, MaterialMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { DivinityCard } from '@gamepark/salamandra/material/DivinityCard'
import { EagleDivinityCardHelper } from '@gamepark/salamandra/material/helper/EagleDivinityCardHelper'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TradeCrystalToGainResources } from '../buttons/TradeCrystalToGainResources.tsx'
import { TradeCrystalToGainPotion } from '../buttons/TradeResourceToGainPotion.tsx'
import { components } from '../material/help/utils'
import { isPlayerWinThisPotion, isPlayerWinThisResource } from '../utils/resource.utils.ts'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type ResourceDialogProps = {
  player: PlayerColor
  resource?: PrimaryResource
  potion?: Potion
  onClose?: () => void
}

export const ResourceDialog: FC<ResourceDialogProps> = (props) => {
  const { player, resource, potion, onClose } = props
  const game = useGame<MaterialGame>()!
  const moves = useLegalMoves<MaterialMove>()
  const canBuyResource = resource ? (moves.find((move) => isPlayerWinThisResource(move, player, resource)) as CustomMove | undefined) : undefined
  const canBuyPotion = potion ? (moves.find((move) => isPlayerWinThisPotion(move, player, potion)) as CustomMove | undefined) : undefined
  const eagleDivinityHelper = new EagleDivinityCardHelper(game, player)
  const hasDivinityThatDecreaseAmount = eagleDivinityHelper.checkPlayerHasEagleDivinityCard(DivinityCard.EagleDivinity9)

  if (!resource && !potion) return null
  return (
    <RulesDialog open close={onClose} css={dialogCss}>
      <h1>Echange de ressource</h1>
      <p css={effect1Css}>
        <Trans defaults="help.crystal.effect1" components={components} />
      </p>

      {hasDivinityThatDecreaseAmount && (
        <p css={boldCss}>
          Grâve à votre{' '}
          <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.DivinityCard, { id: { front: DivinityCard.EagleDivinity9 } })} local>
            carte divinité
          </PlayMoveButton>{' '}
          cet échange ne coute que 3 cristaux.
        </p>
      )}
      <p>{canBuyResource && resource && <TradeCrystalToGainResources resource={resource} onPlay={onClose} />}</p>
      <p>{canBuyPotion && potion && <TradeCrystalToGainPotion potion={potion} onPlay={onClose} />}</p>
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
