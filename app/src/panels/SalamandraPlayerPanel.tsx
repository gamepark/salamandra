import { css } from '@emotion/react'
import { Player } from '@gamepark/react-client'
import { CounterProps, shineEffect, StyledPlayerPanel, useLegalMoves, useRules } from '@gamepark/react-game'
import { MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { MemoryType } from '@gamepark/salamandra/rules/MemoryType'
import { FC, HTMLAttributes, useState } from 'react'
import Crystal from '../images/icons/crystal.jpg'
import FlowerSelected from '../images/icons/flower-selected.png'
import FruitSelected from '../images/icons/fruit-selected.png'
import LeafPotionSelected from '../images/icons/leaf-potion-selected.png'
import FlowerFruitPotionSelected from '../images/icons/flower-fruit-potion-selected.png'
import LeafSelected from '../images/icons/leaf-selected.png'
import ScoreMarkerBlue from '../images/tiles/scoreMarker/ScoreMarkerBlue.jpg'
import ScoreMarkerGrey from '../images/tiles/scoreMarker/ScoreMarkerGrey.jpg'
import ScoreMarkerRed from '../images/tiles/scoreMarker/ScoreMarkerRed.jpg'
import ScoreMarkerYellow from '../images/tiles/scoreMarker/ScoreMarkerYellow.jpg'
import { potionImages, primaryResourceImages } from '../material/help/utils'
import { isPlayerWinThisPotion, isPlayerWinThisResource } from '../utils/resource.utils.ts'
import { ResourceDialog } from './ResourceDialog'

type SalamandraPlayerPanelProps = { player: Player<PlayerColor> } & HTMLAttributes<HTMLDivElement>

export const SalamandraPlayerPanel: FC<SalamandraPlayerPanelProps> = ({ player, ...rest }) => {
  const rules = useRules<MaterialRules>()!
  const primaryResources = rules.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, player.id)
  const potions = rules.remind<Record<Potion, number>>(MemoryType.PlayerPotions, player.id)
  const score = rules.remind(MemoryType.Score, player.id)
  const [dialogResource, setDialogResource] = useState<PrimaryResource>()
  const [dialogPotion, setDialogPotion] = useState<Potion>()
  const moves = useLegalMoves<MaterialMove>()

  const clearDialog = () => {
    if (dialogResource) setDialogResource(undefined)
    if (dialogPotion) setDialogPotion(undefined)
  }

  return (
    <>
      <StyledPlayerPanel
        player={player}
        activeRing
        countersPerLine={3}
        css={[backgroundColorCss(player.id)]}
        {...rest}
        mainCounter={{ image: markerImages[player.id], imageCss, value: score }}
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
          getPotionCounter(moves, player.id, Potion.FlowerOrFruit, potions[Potion.FlowerOrFruit], () => setDialogPotion(Potion.FlowerOrFruit)),
          getPotionCounter(moves, player.id, Potion.Leaf, potions[Potion.Leaf], () => setDialogPotion(Potion.Leaf)),
          {
            image: Crystal,
            imageCss,
            value: rules.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(player.id).getQuantity()
          }
        ]}
      />
      <ResourceDialog player={player.id} resource={dialogResource} potion={dialogPotion} onClose={() => clearDialog()} />
    </>
  )
}

const primaryResourceImagesSelected = {
  [PrimaryResource.Flower]: FlowerSelected,
  [PrimaryResource.Fruit]: FruitSelected,
  [PrimaryResource.Leaf]: LeafSelected
}

const potionSelected = {
  [Potion.Leaf]: LeafPotionSelected,
  [Potion.FlowerOrFruit]: FlowerFruitPotionSelected
}

const getPrimaryResourceCounter = (
  legalMoves: MaterialMove[],
  player: PlayerColor,
  resource: PrimaryResource,
  value: number,
  onClick: () => void
): CounterProps => {
  const canBuy = legalMoves.find((move) => isPlayerWinThisResource(move, player, resource))

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

const getPotionCounter = (legalMoves: MaterialMove[], player: PlayerColor, potion: Potion, value: number, onClick: () => void): CounterProps => {
  const canBuy = legalMoves.find((move) => isPlayerWinThisPotion(move, player, potion))

  if (!canBuy) {
    return {
      image: potionImages[potion],
      imageCss,
      value,
      onClick
    }
  }

  return {
    image: potionSelected[potion],
    extraCss: shineEffect,
    imageCss: css`
      ${imageCss};
      ${selectable}
    `,
    value,
    onClick
  }
}

const markerImages = {
  [PlayerColor.Blue]: ScoreMarkerBlue,
  [PlayerColor.Grey]: ScoreMarkerGrey,
  [PlayerColor.Red]: ScoreMarkerRed,
  [PlayerColor.Yellow]: ScoreMarkerYellow
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
