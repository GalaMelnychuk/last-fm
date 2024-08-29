### To lounch the project:

yarn
cd ./ios
pod install
cd ../
yarn ios
or
yarn android

### .env

create .env file in the root if project and add variables which you need to take on last.fm:
API_KEY
and
BASE_URL
if you don't have them you can use:
API_KEY=3bdc3a7eee15f9ad433e72d91198877e
BASE_URL=https://ws.audioscrobbler.com/2.0/
