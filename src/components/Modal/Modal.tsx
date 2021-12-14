import React, { FC, useState } from "react"
import "./Modal.scss"
import { Image, Modal } from "antd"

interface IModal {
 visible: boolean,
 setVisible: (value:boolean) => void,
 images: any
 deleteImage: (id:string) => void
}

const ModalElem:FC<IModal> = ({visible, setVisible, images, deleteImage}) => {
  return (
    <Modal
      title="Images"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={1400}
    >
      <div className="images-wrap">
        {
          images.length === 0 ? <div>No images...</div> : 
            images.map((elem:any) => {
              return (
                <div className="image-card" key={elem.id}>
                  {/* <div className="remove-icon" onClick={() => deleteImage(elem.id)}>
                    <span>Del</span>
                  </div>
                  <div className="image-title">{elem.title}</div> */}
                  {/* <div className="image-pic"> */}
                  <div className="remove-icon" onClick={() => deleteImage(elem.id)}>
                    <span>Del</span>
                  </div>
                  <div className="image-title">{elem.title}</div>
                  {/* <img src={elem.src} alt={elem.title} className="current-img" /> */}
                  <Image
                    width={300}
                    src={elem.src}
                    style={{maxWidth: "100%", height: "auto"}}
                  />
                  {/* </div> */}
                </div>
              )
            })
        }
      </div>
    </Modal>
  )
}

export default ModalElem