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

interface Props {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  setArtist: (state: string) => void;
  setAlbumPage: (state: number) => void;
}

export const SearchModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  setArtist,
  setAlbumPage,
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
      setNoItems(false);
    };
  }, []);

  useEffect(() => {
    setPage(1);

    if (!seachValue) {
      dispatch(setArtistList([]));
      dispatch(setTotalArtistList('0'));
      setNoItems(false);
    }
  }, [seachValue]);

  const fetchArtistList = async () => {
    setLoading(true);
    const data = await artistSearch(seachValue, page);

    if (data?.status === 200) {
      const res = data?.data?.results;
      dispatch(setArtistList(res?.artistmatches?.artist));
      dispatch(setTotalArtistList(res['opensearch:totalResults']));

      if (res['opensearch:totalResults'] === '0') {
        setNoItems(true);
      }
      setPage(prev => prev + 1);
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
      const res = data?.data?.results;
      dispatch(
        setArtistList([...artistList.items, ...res?.artistmatches?.artist]),
      );
      setPage(prev => prev + 1);
    } else {
      setErrorText('Something went wrong');
    }
    setLoadingMore(false);
  };

  const onEndReached = () => {
    fetchMoreArtistList(page);
  };

  const handleSearch = () => {
    if (seachValue) {
      setPage(1);
      fetchArtistList();
      setAlbumPage(1);
      setNoItems(false);
    }
    return null;
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
            onPress={handleSearch}
          />
          {artistList?.items && !!artistList?.items?.length && (
            <FlatList
              data={artistList.items}
              renderItem={({item}) => (
                <ArlistItem
                  name={item.name}
                  onPress={() => {
                    setArtist(item.name);
                    setShowModal(false);
                  }}
                />
              )}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={onEndReached}
              onEndReachedThreshold={1}
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
