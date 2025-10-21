import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/salamandra/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor.ts'
import { Trans } from 'react-i18next'
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
    }
  ]
}

const BaseComponents = {
  bold: <strong/>,
  italic: <em/>
}
