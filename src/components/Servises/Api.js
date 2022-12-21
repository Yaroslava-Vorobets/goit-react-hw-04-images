import { KEYAPI } from './Servises';

function fetchRequest(query) {
    return fetch(`https://pixabay.com/api/?q=${query}&page=1&key=${KEYAPI}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
          if (res.ok) {
            return res.json()
          };
          return Promise.reject(new Error(`for this query${query}nothing was found `))
        })
          
}

const api = {fetchRequest,}
export default api
