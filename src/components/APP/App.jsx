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
  const [loading, setLoading] = useState('false');
  const [error, setError] = useState(null);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const handleFormSubmit = query => {
    setQuery('');
    setLoading(true);
    setPage(1);
    setImages([]);
    setIsBtnVisible(false);
  }
  
  useEffect(() => { 
    if (query === '') {
      return;
    }

    FetchRequestApi.fetchRequest(query)
      .then(({ hits, totalHits }) => {
         console.log('query:', query);  
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
        setError({ error });
          return toast('Something went wrong! Please retry');        
        })        
      .finally(() => setLoading(false));       
  
  }, [query, page])        


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
  };

  // state = {
  //   query:'',
  //   page: 1,    
  //   images: [],
  //   loading: false,
  //   error: null,  
  //   isBtnVisible: false,
  // }

  
  // componentDidUpdate = (_, prevState) => {
  //   const{query,page}= this.state
  //     console.log('prevState.query:', prevState.query);
  //     console.log('this.state.query:', query);  
  //   if (prevState.page !== page || prevState.query !== query) {   
  //       FetchRequestApi.fetchRequest(query)
  //         .then(({ hits, totalHits }) => {
  //          if (hits.length === 0) {
  //            toast(`Sorry, there are no images matching your search query. Please try again.`);
             
  //           return;
  //                } else {
  //            toast(`Hooray! We found ${totalHits} images.`)
            
  //     }   
     
  //         this.setState(state => ({
  //           images: [...this.state.images, ...hits],
  //           loading: false,
           
  //         }));
  //       })
  //       .catch(error => {
  //         this.setState({ error });
  //         return toast('Something went wrong! Please retry');
  //       })        
  //       .finally(() => this.setState({ loading: false }));       
  //   }  
  // }

 
  
  
 
  
 

  

