import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {colors} from '../../theme/colors';

export const uses = [
  {value: 0, title: 'Selling'},
  {value: 1, title: 'Buying'},
  {value: 2, title: 'Financing'},
  {value: 3, title: 'Trade-in'},
  {value: 4, title: 'Insurance'},
  {value: 5, title: 'Auction'},
];

interface IntendedUsesTypes {
  onChange: (uses: number[]) => void;
}

const IntendedUses: React.FC<IntendedUsesTypes> = ({onChange}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onPress = (value: any) => {
    if (selected.includes(value)) {
      let newSelected = selected.filter(item => item !== value);
      setSelected(newSelected);
      onChange(newSelected);
    } else {
      let newSelected = [...selected, value];
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Intended use(s)</Text>

      <View style={styles.usesContainer}>
        {uses.map((item, index) => {
          const isSelected = selected.includes(item.value) ? true : false;

          return (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.use,
                {backgroundColor: isSelected ? colors.primary : 'white'},
              ]}
              onPress={() => onPress(item.value)}>
              <Text
                style={[
                  styles.useTitle,
                  {color: isSelected ? 'white' : colors.dark},
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
  usesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  use: {
    width: '31.5%',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  useTitle: {fontSize: scale(14)},
});

export default IntendedUses;
