import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {RootState} from '../redux/rootReducer';
import {fetchMyArtistInfo} from '../services/requests';
import {
  clearArtistDetails,
  setArtistDetails,
} from '../features/artistDetailsSlice';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {AlbumLabel} from '../components/AlbumLabel';
import {colors, defaultMainPadding, screenWidth} from '../styles/constans';

export interface AlbumDetailsScreenProps {
  artist: string;
}

type Props = NativeStackScreenProps<
  MainStackParamList,
  ScreenEnum.AlbumDetailsScreen
>;

export const AlbumDetailsScreen: React.FC<Props> = ({route}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const albumInfo = useSelector((state: RootState) => state.albumInfo);
  const artistDetails = useSelector((state: RootState) => state.artistDetails);

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {artist} = route.params;

  useEffect(() => {
    fetchMyArtist();
    return () => {
      dispatch(clearArtistDetails());
    };
  }, []);

  const fetchMyArtist = async () => {
    setLoading(true);
    const data = await fetchMyArtistInfo(artist);

    if (data?.status === 200) {
      dispatch(setArtistDetails(data.data.artist));
    } else {
      dispatch(clearArtistDetails());
      setErrorText('Something went wrong');
    }
    setLoading(false);
  };

  const handleErrorClose = () => {
    navigation.goBack();
    setErrorText('');
  };

  const formatText = (text?: string) => {
    const startIndex = text?.indexOf('<a');
    const endIndex = text?.indexOf('</a>');

    const isText =
      text && startIndex && endIndex && startIndex !== -1 && endIndex !== -1;

    if (isText) {
      const linkSubstring = text?.substring(startIndex, endIndex + 4);
      return (
        <>
          <Text style={styles.desc}>{text.slice(0, startIndex)}</Text>
          <RenderHtml
            contentWidth={screenWidth - defaultMainPadding * 2}
            source={{html: linkSubstring}}
          />
        </>
      );
    } else {
      return <Text style={styles.desc}>{text}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <ErrorToast
        visible={!!errorText}
        handleClose={handleErrorClose}
        errorText={errorText}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.scrollCont}>
        <AlbumLabel
          style={{
            width: screenWidth - defaultMainPadding * 2,
            height: screenWidth - defaultMainPadding * 2,
            borderRadius: 8,
          }}
          item={{image: albumInfo?.image}}
        />
        <Text style={styles.greyText}>Name:</Text>
        <Text style={styles.boldText}>{albumInfo.name}</Text>
        <Text style={styles.greyText}>Artist:</Text>
        <Text style={styles.boldText}>{albumInfo.artist}</Text>
        <View style={styles.textContainer}>
          {formatText(albumInfo?.wiki?.content)}
        </View>
        <View style={styles.textContainer}>
          {formatText(artistDetails?.bio?.content)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: defaultMainPadding,
    backgroundColor: colors.white,
    flex: 1,
  },
  boldText: {
    fontWeight: '800',
    color: colors.black,
    fontSize: 16,
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
  greyText: {
    fontWeight: '800',
    color: colors.grey,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  textContainer: {
    marginBottom: 60,
  },
  desc: {
    color: colors.darkGrey,
    lineHeight: 22,
  },
  scrollCont: {
    paddingTop: 20,
    height: '100%',
  },
});
