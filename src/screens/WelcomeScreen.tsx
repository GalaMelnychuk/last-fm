import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {colors, defaultMainPadding, screenHeight} from '../styles/constans';
import {useDispatch} from 'react-redux';
import {setUserName} from '../features/userNameSlice';

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
    navToHome();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="words"
          placeholder={'Name'}
          placeholderTextColor={colors.grey}
          blurOnSubmit
          onChangeText={setName}
          onSubmitEditing={() => {}}
        />
      </View>
      <Text style={styles.infoText}>
        *Please, enter your name as it is on last.fm to show your albums or
        login as a Guest
      </Text>
      <TouchableOpacity
        disabled={!name}
        onPress={logInUser}
        style={[styles.input, styles.userBtn]}>
        <Text style={styles.btnText}>Login as User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logInGuest}
        style={[styles.input, styles.guestBtn]}>
        <Text style={styles.btnText}>Login as Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: defaultMainPadding,
  },
  wrapper: {
    paddingTop: 120,
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.grey,
    marginBottom: 16,
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderColor: colors.purpur,
    borderWidth: 1,
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
    borderWidth: 0,
    alignItems: 'center',
    marginBottom: 46,
  },
});
