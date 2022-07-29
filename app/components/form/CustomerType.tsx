import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

const types = [
  {value: 0, title: 'Individual'},
  {value: 1, title: 'Company'},
];

interface CustomerTypeProps {
  type: number;
  onChange: (type: number) => void;
}

const CustomerType: React.FC<CustomerTypeProps> = ({type, onChange}) => {
  const onPress = (type: number) => onChange(type);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Customer Type</Text>

      <View style={styles.typeContainer}>
        {types.map((item, index) => {
          const selected = item.value === type ? true : false;
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => onPress(item.value)}
              style={[
                styles.type,
                {backgroundColor: selected ? colors.primary : 'white'},
              ]}>
              <Text
                style={[
                  styles.typeTitle,
                  {color: selected ? 'white' : colors.dark},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  type: {
    width: '49%',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {fontSize: scale(14)},
});

export default CustomerType;
