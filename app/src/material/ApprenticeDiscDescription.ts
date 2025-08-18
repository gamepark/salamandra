import { CardDescription } from '@gamepark/react-game'
import { Step } from '@gamepark/salamandra/material/Step'
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
  width = 0.7 * 3
  height = 0.7 * 3
  borderRadius = 0.35 * 3

  images = {
    [PlayerColor.Blue * 10 + Step.Day]: ApprenticeDiscDayBlue,
    [PlayerColor.Blue * 10 + Step.Night]: ApprenticeDiscNightBlue,
    [PlayerColor.Grey * 10 + Step.Day]: ApprenticeDiscDayGrey,
    [PlayerColor.Grey * 10 + Step.Night]: ApprenticeDiscNightGrey,
    [PlayerColor.Red * 10 + Step.Day]: ApprenticeDiscDayRed,
    [PlayerColor.Red * 10 + Step.Night]: ApprenticeDiscNightRed,
    [PlayerColor.Yellow * 10 + Step.Day]: ApprenticeDiscDayYellow,
    [PlayerColor.Yellow * 10 + Step.Night]: ApprenticeDiscNightYellow
  }
}

export const apprenticeDiscDescription = new ApprenticeDiscDescription()
