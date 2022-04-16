let listMessages = []

// LOGIN STAGE

const onlineRequest = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{
    name: "NarutinNervoso22"
  } )

  onlineRequest.then(keepOnline);
  onlineRequest.catch(onlineRequestError);

  function onlineRequestError(request){
      alert("ERROR")
  }

// KEEP ONLINE STAGE
function keepOnline(){
    
     const statusOnline = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {
         name: "NarutinNervoso22"
     })

     statusOnline.then(console.log('suceeded'));
     requestMensagem()
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

function addReceivedMessage(){
  let texto = document.querySelector(".chat").innerHTML
  setInterval(limparConversa, 8000)
  for (i = 0; i < listMessages.length; i++){
    document.querySelector(".chat").innerHTML += `<div class='message'>${listMessages[i].time} ${listMessages[i].from} para ${listMessages[i].to} ${listMessages[i].text} </div>` 
  }
  console.log('ok')
}

function limparConversa(){
  listMessages = []
}