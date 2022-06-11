import * as React from 'react'
import browser from 'webextension-polyfill'

import './styles.scss'

function openWebPage(url) {
  return browser.tabs.create({ url })
}

function Popup() {
  return (
    <section id='popup'>
      <h2>WEB-EXTENSION-STARTER</h2>
      <button
        id='options__button'
        type='button'
        onClick={() => openWebPage('options.html')}
      >
        Options Page
      </button>
      <div className='links__holder'>
        <ul>
          <li>
            <button
              type='button'
              onClick={() => openWebPage(
                'https://github.com/abhijithvijayan/web-extension-starter',
              )}
            >
              GitHub
            </button>
          </li>
          <li>
            <button
              type='button'
              onClick={() => openWebPage(
                'https://www.buymeacoffee.com/sky172839465',
              )}
            >
              Buy Me A Coffee
            </button>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Popup
