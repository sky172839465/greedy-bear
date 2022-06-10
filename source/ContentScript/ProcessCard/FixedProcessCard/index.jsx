import * as React from 'react'
import cx from 'classnames'
import ProcessCard from '../index'
import styles from './index.module.scss'

function FixedProcessCard(props) {
  const [withOffset, setWithOffset] = React.useState(false)

  return (
    <div
      className={cx(
        styles.fixed,
        { [styles.withOffset]: withOffset },
      )}
    >
      <ProcessCard setWithOffset={setWithOffset} {...props} />
    </div>
  )
}

export default FixedProcessCard
