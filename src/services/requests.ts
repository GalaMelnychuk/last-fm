import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';

import {
  ResponseAlbumInfo,
  ResponseArtistInfo,
  ResponseArtistList,
  ResponseTopAlbums,
} from '../types';
import {store} from '../redux/store';

export const getTopAlbums = async (page: number, artist?: string) => {
  const user = store.getState().userName || 'rj';
  const method = artist
    ? `artist.gettopalbums&artist=${artist}`
    : `user.gettopalbums&user=${user}`;

  try {
    const data: ResponseTopAlbums = await axios({
      url: `${BASE_URL}?method=${method}&api_key=${API_KEY}&format=json`,
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
      url: `${BASE_URL}?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`,
      method: 'get',
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchMyArtistInfo = async (artist: string) => {
  try {
    const data: ResponseArtistInfo = await axios({
      url: `${BASE_URL}?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`,
      method: 'get',
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const artistSearch = async (artist: string, page: number) => {
  try {
    const data: ResponseArtistList = await axios({
      url: `${BASE_URL}?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`,
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
