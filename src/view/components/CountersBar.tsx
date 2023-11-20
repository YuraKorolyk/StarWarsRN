import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {peopleActions} from '../../redux/slices/people.slice';
import CounterItem from './CounterItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountersBar = () => {
  const likedPeople = useAppSelector(state => state.people.likedPeople);
  const dispatch = useAppDispatch();
  const genderCounts = useMemo(() => {
    const counts = {
      maleCount: 0,
      femaleCount: 0,
      otherCount: 0,
    };

    likedPeople?.forEach(item => {
      if (item.gender === 'male') {
        counts.maleCount++;
      } else if (item.gender === 'female') {
        counts.femaleCount++;
      } else {
        counts.otherCount++;
      }
    });
    return counts;
  }, [likedPeople]);

  const clearFansHandler = async () => {
    dispatch(peopleActions.setLikedArr([]));
    await AsyncStorage.removeItem('likedPeople');
  };
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Fans</Text>
        <TouchableOpacity style={styles.clearBtn} onPress={clearFansHandler}>
          <Text style={styles.clearText}>Clear fans</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <CounterItem count={genderCounts.maleCount} text="Male Fans" />
        <CounterItem count={genderCounts.femaleCount} text="Female Fans" />
        <CounterItem count={genderCounts.otherCount} text="Others" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  clearText: {
    color: 'blue',
    fontSize: 12,
    letterSpacing: 1.02,
  },
});

export default CountersBar;
