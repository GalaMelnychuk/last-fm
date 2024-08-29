import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {getTopAlbums} from '../services/requests';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {setAlbums, setTotal} from '../features/topAlbumsSlice';
import {colors, defaultMainPadding} from '../styles/constans';
import {AlbumItem} from '../components/AlbumItem';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {ListPlaseholder} from '../components/ListPlaseholder';

export const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const topAlbums = useSelector((state: RootState) => state.topAlbums);

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getTopAlbums(page);

    if (data?.status === 200) {
      dispatch(setAlbums(data?.data?.topalbums?.album));
      dispatch(setTotal(data?.data?.topalbums['@attr']?.totalPages));
    } else {
      dispatch(setAlbums([]));
      setErrorText('Something went wrong');
    }
    setLoading(false);
  };

  const fetchMoreData = async (pageNum: number) => {
    if (pageNum >= Number(topAlbums.total) || loading || loadingMore) {
      return;
    }

    setLoadingMore(true);
    const data = await getTopAlbums(pageNum);

    if (data?.status === 200) {
      dispatch(setAlbums([...topAlbums.items, ...data.data.topalbums.album]));
    } else {
      setErrorText('Something went wrong');
    }
    setLoadingMore(false);
  };

  const onEndReached = () => {
    setPage(prev => {
      fetchMoreData(prev + 1);
      return prev + 1;
    });
  };

  const navToAlbum = async (artist: string, album: string) => {
    navigation.navigate(ScreenEnum.AlbumTracksScreen, {artist, album});
  };

  const handleErrorClose = () => {
    navigation.goBack();
    setErrorText('');
  };

  const renderContent = () => {
    if (topAlbums?.items?.length) {
      return (
        <FlatList
          data={topAlbums.items}
          renderItem={({item}) => (
            <AlbumItem
              item={item}
              onPress={() => navToAlbum(item.artist.name, item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" /> : null
          }
        />
      );
    } else if (!errorText) {
      return <ListPlaseholder />;
    } else null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <ErrorToast
        visible={!!errorText}
        handleClose={handleErrorClose}
        errorText={errorText}
      />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: defaultMainPadding,
    backgroundColor: colors.white,
  },
});
