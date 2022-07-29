import {Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import RecordCard from '../components/RecordCard';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getVehicleRecords} from '../database';
import {scale} from 'react-native-size-matters';
import FloatingButton from '../components/FloatingButton';
import {useNavigation} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();
  const [tableEnabled, setTableEnabled] = useState(false);
  const [records, setRecords] = useState<any>([]);

  const toggleTable = () => setTableEnabled(bool => !bool);

  useEffect(() => {
    getVehicleRecords().then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
        setRecords(data);
      }
    });
  }, []);

  const onAddPress = () => {
    navigation.navigate('AddRecord', {
      onSuccess: (newRecord: any) => {
        let record = {
          id: newRecord.id,
          first_name: newRecord.firstName,
          last_name: newRecord.lastName,
          email: newRecord.email,
          phone_number: newRecord.phone,
          vehicle_id: newRecord.vehicleId,
          uses: newRecord.uses,
          type: newRecord.type,
        };
        if (records.length === 0) {
          setRecords([record]);
        } else {
          setRecords((prev: any[]) => [...prev, record]);
        }
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      <RecordCard
        name={item.first_name + ' ' + item.last_name}
        email={item.email}
        phone={item.phone_number}
        vehicleId={item.vehicle_id}
        uses={item.uses}
      />
    );
  };

  const HeaderButton = (
    <TouchableOpacity onPress={toggleTable}>
      <MaterialCommunityIcon
        name={tableEnabled ? 'card' : 'table'}
        color="white"
        size={20}
      />
    </TouchableOpacity>
  );

  return (
    <Screen title="Home" rightComponent={HeaderButton}>
      {tableEnabled ? (
        <DataTable style={{backgroundColor: 'white'}}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Phone</DataTable.Title>
            <DataTable.Title>VIN</DataTable.Title>
          </DataTable.Header>

          {records.map(item => {
            return (
              <DataTable.Row key={item.id.toString()}>
                <DataTable.Cell>
                  {item.first_name + ' ' + item.last_name}
                </DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
                <DataTable.Cell>{item.phone_number}</DataTable.Cell>
                <DataTable.Cell>{item.vehicle_id}</DataTable.Cell>
                {/* <DataTable.Cell>{item.uses}</DataTable.Cell> */}
              </DataTable.Row>
            );
          })}
        </DataTable>
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={styles.flatList}
          ListEmptyComponent={<Text>No Data!</Text>}
        />
      )}

      <FloatingButton onPress={onAddPress} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatList: {paddingHorizontal: scale(16), paddingTop: scale(16)},
});

export default Home;
