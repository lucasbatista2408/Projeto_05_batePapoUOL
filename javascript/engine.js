let listMessages = []
let nickname;

// LOGIN STAGE

function login(){
  nickname = document.querySelector(".loginInfo").value
  console.log(nickname)
  const onlineRequest = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{
    name: `${nickname}`
  })
  
  let hide = document.querySelector(".login-page")
  hide.classList.add('hidden')

  onlineRequest.then(keepOnline);
  onlineRequest.catch(onlineRequestError);
}

function onlineRequestError(error){
  let add = document.querySelector(".login-page")
  add.classList.remove('hidden')
  login()
}


// KEEP ONLINE STAGE
function keepOnline(){
     const statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {
         name: `${nickname}`
     })
     statusOnline.then(requestMensagem);
     setInterval(keepOnline, 5000)
}

// GET MESSAGES

function requestMensagem(){
  const request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  request.then(getMessage);

  function getMessage(resposta){
    listMessages = resposta.data;
    addReceivedMessage();
  }
}


function addReceivedMessage(){
  let texto = document.querySelector(".chat")

  for (i = 0; i < listMessages.length; i++){
    if(listMessages[i].type == 'status'){
      texto.innerHTML += `<div class='message-status'>
      <span><span style="color: lightgray">(${listMessages[i].time})</span> <span style="font-weight: 700;">${listMessages[i].from}</span> ${listMessages[i].text}</span>
      </div>` 
    }
    if(listMessages[i].type == 'message'){
      texto.innerHTML += `<div class='message'>
        <span><span style="color: lightgray">(${listMessages[i].time})</span> <span style="font-weight: 700;">${listMessages[i].from}</span> para <span style="font-weight: 700;">${listMessages[i].to}</span>: ${listMessages[i].text}</span>
        </div>`
    }
    if(listMessages[i].type == 'private_message'){
      texto.innerHTML += `<div class='private-message'>
      <span><span style="color: lightgray">(${listMessages[i].time})</span> <span style="font-weight: 700;">${listMessages[i].from}</span> para <span style="font-weight: 700;">${listMessages[i].to}</span>: ${listMessages[i].text}</span>
      </div>`
    }
  }
  const lastMessage = document.querySelector('.chat div:last-child');
  lastMessage.scrollIntoView();
}

function limparConversa(){
  let chat = document.querySelector(".chat")
  chat.innerHTML = ""
}
setInterval(limparConversa, 5000)

function sendMessage(){
  let send = document.querySelector(".sendMsg");
  axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',{
    from: `${nickname}`,
    to: "Todos",
    text: `${send.value}`,
    type: "message" // ou "private_message" para o bônus
  })
  send.value = '';
}