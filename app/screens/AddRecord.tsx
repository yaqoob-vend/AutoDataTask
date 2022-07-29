import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import Screen from '../components/Screen';
import {scale} from 'react-native-size-matters';
import Input from '../components/form/Input';
import CustomerType from '../components/form/CustomerType';
import IntendedUses from '../components/form/IntendedUses';
import Button from '../components/Button';

import {saveVehicleRecord, VehicleRecord} from '../database';

const emptyRecord: VehicleRecord = {
  type: 0,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  vehicleId: '',
  uses: [],
};

const AddRecord = ({route, navigation}) => {
  const [values, setValues] = useState<VehicleRecord>(emptyRecord);

  const onTypeChange = (type: number) =>
    setValues(prev => ({...prev, type: type}));
  const onFirstNameChange = (txt: string) =>
    setValues(prev => ({...prev, firstName: txt}));
  const onLastNameChange = (txt: string) =>
    setValues(prev => ({...prev, lastName: txt}));
  const onPhoneChange = (txt: string) =>
    setValues(prev => ({...prev, phone: txt}));
  const onEmailChange = (txt: string) =>
    setValues(prev => ({...prev, email: txt}));
  const onVehicleIdChange = (txt: string) =>
    setValues(prev => ({...prev, vehicleId: txt}));
  const onUsesChange = (uses: any) =>
    setValues(prev => ({...prev, uses: uses}));

  const onSavePress = async () => {
    try {
      if (
        values.firstName.length > 0 &&
        values.lastName.length > 0 &&
        values.email.length > 0 &&
        values.phone.length > 0 &&
        values.vehicleId.length > 0 &&
        values.uses.length > 0
      ) {
        const result = await saveVehicleRecord(values);
        console.log('==> result', result);
        if (result) {
          setValues(emptyRecord);
          if (route.params.onSuccess) {
            route.params.onSuccess({...values, id: result.insertId});
          }
          if (navigation.canGoBack) {
            navigation.goBack();
          }
        }
      } else {
        Alert.alert('Please fill in all the fields!');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <Screen title="Add Record" showBackButton>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomerType type={values['type']} onChange={onTypeChange} />

        <View style={styles.nameContainer}>
          <Input
            label="Name"
            placeholder="First Name"
            style={styles.nameInput}
            value={values['firstName']}
            onChange={onFirstNameChange}
          />
          <Input
            label=" "
            placeholder="Last Name"
            style={styles.nameInput}
            value={values['lastName']}
            onChange={onLastNameChange}
          />
        </View>
        <Input
          label="Phone number"
          placeholder="XX-XXX-XXXX"
          value={values['phone']}
          onChange={onPhoneChange}
        />
        <Input
          label="Email address"
          placeholder="name@example.com"
          value={values['email']}
          onChange={onEmailChange}
        />
        <Input
          label="Vehicle identification number"
          placeholder="Enter VIN or scan it"
          value={values['vehicleId']}
          onChange={onVehicleIdChange}
          rightButtonTitle="Scan VIN"
          hasRightButton
        />

        <IntendedUses onChange={onUsesChange} />

        <Button title="Save" icon="save" onPress={onSavePress} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameInput: {width: '49.5%'},
});

export default AddRecord;
