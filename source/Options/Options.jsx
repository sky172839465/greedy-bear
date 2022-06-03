import * as React from 'react'

import './styles.scss'

function Options() {
  return (
    <div>
      <form>
        <p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor='username'>Your Name</label>
          <br />
          <input
            type='text'
            id='username'
            name='username'
            spellCheck='false'
            autoComplete='off'
            required
          />
        </p>
        <p>
          <label htmlFor='logging'>
            <input type='checkbox' name='logging' />
            {' '}
            Show the features enabled
            on each page in the console
          </label>
        </p>
      </form>
    </div>
  )
}

export default Options
