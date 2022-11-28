import axios from "axios";

class FavoriteDataService  {

  getAllFavoriteMovies(id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${id}`);
  }

  updateFavorite(data) {
    return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
  }

  getMovies(id) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favoriteMovies/${id}`);
  }
}

export default new FavoriteDataService();