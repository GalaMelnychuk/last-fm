import axios from 'axios';
import {ResponseAlbumInfo, ResponseTopAlbums} from '../types';
import {store} from '../redux/store';

const API_KEY = '3bdc3a7eee15f9ad433e72d91198877e';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0';

export const getTopAlbums = async (page: number) => {
  const user = store.getState().userName || 'rj';

  try {
    const data: ResponseTopAlbums = await axios({
      url: `${BASE_URL}/?method=user.gettopalbums&user=${user}&api_key=${API_KEY}&format=json`,
      method: 'get',
      params: {
        page,
        limit: 10, // items per page
      },
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getAlbum = async (artist: string, album: string) => {
  try {
    const data: ResponseAlbumInfo = await axios({
      url: `${BASE_URL}/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`,
      method: 'get',
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
