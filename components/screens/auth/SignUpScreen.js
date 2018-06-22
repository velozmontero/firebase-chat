function buildSignUpScreen() {
  $('#sign-in-screen').fadeOut("fast", function () {
    $('#root').html(SignUpScreen());
    initializeSignUpScreenEventListeners();
  });
}

function SignUpScreen() {
  const container = document.createElement('div');
  container.id = 'sign-up-screen';
  container.classList.add('sign-up-screen');

  container.innerHTML = `
    <div id="go-back-btn" class="go-back-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg>
    </div>

    <div class="logo-container">
      <i class="icon ion-md-chatbubbles"></i>
    </div> 

    <div class="sign-up-inputs-container">
      <div class="sign-up-input-container">
        <div class="sign-up-input-label">Name:</div>
        <div class="sign-up-input-wrapper">
          <input id="name" class="sign-up-input" type="text" />
        </div>
      </div>

      <div class="sign-up-input-container">
        <div class="sign-up-input-label">Email:</div>
        <div class="sign-up-input-wrapper">
          <input id="email" class="sign-up-input" type="text" />
        </div>
      </div>

      <div class="sign-up-input-container">
        <div class="sign-up-input-label">Password:</div>
        <div class="sign-up-input-wrapper">
          <input id="password" class="sign-up-input" type="password" />
        </div>
      </div>

      <div class="sign-up-input-container">
        <div class="sign-up-input-label">Password Confirmation:</div>
        <div class="sign-up-input-wrapper">
          <input id="password-confirmation" class="sign-up-input" type="password" />
        </div>
      </div>
    </div>

    <div class="btn-container">
      <div id="sign-up-btn" class="btn accent-color-2">SIGN UP</div>
    </div>
  `;

  return container;
}

function initializeSignUpScreenEventListeners() {
  $('#go-back-btn').on('click', goBack);

  $('#sign-up-btn').on('click', signUp)
}