/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Player } from '@gamepark/react-client'
import { CounterProps, shineEffect, StyledPlayerPanel, useLegalMoves, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove'
import { MemoryType } from '@gamepark/salamandra/rules/MemoryType'
import { FC, HTMLAttributes, useState } from 'react'
import Crystal from '../images/icons/crystal.jpg'
import FlowerFruitPotion from '../images/icons/flower-fruit-potion.jpg'
import FlowerSelected from '../images/icons/flower-selected.png'
import FruitSelected from '../images/icons/fruit-selected.png'
import LeafPotion from '../images/icons/leaf-potion.jpg'
import LeafSelected from '../images/icons/leaf-selected.png'
import { primaryResourceImages } from '../material/help/utils'
import { scoreMarkerDescription } from '../material/ScoreMarkerDescription'
import { ResourceDialog } from './ResourceDialog'

type SalamandraPlayerPanelProps = { player: Player<PlayerColor> } & HTMLAttributes<HTMLDivElement>

export const SalamandraPlayerPanel: FC<SalamandraPlayerPanelProps> = ({ player, ...rest }) => {
  const rules = useRules<MaterialRules>()!
  const primaryResources = rules.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, player.id)
  const potions = rules.remind<Record<Potion, number>>(MemoryType.PlayerPotions, player.id)
  const score = rules.remind(MemoryType.Score, player.id)
  const [dialogResource, setDialogResource] = useState<PrimaryResource>()
  const moves = useLegalMoves<MaterialMove>()
  return (
    <>
      <StyledPlayerPanel
        player={player}
        activeRing
        countersPerLine={3}
        css={[backgroundColorCss(player.id)]}
        {...rest}
        mainCounter={{ image: scoreMarkerDescription.images[player.id], imageCss, value: score }}
        counters={[
          getPrimaryResourceCounter(moves, player.id, PrimaryResource.Flower, primaryResources[PrimaryResource.Flower], () =>
            setDialogResource(PrimaryResource.Flower)
          ),
          getPrimaryResourceCounter(moves, player.id, PrimaryResource.Fruit, primaryResources[PrimaryResource.Fruit], () =>
            setDialogResource(PrimaryResource.Fruit)
          ),
          getPrimaryResourceCounter(moves, player.id, PrimaryResource.Leaf, primaryResources[PrimaryResource.Leaf], () =>
            setDialogResource(PrimaryResource.Leaf)
          ),
          { image: FlowerFruitPotion, imageCss, value: potions[Potion.FlowerOrFruit] },
          { image: LeafPotion, imageCss, value: potions[Potion.Leaf] },
          {
            image: Crystal,
            imageCss,
            value: rules.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(player.id).getQuantity()
          }
        ]}
      />
      <ResourceDialog player={player.id} resource={dialogResource} onClose={() => setDialogResource(undefined)} />
    </>
  )
}

export const primaryResourceImagesSelected = {
  [PrimaryResource.Flower]: FlowerSelected,
  [PrimaryResource.Fruit]: FruitSelected,
  [PrimaryResource.Leaf]: LeafSelected
}

const getPrimaryResourceCounter = (
  legalMoves: MaterialMove[],
  player: PlayerColor,
  resource: PrimaryResource,
  value: number,
  onClick: () => void
): CounterProps => {
  const canBuy = legalMoves.find((move) => isWinThisResource(move, player, resource))

  if (!canBuy) {
    return {
      image: primaryResourceImages[resource],
      imageCss,
      value,
      onClick
    }
  }

  return {
    image: primaryResourceImagesSelected[resource],
    extraCss: shineEffect,
    imageCss: css`
      ${imageCss};
      ${selectable}
    `,
    value,
    onClick
  }
}

export const isWinThisResource = (move: MaterialMove, player: PlayerColor, resource: PrimaryResource) => {
  if (!isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)) return false
  const data = move.data as { resource: PrimaryResource; player: PlayerColor }
  return data.resource === resource && data.player === player
}

const backgroundColorCss = (player: PlayerColor) => css`
  background-color: ${playerColors(player)};
`

const playerColors = (player: PlayerColor) => {
  switch (player) {
    case PlayerColor.Blue:
      return '#24b4c1'
    case PlayerColor.Grey:
      return '#aeb1ad'
    case PlayerColor.Red:
      return '#dba69c'
    case PlayerColor.Yellow:
      return '#fbe68b'
  }
}

const selectable = css`
  width: 1.4em;
`

const imageCss = css`
  border-radius: 1em;
  background-size: 100% 100%;
  height: 1em;
`
