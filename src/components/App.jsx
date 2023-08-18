import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';

import { Searchbar } from './searchbar/searchbar';
import { Foooter } from './footer/footer';
import { getImages } from '../api/api';
import { ImageGallery } from './imageGallery/imageGallery';
import { Button } from './button/button';
import { Loader } from './loader/loader';

import css from './styles.module.css';

export const App = () => {
  const [page, setPage] = useState(1);
  const [keyWord, setKeyWord] = useState('');
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // const firstRender = useRef(true);
  // (тут достатньо перевірки на keyWord === '', в інших випадках можна через useRef)


  useEffect(
    () => {

      if (keyWord === ''
        // || firstRender.current
      ) {
        // firstRender.current = false;
          Notiflix.Notify.warning('Please enter something to search!');
        return;
      } else {
        setLoading(true);

        getImages(page, keyWord)
          .then(({ photosFromAPI, totalFromAPI }) => {
            setPhotos(prev => [...prev, ...photosFromAPI]);
            setTotal(totalFromAPI);
            // console.log('totalFromAPI', totalFromAPI);
            // console.log('photosFromAPI', photosFromAPI);
                
                if (totalFromAPI === 0) {
                  Notiflix.Notify.failure(
                    'Sorry, there are no images matching your search query. Please try again.'
                  );
                }
                if (totalFromAPI !== 0 && page === 1) {
                  Notiflix.Notify.success(
                  `Hooray! We found ${totalFromAPI} images`
                   );
                } 
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [keyWord, page]
  );
  

  const changeKeyWord = keyWord => {
    setPage(1);
    setKeyWord(keyWord);
    setPhotos([]);
    setTotal(0)
  };

  const onClick = e => {
    e.preventDefault();
    setPage(prev => prev + 1);
  };


  return (
    <>
      <Searchbar changeKeyWord={changeKeyWord} />

      {page === 1 && loading && (
        <section className={css.section}>
          <Loader />
        </section>
      )}

      {photos.length !== 0 && (
        <section className={css.section}>
          <ImageGallery photos={photos} keyWord={keyWord} />
          {total > photos.length && !loading && <Button onClick={onClick} />}
          {loading && <Loader />}
        </section>
      )}
      <Foooter />
    </>
  );
}