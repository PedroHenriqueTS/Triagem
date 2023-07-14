
/*---------------------------- alternar ícone da barra de navegação  -------------------------------------*/
let menuIcon = document.querySelector('#menu-icone');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('action');
};

/*---------------------------- link ativo das seções de rolagem ------------------------------------------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('action');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('action');
            });
        };
    });

    /*---------------------------- barra de navegação  ------------------------------------------*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*------- remover o ícone de alternância é a barra de navegação ao clicar na barra de navegação  ----*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('action');
};

/*---------------------------- revelar rolagem  ------------------------------------------*/
ScrollReveal({
    //reset: true,
    distance:'80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.contato form', { origin: 'bottom' });

/*-------------------------SEND MESSAGE WITH TELEGRAM ----------------------------*/
// Função para enviar a mensagem para o canal do Telegram
async function enviarMensagemTelegram(mensagem) {
   const token = '6063001127:AAFUIYm7NvEiMo59Q0TzU2t6ZoFmspHn8BY'; //  Token do bot do Telegram
  const chatId = '6042061963'; // ID do canal

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensagem
      })
    });

    if (response.ok) {
      alert('Cadastro Realizado com Sucesso!');
      limparFormulario();
    } else {
      console.error('Erro ao Realizar o Cadastro:', response.status);
    }
  } catch (error) {
    console.error('Erro ao Realizar o Cadastro:', error);
  }
}

// Função para limpar os campos do formulário
function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('local').value = '';
  document.getElementById('hora').value = '';
  document.getElementById('data').value = '';
  document.getElementById('mensagem').value = '';
}

// Função para lidar com o envio do formulário
function enviarFormulario(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário

  // Obtém os valores do formulário
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const local = document.getElementById('local').value;
  const mensagem = document.getElementById('mensagem').value;

  // Monta a mensagem a ser enviada
  const mensagemTelegram =`DATA:${data}\nNOME: ${nome} \nHORA: ${hora}\nLOCAL: ${local}\nMENSAGEM: ${mensagem}`;

  // Envia a mensagem para o Telegram
  enviarMensagemTelegram(mensagemTelegram);

  const mensagemCod = encodeURIComponent(mensagemTelegram);

  const urlCompleta = `${whattsappUrl}?text=${mensagemCod}`;

  window.open(urlCompleta, '_blank');
}

// Adiciona um listener de evento para o envio do formulário
document.getElementById('formulario').addEventListener('submit', enviarFormulario);