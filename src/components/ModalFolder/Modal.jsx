import PropTypes from 'prop-types';
import { useEffect } from "react"
import { createPortal } from "react-dom"
import {Overlay, Modal} from './ModalStyled'


const modalRoot = document.querySelector('#modal-root')

export default function ModalComponent({ image, onClose }) {
  
    
    useEffect(() => {

        window.addEventListener('keydown', handlekeyDown);
       
    
      
        
        return () => {
            window.removeEventListener('keydown', handlekeyDown)
        }
        
      
    })

      const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }

     const handlekeyDown = e => {
            if (e.code === 'Escape') {
                onClose()
            }
        }

    
   
    const { largeImageURL, tags } = image;
    return createPortal(
        < Overlay onClick={handleOverlayClick}>
            <Modal>
                <img src={largeImageURL} alt={tags} />
            </Modal>
        </ Overlay>,
        modalRoot,
    )

}
    
ModalComponent.propTypes = {
    image: PropTypes.object.isRequired,
};


