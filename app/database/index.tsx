import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

export interface VehicleRecord {
  type: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicleId: string;
  uses: number[];
}

const tableName = 'vehicle_records';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'autodata.db'});
};

export const setupTable = async () => {
  try {
    const db = await getDBConnection();
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), 
    phone_number VARCHAR(10), vehicle_id VARCHAR(255), type INT(10), uses VARCHAR(255))`;

    await db.executeSql(query);
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const saveVehicleRecord = async (record: VehicleRecord) => {
  try {
    await setupTable();
    const db = await getDBConnection();
    const query = `INSERT INTO ${tableName} (first_name, last_name, email, phone_number, vehicle_id, type, uses) VALUES (?,?,?,?,?,?,?)`;
    const result = await db.executeSql(query, [
      record.firstName,
      record.lastName,
      record.email,
      record.phone,
      record.vehicleId,
      record.type,
      JSON.stringify(record.uses),
    ]);
    return result[0];
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const getVehicleRecords = async () => {
  try {
    const db = await getDBConnection();
    const query = `SELECT * from ${tableName}`;
    const result = await db.executeSql(query);
    const raw = result[0].rows.raw();
    return raw;
  } catch (error) {
    console.log('ERROR', error);
  }
};
