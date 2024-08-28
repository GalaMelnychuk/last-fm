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
import {defaultMainPadding} from '../styles/constans';
import {AlbumItem} from '../components/Albumtem';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const topAlbums = useSelector((state: RootState) => state.topAlbums);

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getTopAlbums(page);

    if (data?.status === 200) {
      dispatch(setAlbums(data?.data.albums?.album));
      dispatch(setTotal(data?.data.albums['@attr']?.totalPages));
    } else {
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
      dispatch(setAlbums([...topAlbums.items, ...data.data.albums.album]));
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

  const navToAlbum = () => {
    navigation.navigate(ScreenEnum.AlbumScreen, {name: 'Test'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <ErrorToast
        visible={!!errorText}
        handleClose={() => setErrorText('')}
        errorText={errorText}
      />
      <FlatList
        data={topAlbums.items}
        renderItem={({item}) => <AlbumItem item={item} onPress={navToAlbum} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: defaultMainPadding,
    backgroundColor: 'white',
  },
});
