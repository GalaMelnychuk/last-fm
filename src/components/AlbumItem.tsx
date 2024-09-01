import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IAlbum} from '../types';
import {colors} from '../styles/constans';
import {GreyItalicText} from './ui/GreyItalicText';
import {BlackBoldText} from './ui/BlackBoldText';

interface Props {
  item: IAlbum;
  onPress: () => void;
}

export const AlbumItem: React.FC<Props> = ({item, onPress}) => {
  const uri =
    item?.image[2]['#text'] || item?.image?.find(el => el['#text'])?.['#text'];

  return (
    <View>
      <TouchableOpacity activeOpacity={1} style={styles.btn} onPress={onPress}>
        <View style={styles.wrapper}>
          <View style={styles.imageCont}>
            {uri && (
              <Image source={{uri}} resizeMode="cover" style={styles.image} />
            )}
          </View>
          <View style={styles.textCont}>
            <BlackBoldText text={item.name} />
            <GreyItalicText text={item.artist.name} style={styles.greyText} />
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
  greyText: {
    fontSize: 14,
    marginRight: 10,
    textTransform: 'none',
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
