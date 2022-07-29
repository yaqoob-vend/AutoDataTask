import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  label?: string;
  placeholder?: string;
  hasRightButton?: boolean;
  rightButtonTitle?: string;
  style?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  style,
  hasRightButton,
  rightButtonTitle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={{flex: 1}}>
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        </View>
        {hasRightButton ? (
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcon
              color="white"
              size={20}
              name="credit-card-scan-outline"
            />
            <Text style={styles.buttonText}>{rightButtonTitle}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: scale(16)},
  label: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: scale(8),
  },
  inputContainer: {flexDirection: 'row', width: '100%'},
  input: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: scale(14),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    // borderWidth: 0.25,
    // borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: scale(14),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: 'bold',
    marginLeft: scale(8),
  },
});

export default Input;
