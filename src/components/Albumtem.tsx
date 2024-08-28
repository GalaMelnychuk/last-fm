import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IAlbum} from '../types';
import {colors} from '../styles/constans';

interface Props {
  item: IAlbum;
  onPress: () => void;
}

export const AlbumItem: React.FC<Props> = ({item, onPress}) => {
  const uri =
    item.image[3]['#text'] || item.image.find(el => el['#text'])?.['#text'];

  return (
    <View>
      <TouchableOpacity activeOpacity={1} style={styles.btn} onPress={onPress}>
        <View style={styles.wrapper}>
          <View style={styles.imageCont}>
            {uri && (
              <Image
                source={{uri: item.image[3]['#text']}}
                resizeMode="cover"
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.textCont}>
            <Text style={styles.boldText}>{item.name}</Text>
            <Text style={styles.greyText}>{item.artist.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageCont: {
    backgroundColor: colors.white,
    borderRadius: 100,
    width: 51,
    height: 51,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.grey,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    alignItems: 'center',
  },
  textCont: {
    marginLeft: 10,
  },
  boldText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  greyText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: colors.grey,
    marginRight: 10,
  },
  image: {
    width: 51,
    height: 51,
    borderRadius: 90,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    flex: 0.87,
  },
});
