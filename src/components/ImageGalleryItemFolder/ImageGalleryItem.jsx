import PropTypes from 'prop-types';
import { useState } from "react"
import { ImageItem, Image } from './ImageGalleryItem.Styled'
import ModalComponent from '../ModalFolder/Modal'




export default function ImageElementItem({ image, webformatURL, tags }) {
   const [showModal, setShowModal] = useState('false');
 
const toggleModal = () => setShowModal(showModal => !showModal);      


  
    return( 
      <>           
        <ImageItem >   
          <Image onClick={toggleModal} src={webformatURL} alt={tags} /> 
        </ImageItem>             
        {showModal && <ModalComponent image={image} onClose={toggleModal} />}             
    </>
  )
   
   
   
  
} 
   

ImageElementItem.propTypes = {   
    webformatUR:  PropTypes.string.isRequired,
    
}

