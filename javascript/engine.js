let listMessages = []
let nickname = prompt("Qual seu nickname?")
// LOGIN STAGE

const onlineRequest = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{
    name: `${nickname}`
  } )

  onlineRequest.then(keepOnline);
  onlineRequest.catch(onlineRequestError);

  function onlineRequestError(request){
      console.log("logged in")
  }

// KEEP ONLINE STAGE
function keepOnline(){
    
     const statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {
         name: `${nickname}`
     })

     statusOnline.then(console.log('suceeded'));
     //requestMensagem()
}
setInterval(keepOnline, 5000)

// GET MESSAGES



function requestMensagem(){
  const request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  request.then(getMessage);

  function getMessage(resposta){
    listMessages = resposta.data;
    addReceivedMessage()
    console.log('chamou a function')
  }
}
requestMensagem()
setInterval(requestMensagem, 7000)

function addReceivedMessage(){
  let texto = document.querySelector(".chat")
  for (i = 0; i < listMessages.length; i++){
    if(listMessages[i].type == 'status'){
      document.querySelector(".chat").innerHTML += `<div class='message-status'>
      <span><span style="color: lightgray">(${listMessages[i].time})</span> <span style="font-weight: 700;">${listMessages[i].from}</span> ${listMessages[i].text}</span>
    </div>` 
    }
    if(listMessages[i].type == 'message'){
      document.querySelector(".chat").innerHTML += `<div class='message'>
        <span><span style="color: lightgray">(${listMessages[i].time})</span> <span style="font-weight: 700;">${listMessages[i].from}</span> para <span style="font-weight: 700;">${listMessages[i].to}</span>: ${listMessages[i].text}</span>
      </div>`
    }
  }
  document.querySelector(".chat").scrollIntoView(false)
}

function limparConversa(){
  let chat = document.querySelector(".chat")
  chat.innerHTML = ""
  addReceivedMessage
}
setInterval(limparConversa, 7000)

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