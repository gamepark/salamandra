import { css } from '@emotion/react'
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType, isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { FieldTile } from '@gamepark/salamandra/material/FieldTile.ts'
import { GroveTile } from '@gamepark/salamandra/material/GroveTile.ts'
import { LocationType } from '@gamepark/salamandra/material/LocationType.ts'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { CustomMoveType } from '@gamepark/salamandra/rules/CustomMove.ts'
import { Trans } from 'react-i18next'
import flower from '../images/icons/flower.jpg'
import fruit from '../images/icons/fruit.jpg'
import leaf from '../images/icons/leaf.jpg'
import sickle from '../images/icons/sickle.png'
import crystal from '../images/tokens/CristalToken1.png'
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
        topType: TopType.Eyepatch,
        hairColor: HairColorName.Black,
        facialHairType: FacialHairType.BeardMajestic,
        clotheType: ClotheType.ShirtScoopNeck,
        clotheColor: ClotheColorName.Heather,
        eyeType: EyeType.Surprised,
        eyebrowType: EyebrowType.AngryNatural,
        mouthType: MouthType.Default,
        skinColor: SkinColor.Brown
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
        text: () => <Trans i18nKey="tuto.resource.cost" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.place" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.bonus" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.field.option" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cards" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.2" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.opponent.3" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.cauldron" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place.flower" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.scroll" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grimoire" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.place-last" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.temple" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.salamandra" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.potion" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.buy-flower" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.create-potion" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.salamandra.take" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.pass" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.gather" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.cost" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.bonus" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.grove.vp" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.round.end" components={BaseComponents}/>
      }
    },
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
        text: () => <Trans i18nKey="tuto.majorities" components={BaseComponents}/>
      }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.scroll.vp" components={BaseComponents}/>
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