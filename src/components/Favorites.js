import { useState, useEffect, useCallback } from 'react';
import FavoriteDataService from "../services/favorites";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { DnDCard } from './DnDCard';
import Container from 'react-bootstrap/Container';



import "./Favorites.css";



const Favorites = ({
  user,
  setFavorites,
  favorites }) => {
  const [cards, setCards] = useState([])

  
  const getFavorite = useCallback(() => {
    if (user) {
      FavoriteDataService.getMovies(user.googleId)
        .then(repsonse => {
          setCards(repsonse.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [user]);

  useEffect(() => {
    getFavorite();
  }, [getFavorite]);
  
  const reorderFavorite = useCallback(() => {
    let rank = [];
    for (var i = 0; i < cards.length; i++) {
      rank[i] = cards[i]._id;
    };
    setFavorites(rank);
  }, [cards, setFavorites]);

  
  useEffect(() => {
    reorderFavorite();
  }, [reorderFavorite]);



  const ListOfFav = () => {
      const moveCard = useCallback((id, index) => {
        setCards((cards) => update(cards, {
            $splice: [
              [id, 1],
              [index, 0, cards[id]],
            ],
          }),
        );
      }, [])
    return (
      <div>

        {cards.map((card, index) => (
          <DnDCard
            id={card._id}
            index={index}
            title={card.title}
            poster={card.poster}
            moveCard={moveCard}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='App'>
      <Container className="favoritesContainer">
      <div className="favoritesPanel">
            {
            favorites.length < 1 ?
              "Choose your favorite movies"
              :
              "Drag your favorites to rank"
          }
      </div>
      <DndProvider backend={HTML5Backend}>
        <ListOfFav />
      </DndProvider>
      </Container>
    </div>
  )

}   

export default Favorites;