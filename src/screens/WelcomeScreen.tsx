import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {colors} from '../styles/constans';
import {useDispatch} from 'react-redux';
import {resetName, setUserName} from '../features/userNameSlice';
import {Input} from '../components/ui/Input';
import {RootContainer} from '../components/ui/RootContainer';

export const SignInFormScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const navToHome = () => {
    navigation.navigate(ScreenEnum.HomeScreen);
  };

  const logInUser = () => {
    if (name) {
      dispatch(setUserName(name));
      navToHome();
    }
  };

  const logInGuest = () => {
    setName('');
    dispatch(resetName());
    navToHome();
  };

  return (
    <RootContainer wrapperStyle={styles.wrapper}>
      <Input
        value={name}
        onChangeText={setName}
        placeholderText="Your Name on last.fm"
      />
      <Text style={styles.infoText}>
        *Please, enter your name as it is on last.fm to show your top albums or
        login as a Guest
      </Text>
      <TouchableOpacity
        disabled={!name}
        onPress={logInUser}
        style={[styles.btn, styles.userBtn]}>
        <Text style={styles.btnText}>Login as User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logInGuest}
        style={[styles.btn, styles.guestBtn]}>
        <Text style={styles.btnText}>Login as Guest</Text>
      </TouchableOpacity>
    </RootContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 120,
  },
  infoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.grey,
    marginBottom: 16,
  },
  btn: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderColor: colors.purpur,
    borderRadius: 8,
    width: '100%',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.white,
  },
  guestBtn: {
    backgroundColor: colors.blue,
    borderWidth: 0,
    alignItems: 'center',
  },
  userBtn: {
    backgroundColor: colors.purpur,
    alignItems: 'center',
    marginBottom: 46,
  },
});
