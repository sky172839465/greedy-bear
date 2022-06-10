import * as React from 'react'
import { Form } from 'antd'
import { isEmpty } from 'lodash'
import styles from './index.module.scss'

const ImageRow = React.memo((props) => {
  const { image, width } = props

  return (
    <div
      className={styles.imgContainer}
      style={{ width: `${width}%` }}
    >
      <img
        src={image}
        alt={`img ${image}`}
        className={styles.img}
        loading='lazy'
      />
    </div>
  )
})

function ImageRows(props) {
  const { images = [] } = props
  const form = Form.useFormInstance()
  const imageWidth = Form.useWatch('imageWidth', form)

  if (isEmpty(images)) {
    return null
  }

  return (
    <div
      className={styles.imgArea}
      // style={{ width: `${imageWidth}%` }}
    >
      {images.map((image) => (
        <ImageRow
          key={image}
          image={image}
          width={imageWidth}
        />
      ))}
    </div>
  )
}

export default ImageRows
