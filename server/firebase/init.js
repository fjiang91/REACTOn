import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

console.log(process.env.FIREBASE_CONFIG, 'api')
const firebaseConfig = {
  apiKey: 'AIzaSyCpr8pBUd4u_pgv6_uoMHtZzTLBje10gnI',
  authDomain: 'reacton-8068b.firebaseapp.com',
  databaseURL: 'https://reacton-8068b.firebaseio.com',
  projectId: 'reacton-8068b',
  storageBucket: 'reacton-8068b.appspot.com',
  messagingSenderId: '588789980362',
  appId: '1:588789980362:web:64be7235783ad257'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
