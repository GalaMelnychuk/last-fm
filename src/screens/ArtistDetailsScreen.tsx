import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../redux/rootReducer';
import {fetchMyArtistInfo} from '../services/requests';
import {
  clearArtistDetails,
  setArtistDetails,
} from '../features/artistDetailsSlice';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {colors, defaultMainPadding, screenWidth} from '../styles/constans';

export interface ArtistDetailsScreen {
  artist: string;
}

type Props = NativeStackScreenProps<
  MainStackParamList,
  ScreenEnum.ArtistDetailsScreen
>;

export const ArtistDetailsScreen: React.FC<Props> = ({route}) => {
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

    const isLinkInText =
      text && startIndex && endIndex && startIndex !== -1 && endIndex !== -1;

    if (isLinkInText) {
      return <Text style={styles.desc}>{text.slice(0, startIndex)}</Text>;
    } else if (!!text) {
      return <Text style={styles.desc}>{text}</Text>;
    } else {
      return null;
    }
  };
  const noArtistInfo = !artistDetails?.bio?.content;

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
        <View style={{paddingBottom: 90, paddingTop: 20}}>
          <View>{formatText(artistDetails?.bio?.content)}</View>
          {noArtistInfo ? (
            <Text style={styles.desc}>No info provided 🤷‍♂️</Text>
          ) : null}
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
  textContainer: {
    marginBottom: 60,
  },
  desc: {
    color: colors.darkGrey,
    lineHeight: 22,
    fontSize: 16,
  },
  scrollCont: {
    height: '100%',
  },
  label: {
    width: screenWidth - defaultMainPadding * 2,
    height: screenWidth - defaultMainPadding * 2,
    borderRadius: 8,
  },
});
