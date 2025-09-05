/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture, PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CrystalToken } from '@gamepark/salamandra/material/CrystalToken'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { HTMLAttributes } from 'react'
import { crystalTokenDescription } from '../material/CrystalTokenDescription'
import { primaryResourceImages } from '../material/help/utils'

type TradeResourceToGainResourcesProps = {
  resource: PrimaryResource
  onPlay?: () => void
}

export const TradeResourceToGainResources = (props: TradeResourceToGainResourcesProps) => {
  const { onPlay, resource } = props
  const moves = useLegalMoves<MaterialMove>()
  const canBuy = moves.find((move) => isWinThisResource(move, resource)) as CustomMove
  return (
    <PlayMoveButton css={buttonCss} move={canBuy} onPlay={onPlay}>
      Echanger {(canBuy.data as { amount: number }).amount}{' '}
      <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} src={crystalTokenDescription.images[CrystalToken.Crystal1]} /> contre{' '}
      <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} css={resourceCss} src={primaryResourceImages[resource]} />
    </PlayMoveButton>
  )
}

export const isWinThisResource = (move: MaterialMove, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCristalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource }
  return data.resource === resource
}

const resourceCss = css`
  border-radius: 1em;
`

const buttonCss = css`
  justify-content: center;
  align-items: center;
  display: inline;
  font-size: 1em;
`

const pictureCss = css`
  height: 1em;

  > img {
    height: 1em;
    position: relative;
    top: 0.1em;
  }
`
