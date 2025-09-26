import { css } from '@emotion/react'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { DivinityType } from '@gamepark/salamandra/material/Bonus'
import { DivinityCard, DivinityCardId, divinityCardPoints } from '@gamepark/salamandra/material/DivinityCard'
import { BearDivinityCardHelper } from '@gamepark/salamandra/material/helper/BearDivinityCardHelper.ts'
import { EagleDivinityCardHelper } from '@gamepark/salamandra/material/helper/EagleDivinityCardHelper.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { Potion } from '@gamepark/salamandra/material/Potion.ts'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { ActivateApprenticeToGainCrystal } from '../../buttons/ActivateApprenticeToGainCrystal.tsx'
import { ActivateTile } from '../../buttons/ActivateTile.tsx'
import { FlipApprentice } from '../../buttons/FlipApprentice.tsx'
import { TradeCrystalToGainPotion } from '../../buttons/TradeResourceToGainPotion.tsx'
import { components, descriptionCss } from './utils'

export const DivinityCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id) return null
  const id: { front: DivinityCard; back: DivinityType } = item.id
  const type: DivinityType = id.back
  const points = divinityCardPoints[id.front]

  return (
    <div css={descriptionCss}>
      <h2>
        <Trans defaults="help.divinity" components={components} values={{ type: type }} />
      </h2>
      <p>
        <Trans defaults="help.divinity.description" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.end" components={components} values={{ type: type, first: 8, second: 4 }} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.first" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.equality.second" components={components} />
      </p>
      <p>
        <Trans defaults="help.divinity.points" components={components} values={{ type: type, points }} />
      </p>
      <p>
        <Trans defaults="help.divinity.effects" components={components} />
        <Trans defaults={`help.divinity.effects.${id.front}`} components={components} />
      </p>
      <hr />
      <HelpButtons {...props} />
    </div>
  )
}

const HelpButtons: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, item, closeDialog } = props
  const rules = useRules<MaterialRules>()!
  const bearHelper = new BearDivinityCardHelper(rules.game)
  const bear6Effect = bearHelper.getBearCard6Effect()
  const bear8Effect = bearHelper.getBearCard8Effect()
  const isBear8 =
    rules
      .material(MaterialType.DivinityCard)
      .id((id: DivinityCardId) => id.front === DivinityCard.BearDivinity8)
      .getIndex() === itemIndex
  const isBear6 =
    rules
      .material(MaterialType.DivinityCard)
      .id((id: DivinityCardId) => id.front === DivinityCard.BearDivinity6)
      .getIndex() === itemIndex

  const eagleHelper = new EagleDivinityCardHelper(rules.game)
  const eagle2Effect = eagleHelper.getEagleCard2Effect()
  const eagle4Effect = eagleHelper.getEagleCard4Effect()
  const isEagle2 =
    rules
      .material(MaterialType.DivinityCard)
      .id((id: DivinityCardId) => id.front === DivinityCard.EagleDivinity2)
      .getIndex() === itemIndex
  const isEagle4 =
    rules
      .material(MaterialType.DivinityCard)
      .id((id: DivinityCardId) => id.front === DivinityCard.EagleDivinity4)
      .getIndex() === itemIndex
  return (
    <div css={buttonGridCss}>
      {!!bear8Effect && isBear8 && <TradeCrystalToGainPotion potion={Potion.Leaf} onPlay={closeDialog} />}
      {!!bear6Effect && isBear6 && <TradeCrystalToGainPotion potion={Potion.FlowerOrFruit} onPlay={closeDialog} />}
      {!!eagle2Effect && isEagle2 && <TradeCrystalToGainPotion potion={Potion.Leaf} onPlay={closeDialog} />}
      {!!eagle4Effect && isEagle4 && <TradeCrystalToGainPotion potion={Potion.FlowerOrFruit} onPlay={closeDialog} />}
      <ActivateTile onPlay={closeDialog} itemIndex={itemIndex} />
      <FlipApprentice onPlay={closeDialog} itemIndex={itemIndex} item={item} />
      <ActivateApprenticeToGainCrystal onPlay={closeDialog} itemIndex={itemIndex} />
    </div>
  )
}

const buttonGridCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`
