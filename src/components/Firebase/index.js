const config = {
  apiKey: process.env.GATSBY__FIREBASE_APIKEY,
  authDomain: process.env.GATSBY__FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY__FIREBASE_DATABASEURL,
  projectId: process.env.GATSBY__FIREBASE_PROJECTID,
  storageBucket: process.env.GATSBY__FIREBASE_STORAGEBUCKET,
  clientId: process.env.GATSBY__CLIENTID,
}

class Firebase {
  constructor(app) {
    app.initializeApp(config)

    /* Helper */

    this.serverValue = app.database.ServerValue
    this.emailAuthProvider = app.auth.EmailAuthProvider

    /* Firebase APIs */

    this.auth = app.auth()
    this.db = app.database()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doAutoSignOut = (email, password) =>
    this.auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return this.auth.signInWithEmailAndPassword(email, password)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
      })
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.GATSBY__CONFIRMATION_EMAIL_REDIRECT,
    })

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = []
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref('users')
}

let firebase

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database)
  }

  return firebase
}

export default getFirebase
