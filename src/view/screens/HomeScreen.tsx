import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {peopleActions} from '../../redux/slices/people.slice';
import PeopleItem from '../components/PeopleItem';
import {useQuery} from '@apollo/client';
import {GetAllPeople} from '../../graphql/queries';
import CountersBar from '../components/CountersBar';
import Error from '../components/Error';
import Loader from '../components/Loader';
import CustomInput from '../components/CustomInput';
import Pagination from '../components/Pagination';
import {IPerson} from '../../interfaces/people.interface';
import {
  fetchDataFromAsyncStorage,
  storeDataToAsyncStorage,
} from '../../utilities/commonFunctions';
import usePagination from '../../hooks/usePagination';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const allPeople = useAppSelector(state => state.people.allPeople);
  const likedPeople = useAppSelector(state => state.people.likedPeople);

  const {
    pageNumber,
    setAfterArr,
    setLocalLoading,
    nextClickHandler,
    prevClickHandler,
    pageAmount,
    localLoading,
    after,
  } = usePagination(allPeople?.totalCount);

  const {data, loading, error} = useQuery(GetAllPeople, {
    variables: {after},
  });

  const [filteredData, setFilteredData] = useState<IPerson[]>([]);

  const onInputChange = (search: string) => {
    const filteredArr: IPerson[] = allPeople.people.filter((item: IPerson) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(filteredArr);
  };

  useEffect(() => {
    if (data) {
      dispatch(peopleActions.setAllPeople(data.allPeople));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (allPeople?.pageInfo?.endCursor) {
      setAfterArr(prevState => [...prevState, allPeople?.pageInfo?.endCursor]);
    }
    setFilteredData(allPeople.people);
    setLocalLoading(false);
  }, [allPeople, setAfterArr, setLocalLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const likedData = await fetchDataFromAsyncStorage('likedPeople');
      if (likedData) {
        dispatch(peopleActions.setLikedArr(likedData));
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const saveData = async () => {
      await storeDataToAsyncStorage('likedPeople', likedPeople);
    };
    saveData();
  }, [likedPeople]);

  if (error) {
    return <Error />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CountersBar />
        <CustomInput placeholder="Search" changeTextHandler={onInputChange} />
        {loading || localLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({item}) => <PeopleItem people={item} />}
          />
        )}
        <Pagination
          prevDisabled={pageNumber <= 1 || loading}
          nextDisabled={pageNumber >= pageAmount || loading}
          currPage={pageNumber}
          pageAmount={pageAmount}
          goPrev={prevClickHandler}
          goNext={nextClickHandler}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    marginTop: 6,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
