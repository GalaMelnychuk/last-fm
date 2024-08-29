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
  mbid?: string;
  name: string;
  url: string;
}

interface Attr {
  page: string;
  perPage: string;
  total: number;
  totalPages: number;
  user: string;
}

export interface IWikiAlbum {
  content: string;
  published: string;
  summary: string;
}

export interface ITrakAlbum {
  '@attr': {rank: string};
  artist: IArtist;
  duration: number;
  name: string;
  streamable: {fulltrack: string; '#text': string};
  url: string;
}

export interface IAlbumInfo {
  artist: string;
  image: IImage[] | [];
  listeners: string;
  mbid: string;
  name: string;
  playcount: string;
  tags: {tag: {url: string; name: string}[] | []};
  tracks?: {
    track: ITrakAlbum[] | [];
  };
  url: string;
  wiki: IWikiAlbum;
}

export interface IArtistInfo {
  bio: {
    content: string;
    published: string;
    summary: string;
  };
  image: IImage[] | [];
  mbid: string;
  name: string;
  similar?: {artist: IArtist[]};
  tags?: {tag: {name: string; url: string}[]};
  url: string;
}

interface Response {
  config: any;
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface ResponseTopAlbums extends Response {
  data: {
    topalbums: {
      album: IAlbum[];
      '@attr': Attr;
    };
  };
}

export interface ResponseAlbumInfo extends Response {
  data: {
    album: IAlbumInfo;
  };
}

export interface ResponseArtistInfo extends Response {
  data: {
    artist: IArtistInfo;
  };
}
