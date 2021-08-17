export const config = {
  SPREADSHEET_ID: process.env.REACT_APP_SPREADSHEET_ID,
  CLIENT_EMAIL: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
  PRIVATE_KEY: process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY?.replace(/\n/g, '\n'),
}