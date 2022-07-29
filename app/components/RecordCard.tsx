import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {uses as allUses} from './form/IntendedUses';

interface RecordCardProps {
  name: string;
  email: string;
  phone: string;
  vehicleId: string;
  uses: number[];
}

const RecordCard: React.FC<RecordCardProps> = ({
  name,
  email,
  phone,
  vehicleId,
  uses,
}) => {
  const selectedUses = allUses
    .filter(item => uses.includes(item.value))
    .map(item => item.title)
    .join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Feather name="user" color={colors.primary} size={20} />
        <Text style={styles.label}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="mail" color={colors.primary} size={18} />
        <Text style={styles.label}>{email}</Text>
      </View>

      <View style={styles.row}>
        <Feather name="phone" color={colors.primary} size={18} />
        <Text style={styles.label}>{phone}</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcon
          color={colors.primary}
          size={18}
          name="credit-card-scan-outline"
        />
        <Text style={styles.label}>{vehicleId}</Text>
      </View>

      <View style={styles.row}>
        <Feather name="tag" color={colors.primary} size={18} />
        <Text style={styles.label}>{selectedUses}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    marginBottom: scale(10),
    borderWidth: 0.25,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    marginBottom: scale(8),
    alignItems: 'center',
  },
  label: {fontSize: scale(13), color: colors.dark, marginLeft: scale(8)},
});

export default RecordCard;
