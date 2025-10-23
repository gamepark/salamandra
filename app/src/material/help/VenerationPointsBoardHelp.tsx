import { Trans, useTranslation } from 'react-i18next'
import { components } from './utils'

export const VenerationPointsBoardHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.majorities')}</h2>
      <p>
        <Trans defaults="help.majorities.rule" components={components}/>
      </p>
    </>
  )
}
