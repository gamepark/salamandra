import { css } from '@emotion/react'
import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { DivinityType } from '@gamepark/salamandra/material/DivinityCard.ts'
import { FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { GroveTile } from '@gamepark/salamandra/material/GroveTile.ts'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { PrimaryResource } from '@gamepark/salamandra/material/PrimaryResource.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'
import { Trans } from 'react-i18next'
import bear from '../images/icons/bear.jpg'
import cauldron from '../images/icons/cauldron.png'
import eagle from '../images/icons/eagle.jpg'
import potion2 from '../images/icons/flower-fruit-potion.jpg'
import flower from '../images/icons/flower.jpg'
import fruit from '../images/icons/fruit.jpg'
import potion1 from '../images/icons/leaf-potion.jpg'
import leaf from '../images/icons/leaf.jpg'
import crown from '../images/icons/salamander.png'
import sickle from '../images/icons/sickle.png'
import crystal from '../images/tokens/CristalToken1.png'
import ScrollToken from '../images/tokens/ScrollToken.png'
import { salamanderTempleTileDescription } from '../material/SalamanderTempleTileDescription.ts'
import { scrollTokenDescription } from '../material/ScrollTokenDescription.ts'
import { secondaryDivinitiesBoardDescription } from '../material/SecondaryDivinitiesBoardDescription.ts'
import { venerationPointsBoardDescription } from '../material/VenerationPointsBoardDescription.ts'
import { TutorialSetup } from './TutorialSetup'

const me = PlayerColor.Blue
const opponent = PlayerColor.Red

export class Tutorial extends MaterialTutorial {
  version = 1

  options = {
    players: [{ id: me }, { id: opponent }]
  }

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Cathbad',
      avatar: {
        topType: TopType.LongHairStraightStrand,
        hairColor: HairColorName.Platinum,
        facialHairType: FacialHairType.BeardMajestic,
        facialHairColor: HairColorName.Platinum,
        clotheType: ClotheType.GraphicShirt,
        clotheColor: ClotheColorName.Red,
        graphicType: GraphicType.Deer,
        eyeType: EyeType.Surprised,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Default,
        skinColor: SkinColor.DarkBrown
      }
    }
  ]

  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans i18nKey="tuto.welcome" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.druid" components={BaseComponents}/>,
        position: { x: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.DruidTile)
        ],
        margin: { right: 35 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.apprentice" components={BaseComponents}/>,
        position: { y: -15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken)
        ],
        margin: { right: 10, top: 10, bottom: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.rounds" components={BaseComponents}/>,
        position: { y: -15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken)
        ],
        margin: { right: 10, top: 10, bottom: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.turns" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place" components={BaseComponents}/>,
        position: { x: -5 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.PlayerActualRoundApprenticesSpace),
          this.material(game, MaterialType.FieldTile).location(LocationType.GameLayout)
        ],
        margin: { right: 10, top: 10, bottom: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field" components={BaseComponents}/>,
        position: { x: -5 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.PlayerActualRoundApprenticesSpace),
          this.material(game, MaterialType.FieldTile).location(LocationType.GameLayout)
        ],
        margin: { right: 10, top: 10, bottom: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-leaf" components={BaseComponents}/>,
        position: { x: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.PlayerActualRoundApprenticesSpace)
        ],
        locations: [{ type: LocationType.FieldApprenticeSpace, parent: 1, x: 0 }],
        margin: { right: 10, top: 10, bottom: 10 }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.type === LocationType.FieldApprenticeSpace && move.location.parent === 1 && move.location.x === 0,
        interrupt: isCustomMoveType(CustomMoveType.Score)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-vp" components={BaseComponents}/>,
        position: { x: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.StartField2),
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace)
        ],
        margin: { left: 40, top: 20, bottom: 10 }
      }),
      move: {
        interrupt: isCreateItemType(MaterialType.CrystalToken)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove" components={{ ...BaseComponents, crystal: <Picture src={crystal} css={pictureCss}/> }}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GroveTile).id(GroveTile.Grove2),
          this.material(game, MaterialType.GroveTile).id(GroveTile.Grove7),
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace),
          this.material(game, MaterialType.CrystalToken).player(PlayerColor.Blue)
        ],
        margin: { left: 15, right: 5 }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cristal" components={{ ...BaseComponents, crystal: <Picture src={crystal} css={pictureCss}/> }}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CrystalToken).player(PlayerColor.Blue)
        ],
        scale: 0.2
      })
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.parent === 2 && move.location.x === 0
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.1" components={BaseComponents}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.StartField3),
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).id(PlayerColor.Red)
        ],
        margin: { left: 40, right: 10, top: 10, bottom: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.build" components={BaseComponents}/>,
        position: { x: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).location(LocationType.FieldSpace)
        ],
        margin: { left: 25, right: 1, top: 1, bottom: 1 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cost" components={{
          ...BaseComponents,
          crystal: <Picture src={crystal} css={pictureCss}/>,
          leaf: <Picture src={leaf} css={pictureCss}/>
        }}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field13)
        ],
        margin: { left: 25, right: 1, top: 1, bottom: 1 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.resource" components={{
          ...BaseComponents,
          leaf: <Picture src={leaf} css={pictureCss}/>,
          flower: <Picture src={flower} css={pictureCss}/>,
          fruit: <Picture src={fruit} css={pictureCss}/>,
          sickle: <Picture src={sickle} css={pictureCss}/>
        }}/>,
        position: { x: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.StartField2),
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).id(me)
        ],
        margin: { right: 40, top: 10, bottom: 10 }
      }),
      move: { filter: isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect) }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.inactive" components={BaseComponents}/>,
        position: { x: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.StartField2),
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.FieldApprenticeSpace).id(me)
        ],
        margin: { right: 40, top: 10, bottom: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.resource.cost" components={{
          ...BaseComponents,
          leaf: <Picture src={leaf} css={pictureCss}/>,
          flower: <Picture src={flower} css={pictureCss}/>,
          fruit: <Picture src={fruit} css={pictureCss}/>,
          crystal: <Picture src={crystal} css={pictureCss}/>
        }}/>,
        position: { x: 10, y: -10 }
      },
      focus: () => ({
        staticItems: {
          [MaterialType.SecondaryDivinitiesBoard]: [secondaryDivinitiesBoardDescription.staticItem]
        }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.place" components={BaseComponents}/>,
        position: { y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field13)
        ],
        locations: [{ type: LocationType.GameLayout, x: -1, y: -1 }],
        margin: { left: 10, top: 10, bottom: 20 }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.FieldTile)(move)
          && this.material(game, MaterialType.FieldTile).getItem(move.itemIndex).id === FieldTile.Field13
          && move.location.x === -1 && move.location.y === -1,
        interrupt: isCreateItemType(MaterialType.ScrollToken)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.bonus" components={{ ...BaseComponents, scroll: <Picture src={ScrollToken} css={pictureCss}/> }}/>,
        position: { y: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field13)
        ],
        staticItems: { [MaterialType.ScrollToken]: [scrollTokenDescription.staticItem] },
        margin: { top: 5, bottom: 5 }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.option" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cards" components={BaseComponents}/>,
        position: { x: 40 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.DivinityCard).rotation(true)
        ],
        locations: [{ type: LocationType.PlayerEagleCards, player: me }],
        margin: { right: 40, bottom: 5 }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.DivinityCard)(move)
          && this.material(game, MaterialType.DivinityCard).getItem(move.itemIndex).id.back === DivinityType.Eagle
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.2" components={BaseComponents}/>
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.FieldTile)(move)
          && this.material(game, MaterialType.FieldTile).getItem(move.itemIndex).id === FieldTile.Field11
          && move.location.x === 2 && move.location.y === 0
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.x === 0
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.3" components={BaseComponents}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field11),
          this.material(game, MaterialType.ApprenticeToken).id(opponent).location(LocationType.FieldApprenticeSpace).rotation(false)
        ],
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cauldron" components={{ ...BaseComponents, cauldron: <Picture src={cauldron} css={pictureCss}/> }}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field11),
          this.material(game, MaterialType.ApprenticeToken).id(opponent).location(LocationType.FieldApprenticeSpace).rotation(false)
        ],
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place.flower" components={BaseComponents}/>,
        position: { x: 5, y: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.PlayerActualRoundApprenticesSpace)
        ],
        locations: [{ type: LocationType.FieldApprenticeSpace, parent: this.material(game, MaterialType.FieldTile).id(FieldTile.Field13).getIndex(), x: 0 }],
        margin: { right: 10, top: 10, bottom: 10 }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.type === LocationType.FieldApprenticeSpace
          && move.location.parent === this.material(game, MaterialType.FieldTile).id(FieldTile.Field13).getIndex()
          && move.location.x === 0,
        interrupt: isStartRule
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.scroll" components={{ ...BaseComponents, scroll: <Picture src={ScrollToken} css={pictureCss}/> }}/>,
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ScrollToken)
        ],
        margin: { left: 10, right: 40, top: 15, bottom: 15 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grimoire" components={BaseComponents}/>,
        position: { x: 30 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ScrollToken),
          this.material(game, MaterialType.SpellBookCard)
        ],
        margin: { left: 10, right: 40, top: 5, bottom: 5 }
      }),
      move: {}
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.4" components={{
          ...BaseComponents,
          crystal: <Picture src={crystal} css={pictureCss}/>,
          scroll: <Picture src={ScrollToken} css={pictureCss}/>
        }}/>,
        position: { x: -15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).id(opponent).parent(this.material(game, MaterialType.FieldTile).id(FieldTile.Field11).getIndex()),
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field11)
        ],
        margin: { left: 40, right: 5, top: 5, bottom: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-last" components={BaseComponents}/>,
        position: { y: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ApprenticeToken).location(LocationType.PlayerActualRoundApprenticesSpace)
        ],
        locations: [{
          type: LocationType.FieldApprenticeSpace,
          parent: this.material(game, MaterialType.FieldTile).id(FieldTile.StartField3).getIndex(),
          x: 1
        }],
        margin: { right: 10, top: 10, bottom: 10 }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.type === LocationType.FieldApprenticeSpace
          && move.location.parent === this.material(game, MaterialType.FieldTile).id(FieldTile.StartField3).getIndex()
          && move.location.x === 1
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.ApprenticeToken)(move)
          && move.location.type === LocationType.FieldApprenticeSpace
          && move.location.parent === this.material(game, MaterialType.FieldTile).id(FieldTile.StartField1).getIndex()
          && move.location.x === 3
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.temple" components={BaseComponents}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SalamanderCard)
        ],
        staticItems: { [MaterialType.SalamanderTempleTile]: [salamanderTempleTileDescription.staticItem] },
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.salamandra" components={{
          ...BaseComponents,
          potion1: <Picture src={potion1} css={pictureCss}/>,
          potion2: <Picture src={potion2} css={pictureCss}/>,
          crystal: <Picture src={crystal} css={pictureCss}/>
        }}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SalamanderCard)
        ],
        staticItems: { [MaterialType.SalamanderTempleTile]: [salamanderTempleTileDescription.staticItem] },
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.potion" components={{
          ...BaseComponents,
          potion2: <Picture src={potion2} css={pictureCss}/>,
          flower: <Picture src={flower} css={pictureCss}/>
        }}/>,
        position: { x: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field13),
          this.material(game, MaterialType.ApprenticeToken).id(me).parent(this.material(game, MaterialType.FieldTile).id(FieldTile.Field13).getIndex())
        ],
        margin: { left: 40, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.buy-flower" components={{
          ...BaseComponents,
          flower: <Picture src={flower} css={pictureCss}/>,
          crystal: <Picture src={crystal} css={pictureCss}/>
        }}/>,
        position: { x: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.StartField3),
          this.material(game, MaterialType.ApprenticeToken).id(me).parent(this.material(game, MaterialType.FieldTile).id(FieldTile.StartField3).getIndex())
        ],
        margin: { left: 40, right: 5 }
      }),
      move: {
        filter: (move) => isCustomMoveType(CustomMoveType.PayCrystalsToGainResource)(move)
          && move.data.resource === PrimaryResource.Flower
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.create-potion" components={{
          ...BaseComponents,
          potion2: <Picture src={potion2} css={pictureCss}/>,
          flower: <Picture src={flower} css={pictureCss}/>
        }}/>,
        position: { x: -10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.FieldTile).id(FieldTile.Field13),
          this.material(game, MaterialType.ApprenticeToken).id(me).parent(this.material(game, MaterialType.FieldTile).id(FieldTile.Field13).getIndex())
        ],
        margin: { left: 40, right: 5 }
      }),
      move: {
        filter: (move, game) => isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)(move)
          && move.data === this.material(game, MaterialType.ApprenticeToken).id(me).parent(this.material(game, MaterialType.FieldTile).id(FieldTile.Field13).getIndex()).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.salamandra.take" components={BaseComponents}/>,
        position: { x: -10, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SalamanderCard).location(LocationType.BlackSalamanderStack).rotation(true)
        ],
        locations: [{ type: LocationType.PlayerBlackSalamanderCards, player: me }],
        margin: { left: 15, right: 5 }
      }),
      move: {
        filter: isMoveItemType(MaterialType.SalamanderCard)
      }
    },
    { move: {} },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.ActivateApprenticeForFieldEffect)
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      move: {
        player: opponent,
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.pass" components={BaseComponents}/>
      },
      move: {
        filter: isCustomMoveType(CustomMoveType.Pass)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.gather" components={BaseComponents}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GroveTile).location(LocationType.GameLayout)
        ],
        margin: { left: 50, right: 2, top: 2, bottom: 2 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.cost" components={{ ...BaseComponents, crystal: <Picture src={crystal} css={pictureCss}/> }}/>,
        position: { x: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GroveTile).index([2, 3, 1, 6])
        ],
        margin: { left: 50, right: 10, top: 2, bottom: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.bonus" components={BaseComponents}/>
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GroveTile).index([2, 3, 1, 6])
        ],
        locations: [{ type: LocationType.PlayerGroveTiles, player: me }],
        margin: { left: 10, right: 10, top: 2, bottom: 10 }
      }),
      move: {
        filter: isMoveItemType(MaterialType.GroveTile)
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.vp" components={BaseComponents}/>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.GroveTile).location(LocationType.PlayerGroveTiles)
        ],
        locations: [{ type: LocationType.PlayerGroveTiles, player: me }],
        margin: { left: 20, right: 20, top: 2, bottom: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.round.end" components={BaseComponents}/>
      }
    },
    { move: { auto: true } },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.game.over" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grimoire.vp" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.majorities" components={{
          ...BaseComponents,
          eagle: <Picture src={eagle} css={pictureCss}/>,
          bear: <Picture src={bear} css={pictureCss}/>,
          crown: <Picture src={crown} css={pictureCss}/>
        }}/>,
        position: { x: 25 }
      },
      focus: () => ({
        staticItems: { [MaterialType.VenerationPointsBoard]: [venerationPointsBoardDescription.staticItem] },
        margin: { right: 50, left: 15 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.scroll.vp" components={{
          ...BaseComponents,
          scroll: <Picture src={ScrollToken} css={pictureCss}/>
        }}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.end" components={BaseComponents}/>
      }
    }
  ]
}

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.5em;
  border-radius: 1em;
`