import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './firebase-config'

firebase.initializeApp(firebaseConfig)

export const createUserProfileInDB=async (userAuthObj, additionalData) => {
    
    if(!userAuthObj)
        return;
    const userDocRef= firestore.doc(`users/${userAuthObj.uid}`)
    const snapShot= await userDocRef.get()
    if(!snapShot.exists){
        const { displayName, email }= userAuthObj
        const createdAt= new Date()
        try{
            userDocRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userDocRef
}

export const auth= firebase.auth()
export const firestore= firebase.firestore()

const provider= new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle= () => auth.signInWithPopup(provider)

export default firebase