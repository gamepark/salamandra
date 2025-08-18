import { CardDescription } from '@gamepark/react-game'
import { Step } from '@gamepark/salamandra/material/Step'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import DruidTileDayBlue from '../images/tiles/player/PlayerTileBlueDay.jpg'
import DruidTileDayGrey from '../images/tiles/player/PlayerTileGreyDay.jpg'
import DruidTileDayRed from '../images/tiles/player/PlayerTileRedDay.jpg'
import DruidTileDayYellow from '../images/tiles/player/PlayerTileYellowDay.jpg'
import DruidTileNightBlue from '../images/tiles/player/PlayerTileBlueNight.jpg'
import DruidTileNightGrey from '../images/tiles/player/PlayerTileGreyNight.jpg'
import DruidTileNightRed from '../images/tiles/player/PlayerTileRedNight.jpg'
import DruidTileNightYellow from '../images/tiles/player/PlayerTileYellowNight.jpg'

class DruidTileDescription extends CardDescription {
  width = 1.4 * 3
  height = 2.25 * 3
  borderRadius = 0

  images = {
    [PlayerColor.Blue * 10 + Step.Day]: DruidTileDayBlue,
    [PlayerColor.Blue * 10 + Step.Night]: DruidTileNightBlue,
    [PlayerColor.Grey * 10 + Step.Day]: DruidTileDayGrey,
    [PlayerColor.Grey * 10 + Step.Night]: DruidTileNightGrey,
    [PlayerColor.Red * 10 + Step.Day]: DruidTileDayRed,
    [PlayerColor.Red * 10 + Step.Night]: DruidTileNightRed,
    [PlayerColor.Yellow * 10 + Step.Day]: DruidTileDayYellow,
    [PlayerColor.Yellow * 10 + Step.Night]: DruidTileNightYellow
  }
}

export const druidTileDescription = new DruidTileDescription()
