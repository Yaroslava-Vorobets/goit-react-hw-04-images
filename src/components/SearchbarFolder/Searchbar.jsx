import PropTypes from 'prop-types';
import {useState} from "react"
import { toast } from 'react-toastify';
import {Section, SearchForm, SearchButton, Span, SearchFormInput} from './Searchbar.Styled';

export default function Searchbar ({onSubmit}) {
    const [query, setQuery] = useState('');
 

   const handleQueryChange = e => {
         setQuery(e.currentTarget.value.toLowerCase())
   }

     const handleSubmit = e => {
        e.preventDefault()
        if  (query.trim()===''){
         return toast.error("please enter a request");                 
       }       
         setQuery('');
    };

        return (
            <>
            <Section>
                <SearchForm className="form" onSubmit={handleSubmit} >
                    <SearchButton type="submit">
                    <Span>Search</Span>
                    </SearchButton>

                    <SearchFormInput
                    className="input"
                    type="text"
                    name="query"
                    value={query} 
                    placeholder="Search images and photos"
                    onChange={handleQueryChange}
                    autoComplete="off"/>                  
                </SearchForm>
            </Section>
            </>
        )
    }


Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};
 
  