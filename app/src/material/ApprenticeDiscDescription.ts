import { CardDescription } from '@gamepark/react-game'
import { ApprenticeDisc } from '@gamepark/salamandra/material/ApprenticeDisc'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import ApprenticeDiscDayBlue from '../images/tiles/apprenticeDisc/ApprenticeDiscDayBlue.jpg'
import ApprenticeDiscDayRed from '../images/tiles/apprenticeDisc/ApprenticeDiscDayRed.jpg'
import ApprenticeDiscDayGrey from '../images/tiles/apprenticeDisc/ApprenticeDiscDayGrey.jpg'
import ApprenticeDiscDayYellow from '../images/tiles/apprenticeDisc/ApprenticeDiscDayYellow.jpg'
import ApprenticeDiscNightBlue from '../images/tiles/apprenticeDisc/ApprenticeDiscNightBlue.jpg'
import ApprenticeDiscNightRed from '../images/tiles/apprenticeDisc/ApprenticeDiscNightRed.jpg'
import ApprenticeDiscNightGrey from '../images/tiles/apprenticeDisc/ApprenticeDiscNightGrey.jpg'
import ApprenticeDiscNightYellow from '../images/tiles/apprenticeDisc/ApprenticeDiscNightYellow.jpg'

class ApprenticeDiscDescription extends CardDescription {
  width = 0.7
  height = 0.7

  images = {
    [PlayerColor.Blue * 10 + ApprenticeDisc.Day]: ApprenticeDiscDayBlue,
    [PlayerColor.Blue * 10 + ApprenticeDisc.Night]: ApprenticeDiscNightBlue,
    [PlayerColor.Grey * 10 + ApprenticeDisc.Day]: ApprenticeDiscDayGrey,
    [PlayerColor.Grey * 10 + ApprenticeDisc.Night]: ApprenticeDiscNightGrey,
    [PlayerColor.Red * 10 + ApprenticeDisc.Day]: ApprenticeDiscDayRed,
    [PlayerColor.Red * 10 + ApprenticeDisc.Night]: ApprenticeDiscNightRed,
    [PlayerColor.Yellow * 10 + ApprenticeDisc.Day]: ApprenticeDiscDayYellow,
    [PlayerColor.Yellow * 10 + ApprenticeDisc.Night]: ApprenticeDiscNightYellow
  }
}

export const apprenticeDiscDescription = new ApprenticeDiscDescription()
