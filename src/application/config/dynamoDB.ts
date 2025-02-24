import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';
import config from '../../config';
dotenv.config();


const client = new DynamoDBClient({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

const docClient = DynamoDBDocumentClient.from(client);

const createItem = async (item: any, tableName: string ) => {
    const params = {
        TableName: tableName,
        Item: item,
    };

    try {
        await docClient.send(new PutCommand(params));
        return { success: true, message: 'Item creado correctamente' };
    } catch (err: any) {
        console.error('Error al crear item:', err);
        return { success: false, message: err.message };
    }
};

const getAllItems = async (tableName: string) => {
    const params = {
        TableName: tableName,
    };

    try {
        const result = await docClient.send(new ScanCommand(params));
        return { success: true, data: result.Items };
    } catch (err: any) {
        console.error('Error al obtener items:', err);
        return { success: false, message: err.message };
    }
};

export default {
    createItem,
    getAllItems,
};