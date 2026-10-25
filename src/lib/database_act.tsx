import { Asset } from 'expo-asset';

const loadDatabase = async () => {
    const dbName = "database.db";
    const dbAsset = require ("./database.db");
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`

    const fileInfo =  await FileSystem.getInfoAsync(dbFilePath)
}