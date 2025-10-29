import { css } from '@emotion/react'
import { linkButtonCss, PlayMoveButton, RulesDialog, useLegalMoves, useRules } from '@gamepark/react-game'
import { CustomMove, MaterialMove, MaterialMoveBuilder, MaterialRules } from '@gamepark/rules-api'
import { DivinityCard } from '@gamepark/salamandra/material/DivinityCard'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TradeCrystalToGainPotion } from '../buttons/TradeResourceToGainPotion.tsx'
import { components } from '../material/help/utils'
import { isPlayerWinThisPotion } from '../utils/resource.utils.ts'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type ResourceDialogProps = {
  player: PlayerColor
  potion?: Potion
  onClose?: () => void
}

export const PotionDialog: FC<ResourceDialogProps> = (props) => {
  const { player, potion, onClose } = props
  const moves = useLegalMoves<MaterialMove>()
  const canBuyPotion = potion ? (moves.find((move) => isPlayerWinThisPotion(move, player, potion)) as CustomMove | undefined) : undefined
  const rules = useRules<MaterialRules>()
  if (!potion || !canBuyPotion) return null
  const divinity = lookupDivinity(rules, canBuyPotion)
  return (
    <RulesDialog open close={onClose} css={dialogCss}>
      <h1>
        <Trans defaults="help.potion.trade" />
      </h1>

      <p css={boldCss}>
        <Trans
          defaults="help.divinity.potion"
          components={{
            ...components,
            play: <PlayMoveButton css={linkButtonCss} move={displayMaterialHelp(MaterialType.DivinityCard, { id: { front: divinity } })} local />
          }}
        ></Trans>
      </p>
      <p>
        <TradeCrystalToGainPotion potion={potion} onPlay={onClose} />
      </p>
    </RulesDialog>
  )
}

const lookupDivinity = (rules: MaterialRules, canBuyPotion: CustomMove) => {
  const divinityIndex = canBuyPotion.data.divinityIndex
  return rules.material(MaterialType.DivinityCard).getItem(divinityIndex).id.front as DivinityCard
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
const boldCss = css`
  font-weight: bold;
`
