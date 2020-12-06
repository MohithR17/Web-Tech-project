import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();//when we send the data into backand server we need to use formdata
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/product/uploadImage', formData, config)//when we do http request to the backandconfig is sent so that we are not going to have any error
            //route inside routes/product.js
            //first when we send this request it comes to index.js there we find 'api/product' line
            .then(response => {
                if (response.data.success) {
                    //if image is uploaded succesfully we get an information from /routes/product/uploadImage to store that state is created at top of the file 
                    setImages([...Images, response.data.image])//set the new image after the images because its an array of images
                    props.refreshFunction([...Images, response.data.image])//set the images in parent also  

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)//starting from currentIndex how many images we want to delelte is specified by second argument

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', height: '250px'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}//upload one file at once
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '400px', height: '300px', border: '1px solid gray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '4rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '400px', height: '300px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '400px', height: '300px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
