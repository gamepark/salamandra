import { CardDescription } from '@gamepark/react-game'
import { Step } from '@gamepark/salamandra/material/Step'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import ApprenticeBlueDay from '../images/tokens/apprentice/ApprenticeBlueDay.jpg'
import ApprenticeBlueNight from '../images/tokens/apprentice/ApprenticeBlueNight.jpg'
import ApprenticeGreyDay from '../images/tokens/apprentice/ApprenticeGreyDay.jpg'
import ApprenticeGreyNight from '../images/tokens/apprentice/ApprenticeGreyNight.jpg'
import ApprenticeRedDay from '../images/tokens/apprentice/ApprenticeRedDay.jpg'
import ApprenticeRedNight from '../images/tokens/apprentice/ApprenticeRedNight.jpg'
import ApprenticeYellowDay from '../images/tokens/apprentice/ApprenticeYellowDay.jpg'
import ApprenticeYellowNight from '../images/tokens/apprentice/ApprenticeYellowNight.jpg'

class ApprenticeTokenDescription extends CardDescription {
  width = 2.1
  height = 2.1
  borderRadius = this.width / 2

  images = {
    [PlayerColor.Blue * 10 + Step.Day]: ApprenticeBlueDay,
    [PlayerColor.Blue * 10 + Step.Night]: ApprenticeBlueNight,
    [PlayerColor.Grey * 10 + Step.Day]: ApprenticeGreyDay,
    [PlayerColor.Grey * 10 + Step.Night]: ApprenticeGreyNight,
    [PlayerColor.Red * 10 + Step.Day]: ApprenticeRedDay,
    [PlayerColor.Red * 10 + Step.Night]: ApprenticeRedNight,
    [PlayerColor.Yellow * 10 + Step.Day]: ApprenticeYellowDay,
    [PlayerColor.Yellow * 10 + Step.Night]: ApprenticeYellowNight
  }
}

export const apprenticeTokenDescription = new ApprenticeTokenDescription()
