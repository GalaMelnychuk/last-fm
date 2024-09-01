import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {RootState} from '../redux/rootReducer';
import {getAlbum} from '../services/requests';
import {clearAlbumInfo, setAlbumInfo} from '../features/albumInfoSlice';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {colors, defaultMainPadding} from '../styles/constans';
import {TrackList} from '../components/TrackList';
import {Button} from '../components/ui/Button';

export interface AlbumTracksScreenProps {
  artist: string;
  album: string;
}

type Props = NativeStackScreenProps<
  MainStackParamList,
  ScreenEnum.AlbumTracksScreen
>;

export const AlbumTracksScreen: React.FC<Props> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const albumInfo = useSelector((state: RootState) => state.albumInfo);

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {artist, album} = route.params;

  useEffect(() => {
    fetchDataAlbum();
    return () => {
      dispatch(clearAlbumInfo());
    };
  }, []);

  const fetchDataAlbum = async () => {
    setLoading(true);
    const data = await getAlbum(artist, album);

    if (data?.status === 200) {
      dispatch(setAlbumInfo(data?.data?.album));
    } else {
      dispatch(clearAlbumInfo());
      setErrorText('Something went wrong');
    }
    setLoading(false);
  };

  const handleErrorClose = () => {
    navigation.goBack();
    setErrorText('');
  };

  const navToArtist = () => {
    navigation.navigate(ScreenEnum.AlbumDetailsScreen, {
      artist: albumInfo.artist,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <ErrorToast
        visible={!!errorText}
        handleClose={handleErrorClose}
        errorText={errorText}
      />
      <TrackList data={albumInfo.tracks?.track} album={albumInfo} />
      <Button title="Read more about the album" onPress={navToArtist} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: defaultMainPadding,
    backgroundColor: colors.white,
    flex: 1,
  },
});
