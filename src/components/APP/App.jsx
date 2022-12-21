import { useState, useEffect } from 'react';
import { GlobalStyle } from '../GlobalStyles';
import 'modern-normalize';
import Searchbar from '../SearchbarFolder/Searchbar';
import { ImageGallery } from '../ImageGalleryFolder/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FetchRequestApi from '../Servises/Api'
import { Section } from './App.Styled';
import {LoadMore } from '../ButtonFolder/Button'
import { Vortex } from 'react-loader-spinner'



export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setIsBtnVisible] = useState(false);  
  
  
      useEffect(() => { 
        if (query === '') {
          return
        }else {
          FetchRequestApi.fetchRequest(query)
            .then(({ hits, totalHits }) => {
           
              if (hits.length === 0) {
                toast(`Sorry, there are no images matching your search query. Please try again.`);
                return;
              } else {
                toast(`Hooray! We found ${totalHits} images.`)
              }
              setLoading(false);
              setImages(prevImages => [...prevImages, ...hits]);
         
            })

            .catch(error => {
              console.log(error);
              setError({ error });
              setLoading(false);
              return toast('Something went wrong! Please retry');
            })
            .finally(() => setLoading(false))
  
        }     
  
      }, [query, page]);
    
    const handleFormSubmit = query => {
      setQuery(query);
      setLoading(true);
      setPage(1);
      setImages([]);   
    }
    
    const loadMore = () => {
      setPage(prevPage => prevPage + 1);
      setLoading(true);
  
      const {totalHits } = query;  
      const amountOfPages = totalHits / 12 - page;
      if (amountOfPages < 0) {
        setIsBtnVisible(false);
      }
    }  
 

 return(
    <Section>   
      <Searchbar onSubmit={handleFormSubmit} isSubmitting= {loading}/>
        {!images &&  toast('Enter a search query!')} 
        {images && <ImageGallery images={images}></ImageGallery> }
        {error &&  <h1>{error.message}</h1>  }
        {loading && <Vortex/>}
        {images.length > 11 &&  (
          <LoadMore onClick={loadMore} />)}       
        <GlobalStyle />
       <ToastContainer autoClose={2000} />
    </Section>
  );
  }