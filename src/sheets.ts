import { GoogleSpreadsheet } from 'google-spreadsheet';
import { config } from './config';
import Message from './Message';

const setup = async () => {
  const doc = new GoogleSpreadsheet(config.SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: config.CLIENT_EMAIL || '',
    private_key: config.PRIVATE_KEY || '',
  });
  await doc.loadInfo();
  return doc
}

export const writeToSheets = async (messages: Message[], intent: string) => {
  const doc = await setup()
  const sheet = doc.sheetsByIndex[0];
  for (let message of messages) {
    await sheet.addRow({ Intent: intent, Tipo: message.type, Texto: message.text })
  }
}

export const getIntents = async () => {
  const doc = await setup()
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows()
  return rows.map(row => row['Intent'])
    .filter((value, index, self) => self.indexOf(value) === index)
}

export const getMessagesFromIntent = async (intent: string) => {
  const doc = await setup()
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows()
  const rowsForIntent = rows.filter(row => row['Intent'] === intent)
  return rowsForIntent.map(row => ({text: row['Texto'], type: row['Tipo']}))
}