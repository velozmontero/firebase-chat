function signUp() {
  let name = $('#name').val();
  let email = $('#email').val();
  let password = $('#password').val();
  let passwordConfirmation = $('#password-confirmation').val();

  // console.log('email ', email);
  // console.log('password ', password);
  // console.log('password confirmation ', passwordConfirmation);

  if (!isValidEmail(email)) {
    alert('Invalid email, Please enter a valid email example@some.com');
  }
  else if (!isValidPassword(password)) {
    alert('Invalid password, Please enter a valid password');
  }
  else if (password !== passwordConfirmation) {
    alert('Passwords do not match');
  }
  else {
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
      });
  }
}

function emailAndPasswordAuth() {
  let email = $('#email').val();
  let password = $('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    alert(errorMessage);
  });
}