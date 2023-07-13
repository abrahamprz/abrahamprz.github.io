import { useTranslation } from "react-i18next"

function Profile() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('profile.name')}</h1>
      <div className="presentation">
        <h2>{t('profile.aboutMe')}</h2>
        <p>{t('profile.aboutMeText')}</p>
      </div>
    </div>
  )
}

export default Profile