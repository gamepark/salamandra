/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Player } from '@gamepark/react-client'
import { StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/salamandra/material/LocationType'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType'
import { Potion } from '@gamepark/salamandra/material/Potion'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import { MemoryType } from '@gamepark/salamandra/rules/MemoryType'
import { FC, HTMLAttributes } from 'react'
import Crystal from '../images/icons/crystal.jpg'
import Flower from '../images/icons/flower.jpg'
import Fruit from '../images/icons/fruit.jpg'
import Leaf from '../images/icons/leaf.jpg'
import LeafPotion from '../images/icons/leaf-potion.jpg'
import FlowerFruitPotion from '../images/icons/flower-fruit-potion.jpg'
import { scoreMarkerDescription } from '../material/ScoreMarkerDescription'

type SalamandraPlayerPanelProps = { player: Player<PlayerColor> } & HTMLAttributes<HTMLDivElement>

export const SalamandraPlayerPanel: FC<SalamandraPlayerPanelProps> = ({ player, ...rest }) => {
  const rules = useRules<MaterialRules>()!
  const primaryResources = rules.remind<Record<PrimaryResource, number>>(MemoryType.PlayerPrimaryResources, player.id)
  const potions = rules.remind<Record<Potion, number>>(MemoryType.PlayerPotions, player.id)
  const score = rules.remind(MemoryType.Score, player.id)
  return (
    <StyledPlayerPanel
      player={player}
      activeRing
      countersPerLine={3}
      css={[backgroundColorCss(player.id)]}
      {...rest}
      mainCounter={{ image: scoreMarkerDescription.images[player.id], imageCss, value: score }}
      counters={[
        { image: Flower, imageCss, value: primaryResources[PrimaryResource.Flower] },
        { image: Fruit, imageCss, value: primaryResources[PrimaryResource.Fruit] },
        { image: Leaf, imageCss, value: primaryResources[PrimaryResource.Leaf] },
        { image: FlowerFruitPotion, imageCss, value: potions[Potion.FlowerOrFruit] },
        { image: LeafPotion, imageCss, value: potions[Potion.Leaf] },
        {
          image: Crystal,
          imageCss,
          value: rules.material(MaterialType.CrystalToken).location(LocationType.PlayerCrystalTokenStock).player(player.id).getQuantity()
        }
      ]}
    />
  )
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

const imageCss = css`
  border-radius: 1em;
`
