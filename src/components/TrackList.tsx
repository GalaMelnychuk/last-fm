import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AlbumLabel} from './AlbumLabel';
import {colors} from '../styles/constans';
import {IAlbumInfo, ITrakAlbum} from '../types';

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
      contentContainerStyle={{paddingVertical: 20}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <AlbumLabel item={{image: album?.image, name: album?.name}} />
          {data && !!data.length ? (
            <Text style={styles.greyText}>Tracks:</Text>
          ) : (
            <Text style={styles.greyText}>No tracks provided 👀</Text>
          )}
        </>
      }
      renderItem={({item}) => renderList(item)}
      ListFooterComponent={
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Read more about the author</Text>
        </TouchableOpacity>
      }
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
  text: {
    fontWeight: '800',
    color: colors.darkGrey,
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    marginTop: 12,
    marginBottom: 26,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
  },
});
