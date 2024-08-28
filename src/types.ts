export interface IArtist {
  mbid: string;
  name: string;
  url: string;
}

export interface IImage {
  '#text': string;
  size: string;
}

export interface IAlbum {
  artist: IArtist;
  image: IImage[];
  mbid: string;
  name: string;
  url: string;
}

interface Attr {
  page: string;
  perPage: string;
  tag: string;
  total: number;
  totalPages: number;
}

export interface ResponseTopAlbums {
  config: any;
  data: {
    albums: {
      album: IAlbum[];
      '@attr': Attr;
    };
  };
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
