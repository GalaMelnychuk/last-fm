import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {colors} from '../styles/constans';
import {IAlbumInfo, ITrakAlbum} from '../types';
import {AlbumLabel} from './AlbumLabel';

interface Props {
  data: Array<ITrakAlbum> | [] | undefined;
  album: IAlbumInfo;
}

export const TrackList: React.FC<Props> = ({data, album}) => {
  const renderList = (item: ITrakAlbum) => {
    if (!data?.length) {
      return null;
    } else {
      return <Text style={styles.trackNameText}>🎵 {item.name}</Text>;
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <AlbumLabel item={{image: album?.image, name: album?.name}} />
          {data && !!data.length ? (
            <Text style={[styles.greyText, styles.blackText]}>Tracks:</Text>
          ) : (
            <Text style={styles.greyText}>No tracks provided 👀</Text>
          )}
        </>
      }
      renderItem={({item}) => renderList(item)}
    />
  );
};

const styles = StyleSheet.create({
  greyText: {
    marginBottom: 10,
    fontWeight: '800',
    color: colors.grey,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  trackNameText: {
    marginBottom: 10,
  },
  list: {
    paddingVertical: 20,
  },
  blackText: {
    color: colors.grey,
  },
});
