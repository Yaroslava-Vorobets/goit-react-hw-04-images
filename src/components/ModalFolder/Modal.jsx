import PropTypes from 'prop-types';
import { useEffect } from "react"
import { createPortal } from "react-dom"
import {Overlay, Modal} from './ModalStyled'


const modalRoot = document.querySelector('#modal-root')

export default function ModalComponent({ image, onClose }) {

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }
    
    useEffect(() => {

        window.addEventListener('keydown', handlekeyDown);
        const handlekeyDown = e => {
            if (e.code === 'Escape') {
                onClose()
            }
        }
    
        handleOverlayClick()
        
        return () => {
            window.removeEventListener('keydown', handlekeyDown)
        }
        
      
    }, [handleOverlayClick, onClose])

    
   
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


