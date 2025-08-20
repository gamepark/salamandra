import { CardDescription } from '@gamepark/react-game'
import { Step } from '@gamepark/salamandra/material/Step'
import { PlayerColor } from '@gamepark/salamandra/PlayerColor'
import DruidTileDayBlue from '../images/tiles/player/PlayerTileBlueDay.png'
import DruidTileDayGrey from '../images/tiles/player/PlayerTileGreyDay.png'
import DruidTileDayRed from '../images/tiles/player/PlayerTileRedDay.png'
import DruidTileDayYellow from '../images/tiles/player/PlayerTileYellowDay.png'
import DruidTileNightBlue from '../images/tiles/player/PlayerTileBlueNight.png'
import DruidTileNightGrey from '../images/tiles/player/PlayerTileGreyNight.png'
import DruidTileNightRed from '../images/tiles/player/PlayerTileRedNight.png'
import DruidTileNightYellow from '../images/tiles/player/PlayerTileYellowNight.png'

class DruidTileDescription extends CardDescription {
  width = 4.4
  height = 6.9
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
