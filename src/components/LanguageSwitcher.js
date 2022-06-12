import * as React from 'react'
import { navigate } from 'gatsby'

import { linkResolver } from '../utils/linkResolver'


export const LanguageSwitcher = ({ activeDocMeta }) => {
  const currentLang = activeDocMeta.lang
  function fullLang(lang){
    return lang == "EN" ? "English" : lang == "FR" ? "French" : lang  
  }
  const currentLangOption = (
    <option value={currentLang}>{fullLang(currentLang.slice(0, 2).toUpperCase())}</option>
  )

  const alternateLangOptions = activeDocMeta.alternateLanguages.map(
    (altLang, index) => (
      <option value={linkResolver(altLang)} key={`alt-lang-${index}`}>
        {fullLang(altLang.lang.slice(0, 2).toUpperCase())}
      </option>
    ),
  )

  const handleLangChange = (event) => {
    navigate(event.target.value)
  }

  return (
    <li className="language-switcher">
      <div>
        <span>Language: </span>
        <select value={currentLang} onChange={handleLangChange}>
          {currentLangOption}
          {alternateLangOptions}
        </select>
      </div>
    </li>
  )
}
