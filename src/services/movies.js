import axios from "axios";

class MovieDataService {

    getAll(page){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`);
    }

    find(query,by="title",page){
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
        );
    }


    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
    }

    get(id){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`);
    }

   

    getByIdList(idList) {
        let listString = JSON.stringify(idList);
        let url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/idList/${listString}`
        return axios.get(url);
    }



    createReview(data){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`,data);
    }


    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, data);
    }
    
      
    deleteReview(data) {
        return axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`,
          { data });
    }


    updateFavoritesList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }
    
    getAllFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }

}

export default new MovieDataService();