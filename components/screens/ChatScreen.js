let db = firebase.database();
let messages = db.ref('messages/');

function buildChatScreen(user) {
  console.log('chat screen >>>');

  $('#loading-screen, #sign-in-screen, #sign-up-screen').fadeOut("fast", function () {
    $('#root').html(ChatScreen(user));
    initializeChatScreenEventListeners(user);
  });
}

function ChatScreen(user) {
  const container = document.createElement('div');
  container.id = 'chat-screen';
  container.classList.add('chat-screen');

  container.innerHTML = `
    <div class="chat-header">
      Hi ${user.displayName.split(' ')[0]}!

      <div id="sign-out-btn" class="sign-out-btn">
        <svg fill="#fff" width="100%" height="100%" viewBox="0 0 512 512" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M280,80c25.4,0 46,20.6 46,46c0,7.7 -6.3,14 -14,14c-7.7,0 -14,-6.3 -14,-14c0,-9.9 -8.1,-18 -18,-18l-186,0c-9.9,0 -18,8.1 -18,18l0,260c0,9.9 8.1,18 18,18l186,0c9.901,-0.001 18,-8.1 18,-18c0,-7.7 6.3,-14 14,-14c7.7,0 14,6.3 14,14c0,25.4 -20.6,46 -46,46l-186,0c-25.4,0 -46,-20.6 -46,-46l0,-260c0,-25.4 20.6,-46 46,-46l186,0Zm138.3,162.1l-65.2,-64.2c-5.5,-5.5 -5.5,-14.3 0,-19.8c2.6,-2.7 6.2,-4.1 9.9,-4.1c3.8,0 7.3,1.5 9.9,4.1l84.5,84.2c4.2,4.2 6.5,9.2 6.5,14.5c0,5.4 -2.2,10.4 -6.5,14.7l-82.6,82.4c-2.6,2.7 -6.1,4.1 -9.9,4.1c-3.6,0 -7.1,-1.4 -9.8,-3.9l-0.1,-0.1c-5.4,-5.5 -5.4,-14.4 0,-19.8l63.6,-64.1l-256.6,0c-7.7,0 -14,-6.3 -14,-14c0,-7.7 6.3,-14 14,-14l256.3,0Z" style="fill-rule:nonzero;"/></svg>
      </div>

    </div>

    <div class="chat-screen-messages-container" id="chat-screen-messages-container"></div>

    <div class="chat-screen-input-container">
    
      <input type="text" id="chat-screen-input" class="chat-screen-input"/>

      <div id="chat-screen-send-msg-btn" class="chat-screen-send-msg-btn">
        <svg 
        width="40px"
        height="40px"
        fill="#000" 
        viewBox="0 0 512 512">
        <path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"/>
        </svg>
      </div>
    </div>
  `;

  return container;
}

function initializeChatScreenEventListeners(user) {
  $('#sign-out-btn').on('click', signOut);

  $('#chat-screen-send-msg-btn').on('click', function () {
    sendMessage(user.uid, user.displayName, user.email, user.photoURL);
  });

  $('#chat-screen-input').keypress(function (e) {
    if (e.keyCode === 13) {
      sendMessage(user.uid, user.displayName, user.email, user.photoURL);
    }
  }).keyup(function () {
    // we are going to do some cool stuff here 
  });

  messages.on('value', function (snapshot) {
    //console.log(snapshot.val());
    $("#chat-screen-messages-container").html("");
    let msgs = snapshot.val();

    for (let id in msgs) {
      let msg = msgs[id];
      let side = user.email === msg.email ? 'right' : 'left';
      let margin = user.email === msg.email ? 'margin-left: 15px;' : 'margin-right: 15px;';
      let corner = user.email === msg.email ? 'right-top' : 'left-top'

      $("#chat-screen-messages-container").append(
        `<div class="msg-div ${side}">
            <div style="${margin}">
              
            <img class="profile-img" src="${msg.img || '../../images/photo.jpg'}" height="40" width="auto" />
           
            </div>
            <div style="flex-grow: 1; padding: 10px;" class="talk-bubble tri-right ${corner}">
              <div class="name"><strong>${msg.name}</strong>:</div>
              <div class="msg">${msg.text}</div>
              <div class="date ${side}">
                <div>${format.date(new Date(msg.date)).date}</div>
                <div>${format.date(new Date(msg.date)).time}</div>
              </div>
            </div>
         </div>`
      );
    }
    scroll();
  });
}

function sendMessage(uid, name, email, img){
  let date = new Date();
  let text = $("#chat-screen-input").val();

  console.log('sending message ', text);

  if (text) {
    messages.push({
      uid: uid,
      name: name,
      text: text,
      date: date.toString(),
      email: email,
      img: img
    });
    $("#chat-screen-input").val('');
  }
}

function scroll(){
  $('#chat-screen-messages-container').scrollTop($('#chat-screen-messages-container')[0].scrollHeight);
}

let format = {
  date: (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    let h = date.getHours();

    let hf = (h > 11) ? 'PM' : 'AM';
    let hh = (h > 12) ? h % 12 : h;
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    return {
      date: m + '/' + d + '/' + y,
      time: hh + ':' + mm + ':' + ss + ' ' + hf
    };
  }
}