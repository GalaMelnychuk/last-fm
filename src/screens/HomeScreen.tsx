import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {getTopAlbums} from '../services/requests';
import {useDispatch, useSelector} from 'react-redux';
import messages from '../messages.json';
import {RootState} from '../redux/rootReducer';
import {AlbumItem} from '../components/AlbumItem';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {ListPlaseholder} from '../components/ListPlaseholder';
import {Button} from '../components/ui/Button';
import {setTopAlbums, setTotalTopAlbums} from '../features/topAlbumsSlice';
import {RootContainer} from '../components/ui/RootContainer';
import {SearchModal} from '../components/SearchModal';

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  const topAlbums = useSelector((state: RootState) => state.topAlbums);

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [artist, setArtist] = useState('');

  useEffect(() => {
    fetchData();
  }, [artist]);

  const fetchData = async () => {
    setLoading(true);
    const data = await getTopAlbums(page, artist);

    if (data?.status === 200) {
      const res = data?.data?.topalbums;

      dispatch(setTopAlbums(res?.album));
      dispatch(setTotalTopAlbums(res?.['@attr']?.totalPages));
      setPage(prev => prev + 1);
    } else {
      dispatch(setTopAlbums([]));
      setErrorText(messages.common_error);
    }
    setLoading(false);
  };

  const fetchMoreData = async (pageNum: number) => {
    if (pageNum >= Number(topAlbums.total) || loading || loadingMore) {
      return;
    }

    setLoadingMore(true);
    const data = await getTopAlbums(pageNum, artist);

    if (data?.status === 200) {
      const res = data?.data?.topalbums;
      dispatch(setTopAlbums([...topAlbums.items, ...res?.album]));
      setPage(prev => prev + 1);
    } else {
      setErrorText(messages.common_error);
    }
    setLoadingMore(false);
  };

  const onEndReached = () => {
    fetchMoreData(page);
  };

  const navToAlbum = async (artist: string, album: string) => {
    navigation.navigate(ScreenEnum.AlbumTracksScreen, {artist, album});
  };

  const openModal = () => {
    setShowModal(true);
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
          contentContainerStyle={styles.list}
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
    } else {
      return null;
    }
  };

  return (
    <RootContainer>
      <Loader isLoading={loading} />
      <ErrorToast
        visible={!!errorText}
        handleClose={handleErrorClose}
        errorText={errorText}
      />
      {renderContent()}
      <Button
        // @ts-ignore
        containerStyles={styles.btn}
        title={messages.search_artist}
        onPress={openModal}
      />
      <SearchModal
        showModal={showModal}
        setShowModal={setShowModal}
        setArtist={setArtist}
        setAlbumPage={setPage}
      />
    </RootContainer>
  );
};

const styles = ScaledSheet.create({
  list: {
    paddingBottom: '110@ms',
  },
  btn: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: '60@ms',
  },
});
