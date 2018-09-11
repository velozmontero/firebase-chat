function buildSignInScreen() {
  $('#loading-screen, #sign-up-screen, #chat-screen').fadeOut("fast", function () {
    $('#root').html(SignInScreen());
    initializeSignInScreenEventListeners();
  });
}

function SignInScreen() {
  const container = document.createElement('div');
  container.id = 'sign-in-screen';
  container.classList.add('sign-in-screen');

  container.innerHTML = `
    <div class="logo-container">
      <i class="icon ion-md-chatbubbles"></i>
    </div> 

    <div class="sign-in-inputs-container">
      <div class="sign-in-input-container">
        <div class="sign-in-input-label">Email:</div>
        <div class="sign-in-input-wrapper">
          <input id="email" class="sign-in-input" type="text" />
        </div>
      </div>

      <div class="sign-in-input-container">
        <div class="sign-in-input-label">Password:</div>
        <div class="sign-in-input-wrapper">
          <input id="password" class="sign-in-input" type="password" />
        </div>
      </div>

      <div class="auth-icons-container">
        <i id="google-auth" class="auth-icon icon ion-logo-google"></i>
        <i id="facebook-auth" class="auth-icon icon ion-logo-facebook"></i>
      </div>
    </div>
    
    <div class="btn-container">
      <div id="sign-up-screen-btn" class="btn accent-color-2">SIGN UP</div>
      <div id="sign-in-screen-btn" class="btn accent-color-1">SIGN IN</div>
    </div>
  `;

  return container;
}

function initializeSignInScreenEventListeners() {
  $('#google-auth').on('click', function() {
    createPersistantSession(googleAuth);
  });

  $('#facebook-auth').on('click', function () {
    createPersistantSession(facebookAuth);
  });
  
  $('#sign-in-screen-btn').on('click', function() {
    createPersistantSession(emailAndPasswordAuth);
  });  

  $('#sign-up-screen-btn').on('click', function(){
    navigate('sign-up-screen');
  });  

}