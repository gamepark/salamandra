import { css } from '@emotion/react'
import { Picture, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { Trans } from 'react-i18next'
import { components, potionImages } from '../material/help/utils'
import { isWinThisPotion } from '../utils/resource.utils.ts'

type TradeCrystalToGainPotionProps = {
  potion: Potion
  onPlay?: () => void
}

export const TradeCrystalToGainPotion = (props: TradeCrystalToGainPotionProps) => {
  const { onPlay, potion } = props
  const canBuy = useLegalMove((move: MaterialMove) => isWinThisPotion(move, potion)) as CustomMove | undefined
  if (!canBuy) return null
  const amount = (canBuy.data as { amount: number }).amount
  return (
    <PlayMoveButton css={buttonCss} move={canBuy} onPlay={onPlay}>
      <Trans
        i18nKey="button.crystal.trade"
        values={{ given: amount, taken: 1 }}
        components={{
          resourceA: components.crystal,
          resourceB: <Picture picture={{ css: pictureCss } as never} css={resourceCss} src={potionImages[potion]} />
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
