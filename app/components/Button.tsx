import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon ? <Feather size={20} color="white" name={icon} /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {fontSize: scale(16), color: 'white', marginLeft: scale(8)},
});

export default Button;
