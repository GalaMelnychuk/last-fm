import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Text, TouchableOpacity} from 'react-native';
import messages from '../messages.json';
import {MainStackParamList, ScreenEnum} from '../navigation/types';
import {colors, screenHeight} from '../styles/constans';
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
    // @ts-ignore
    <RootContainer wrapperStyle={styles.wrapper}>
      <Input
        value={name}
        onChangeText={setName}
        placeholderText={messages.welcome_your_name}
      />
      <Text style={styles.infoText}>{messages.welcome_input_massage}</Text>
      <TouchableOpacity
        disabled={!name}
        onPress={logInUser}
        style={[styles.btn, styles.userBtn]}>
        <Text style={styles.btnText}>{messages.welcome_login_user}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logInGuest}
        style={[styles.btn, styles.guestBtn]}>
        <Text style={styles.btnText}>{messages.welcome_login_guest}</Text>
      </TouchableOpacity>
    </RootContainer>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    paddingTop: screenHeight * 0.15,
  },
  infoText: {
    fontSize: '12@ms',
    fontWeight: 'bold',
    color: colors.grey,
    marginBottom: '16@ms',
  },
  btn: {
    height: '56@ms',
    paddingHorizontal: '16@ms',
    paddingVertical: '16@ms',
    fontSize: '16@ms',
    borderColor: colors.purpur,
    borderRadius: '8@ms',
    width: '100%',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: '18@ms',
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
    marginBottom: '36@ms',
  },
});
