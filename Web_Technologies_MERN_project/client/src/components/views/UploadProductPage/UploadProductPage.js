import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
//const { TextArea } = Input;

const SovenirPlaces = [
    { key: 1, value: "Karnataka" },
    { key: 2, value: "Andhra Pradesh" },
    { key: 3, value: "Kashmir" },
    { key: 4, value: "Kerala" },
    { key: 5, value: "Kolhapuri" },
    { key: 6, value:  "Himachal Pradesh"},
    { key: 7, value: "Uttarakhand" },
    { key: 8, value: "Jaipur" }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    
    const [PriceValue, setPriceValue] = useState(0)
    const [PlaceValue, setPlaceValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }


    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setPlaceValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();

       
        if (!TitleValue) {
            return alert('Fill the Name of the product')
        }
        else if (!PriceValue){
            return alert('Fill the price')
        }
        else if(!Images)
        {
            return alert('Upload the image of product')
        }
        else if(!PlaceValue){
            return alert('Choose the place')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            price: PriceValue,
            images: Images,
            SovenirPlace: PlaceValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> Upload Souvenir Product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} /> 

                <br />
                <br />
                <br /><br />
                <label>Name of the product</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                
                <label>Price(in Rupees)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onContinentsSelectChange} value={PlaceValue}>
                    {SovenirPlaces.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
