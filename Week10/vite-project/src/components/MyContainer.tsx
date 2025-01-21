import { useTranslation } from "react-i18next"

const MyContainer = () => {
  const { t } = useTranslation()

  return (
    <div>{t('This is the front page')}</div>
  )
}

export default MyContainer