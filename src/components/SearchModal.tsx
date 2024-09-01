import React, {useEffect, useState} from 'react';
import {Input} from '../components/ui/Input';
import {artistSearch} from '../services/requests';
import {Button} from '../components/ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modalbox';
import {colors, defaultMainPadding, screenHeight} from '../styles/constans';
import {Loader} from '../components/Loader';
import {ErrorToast} from '../components/ErrorToast';
import {setArtistList, setTotalArtistList} from '../features/artistList';
import {ArlistItem} from '../components/ui/ArtistItem';

export const SearchModal = ({
  showModal,
  setShowModal,
  setArtist,
  setAlbumPage,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  setArtist: (state: string) => void;
  setAlbumPage: (state: number) => void;
}) => {
  const dispatch = useDispatch();
  const artistList = useSelector((state: RootState) => state.artistList);

  const [seachValue, setSearchValue] = useState('');

  const [errorText, setErrorText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [noItems, setNoItems] = useState(false);

  useEffect(() => {
    return () => {
      setSearchValue('');
      setPage(1);
      dispatch(setArtistList([]));
      dispatch(setTotalArtistList('0'));
    };
  }, []);

  useEffect(() => {
    if (!seachValue) {
      dispatch(setArtistList([]));
      dispatch(setTotalArtistList('0'));
    }
  }, [seachValue]);

  useEffect(() => {
    setPage(1);
  }, [seachValue]);

  const fetchArtistList = async () => {
    setLoading(true);
    const data = await artistSearch(seachValue, page);

    if (data?.status === 200) {
      dispatch(setArtistList(data?.data?.results?.artistmatches?.artist));
      dispatch(
        setTotalArtistList(data?.data?.results['opensearch:itemsPerPage']),
      );
    } else {
      dispatch(setArtistList([]));
      setErrorText('Something went wrong');
    }
    setLoading(false);
  };

  const fetchMoreArtistList = async (pageNum: number) => {
    if (pageNum >= Number(artistList.total) || loading || loadingMore) {
      return;
    }

    setLoadingMore(true);
    const data = await artistSearch(seachValue, pageNum);

    if (data?.status === 200) {
      if (!data?.data?.results?.artistmatches?.artist?.length) {
        setNoItems(true);
      }
      dispatch(
        setArtistList([
          ...artistList.items,
          ...data?.data?.results?.artistmatches?.artist,
        ]),
      );
    } else {
      setErrorText('Something went wrong');
    }
    setLoadingMore(false);
  };

  const onEndReached = () => {
    setPage(prev => {
      fetchMoreArtistList(prev + 1);
      return prev + 1;
    });
  };

  const handleErrorClose = () => {
    setErrorText('');
  };

  return (
    <View>
      <Modal
        isOpen={showModal}
        style={styles.modal}
        animationDuration={100}
        position="bottom"
        swipeToClose
        onClosed={() => setShowModal(false)}
        coverScreen>
        <View style={styles.wrapper}>
          <View style={styles.swipeLine} pointerEvents="none" />
          <Loader isLoading={loading} />
          <ErrorToast
            visible={!!errorText}
            handleClose={handleErrorClose}
            errorText={errorText}
          />
          <Input
            value={seachValue}
            onChangeText={text => setSearchValue(text)}
            placeholderText="Artist Name"
          />

          <Button
            containerStyles={{alignItems: 'center'}}
            title={'🔍  Search'}
            onPress={() => {
              if (seachValue) {
                fetchArtistList();
              }
            }}
          />
          {artistList?.items && !!artistList?.items?.length && (
            <FlatList
              data={artistList.items}
              renderItem={({item}) => (
                <ArlistItem
                  name={item.name}
                  onPress={() => {
                    setArtist(item.name);
                    setAlbumPage(1);
                    setShowModal(false);
                  }}
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
          )}
          {noItems && <Text>No matches</Text>}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 90,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight - 50,
    paddingBottom: 26,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: defaultMainPadding,
  },
  wrapper: {
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  swipeLine: {
    marginTop: 13,
    marginBottom: 14,
    width: 36,
    height: 5,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: colors.lightGrey,
  },
});
