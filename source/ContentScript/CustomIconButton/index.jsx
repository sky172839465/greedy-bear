import * as React from 'react'
import { Button } from 'antd'
import styles from './index.module.scss'

function CustomButton(props) {
  const { icon: Icon, ...restProps } = props
  return (
    <span className={styles.customBtnArea}>
      <Button
        shape='circle'
        icon={
          <Icon style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem' }} />
        }
        {...restProps}
      />
    </span>
  )
}

export default CustomButton
