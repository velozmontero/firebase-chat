function createPersistantSession(authenticate = () => console.log('no authentication passed to persistant session')) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(authenticate)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('error ', errorMessage);
    });
}

function session() {
  firebase.auth().onAuthStateChanged(function (user) {
    // console.log('user >>>>>> ', user);
    
    window.user = user;
    if (user) {
      navigate('chat-screen', user);
    }
    else {
      navigate('sign-in-screen');
    }

  });
}
