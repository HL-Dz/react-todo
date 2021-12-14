import { Button, Input } from "antd"
import React, { useState } from "react"
import FileBase64 from "react-file-base64"
import { delay } from "../../helpers/helpers"
import ModalElem from "../Modal/Modal"
import "./UploadModule.scss"
import imagesData from "./images"
import { v4 as uuidv4 } from "uuid"

const imgAPI = "https://ji8fxxbyzi.execute-api.eu-central-1.amazonaws.com/dev"

const UploadModule = () => {
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [isLoading, setIsloading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [images, setImages] = useState([])
	
  const sumbutHandler = async (e) => {
    if(text && image) {
      setIsloading(true)
      await delay(1000)
      addImg()
    }
    resetForm()
  }

  const resetForm = () => {
    setText("")
    setImage("")
  }

  const showImages = () => {
    setVisible(true)
    getAllImages()
  }

  const deleteImage = (id) => {
    setImages((prev) => {
      return [...prev.filter(el => el.id !== id)]
    })
  }

  const getAllImages = async () => {
    try {
      const res = await fetch(`${imgAPI}/images`)
      if(res.status === 200) {
        const images = await res.json()
        setImages(images)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addImg = async () => {
    let imgObj = {
      id: uuidv4(),
      title: text,
      src: image
    }
    try {
      const res = await fetch(`${imgAPI}/images`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          // "Content-Type": "application/json"
        },
        body: JSON.stringify(imgObj)
      })
      if(res.status === 200) {
        const imgObj = await res.json()
        // setImages(prev => [...prev, imgObj])
        setIsloading(false)
      } else {
        setIsloading(false)
      }
    } catch (err) {
      console.log(err)
      setIsloading(false)
    }
  }


	
  return (
    <div className="upload">
      <div className="container">
        <div className="images">
          <ModalElem visible={visible} setVisible={setVisible} images={images} deleteImage={deleteImage}/>
        </div>
        <div className="upload-wrap">
          <form action="" className="form-wrap">
            <Input
              placeholder="Enter image title..."
              style={{marginRight: 10}}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <FileBase64
              accept="image/*"
              type="file"
              multiple={ false }
              onDone={ ({base64}) => setImage(base64)} />
          </form>
          <div className="buttons-wrap">
            <Button
              type="primary"
              onClick={sumbutHandler}
              loading={isLoading}
            >Upload</Button>
            <Button
              type="default"
              style={{marginLeft: 10}}
              onClick={showImages}
            >Show images</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadModule