import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import messages from '../messages.json';
import {defaultMainPadding, screenWidth} from '../styles/constans';
import {IAlbumInfo, ITrakAlbum} from '../types';
import {AlbumLabel} from './AlbumLabel';
import {GreyItalicText} from './ui/GreyItalicText';

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
          <AlbumLabel
            style={styles.label}
            item={{image: album?.image, name: album?.name}}
          />
          {data && !!data.length ? (
            <GreyItalicText text={messages.tracks} style={styles.greyText} />
          ) : (
            <GreyItalicText text={messages.no_tracks} />
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
  },
  trackNameText: {
    marginBottom: 10,
  },
  list: {
    paddingVertical: 20,
  },
  label: {
    width: screenWidth - defaultMainPadding * 2,
    height: screenWidth - defaultMainPadding * 2,
    borderRadius: 8,
  },
});
