import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IImage} from '../types';

interface Props {
  item: {
    image: IImage[];
    name: string;
  };
}

export const AlbumLabel: React.FC<Props> = ({item}) => {
  if (!item || !item?.image || !item?.image?.length) {
    return null;
  }

  const uri =
    item?.image[3]['#text'] || item?.image?.find(el => el['#text'])?.['#text'];

  return (
    <View>
      {uri && <Image source={{uri}} resizeMode="cover" style={styles.image} />}
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 5,
  },
});
