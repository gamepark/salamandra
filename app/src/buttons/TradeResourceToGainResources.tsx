import { css } from '@emotion/react'
import { Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { HTMLAttributes } from 'react'
import { Trans } from 'react-i18next'
import { components, primaryResourceImages } from '../material/help/utils'
import { isWinThisResource } from '../utils/resource.utils.ts'

type TradeResourceToGainResourcesProps = {
  resource: PrimaryResource
  onPlay?: () => void
}

export const TradeResourceToGainResources = (props: TradeResourceToGainResourcesProps) => {
  const { onPlay, resource } = props
  const canBuy = useLegalMove((move: MaterialMove) => isWinThisResource(move, resource)) as CustomMove | undefined
  if (!canBuy) return null
  const amount = (canBuy.data as { amount: number }).amount
  return (
    <PlayMoveButton css={buttonCss} move={canBuy} onPlay={onPlay}>
      <Trans
        defaults="button.crystal.trade"
        values={{ given: amount, taken: 1 }}
        components={{
          resourceA: components.crystal,
          resourceB: <Picture picture={{ css: pictureCss } as HTMLAttributes<HTMLElement>} css={resourceCss} src={primaryResourceImages[resource]} />
        }}
      />
    </PlayMoveButton>
  )
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
    height: 0.9em;
    position: relative;
    top: 0.1em;
  }
`
