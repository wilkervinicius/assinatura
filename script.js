//by: rlecost (Rodrigo Lopes Emidio da Costa, para o Grupo AGP)

// Função Principal que é chamada para criar a assinatura de e-mail do usuário;
function criarAssinatura() {

    var container = document.getElementById('assinaturaCriada'); // Cria uma variável container que gera no meu HTML  o "assinaturaCriada"
    while (container.firstChild) { // Laço para que resete minha função a cada momento que clico para gerar assinatura novamente 
        container.removeChild(container.firstChild);
    }
 
    var lojaSelecionada = document.getElementById('lojaSelecionada').value; // Variável lojaSelecionada que irá gerar um canvas diferente para cada loja que foi selecionada 
 
    var canvas = document.createElement("canvas"); // Definindo meu canvas que fará a edição da imagem que já foi fornecida pelas urls
    var ctx = canvas.getContext("2d");
 
    var img = new Image();
    img.crossOrigin = 'anonymous';  // IMPORTANTE, caso a imagem esteja hospedada em algum server externo, pode dar erro de CORS, barrando a request e não funcionará 
    
    // Funçao de canvas que irá escrever sobre imagem os textos nome - cargo e telefone 
    img.onload = function() {
   
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height); // Defino o tamanho do meu canvas, por padrão identifico as variáveis que serão do comprimento e largura da imagem upada

    
        // Definição de um objeto para evitar erros de sincronização da minha fonte ao gerar o canvas
        var font1 = new FontFace("Gilroy-bold", "url('fonts/gilroy-bold.otf')", {});
        var font2 = new FontFace("Gilroy-light", "url('fonts/gilroy-light.otf')", {});

        font1.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
        }).catch(function(error) {
        console.log('Erro ao carregar a fonte:', error);
        });

        font2.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
        
        // Definição do tipo de Fonte, estou escolhendo a Gilroy

        var nome = document.getElementById('nomeColaborador').value;
        var cargo = document.getElementById('cargoColaborador').value;
        var telefone = document.getElementById('telefoneColaborador').value;

        // Definir o tamanho da fonte para cada variável
        var nomeFontSize = 25;
        var cargoFontSize = 18;
        var telefoneFontSize = 18;

        // Variáveis definidas para fins de posicionamento
        ctx.font = nomeFontSize + "px Gilroy-bold";
        var nomeWidth = ctx.measureText(nome).width;
        ctx.font = cargoFontSize + "px Gilroy-light";
        var cargoWidth = ctx.measureText(cargo).width;
        ctx.font = telefoneFontSize + "px Gilroy-bold";
        var telefoneWidth = ctx.measureText(telefone).width;

        // Lógica para centralizar meu texto Horizontalmente 
        var nomeX = (canvas.width - nomeWidth) / 2;
        var cargoX = (canvas.width - cargoWidth) / 2;
        var telefoneX = (canvas.width - telefoneWidth) / 2;

        var whatsappImg = new Image();
        whatsappImg.src = './img/whatsapp_icon.png'; // Caminho para a imagem do ícone do WhatsApp

        whatsappImg.onload = function() {
            var iconSize = 100; // Tamanho do ícone
            var iconX = telefoneX - iconSize + 40; // Posição x do ícone (5 pixels à esquerda do texto)
            var iconY = 100 - iconSize / 2; // Posição y do ícone (alinhado com a base do texto)

            // Desenha o ícone no canvas
            ctx.drawImage(whatsappImg, iconX, iconY, iconSize, iconSize);

            // Desenha o texto do telefone
            ctx.font = nomeFontSize + "px Gilroy-bold";
            ctx.fillText(nome, nomeX, 60);
            ctx.font = cargoFontSize + "px Gilroy-light";
            ctx.fillText(cargo, cargoX, 80);
            var lineHeight = 1; // Altura da linha
            var lineY = 85; // Posição y da linha (10 pixels abaixo do texto)
            var lineWidth = 200; // Largura da linha é sempre 100 pixels
            var lineX = (canvas.width - lineWidth) / 2; // Posição x da linha (centralizada)
            ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
            ctx.font = telefoneFontSize + "px Gilroy-bold";
            ctx.fillText(telefone, telefoneX, 105);

              // Aqui a mágica acontece, será escrito os textos em minhas imagens, nas posições calculadas do eixo Y
        
            var finalImg = document.createElement("img");
            finalImg.src = canvas.toDataURL("image/png");
            
            // Minha variável container irá colocar como sua filha a minha finalImg, gerando na minha divclass a imagem
            container.appendChild(finalImg);

            var downloadButton = document.createElement("button");
            downloadButton.textContent = "Baixar imagem";
            downloadButton.onclick = function() {
                var link = document.createElement('a');
                link.download = 'assinatura.png';
                link.href = finalImg.src;
                link.click();
            };

            downloadButton.className = "download-button";

// Adiciona o botão de download ao container
container.appendChild(downloadButton);
};

        // Caso tenha algum erro ao gerar a fonte
        }).catch(function(error) {
        console.log('Erro ao carregar a fonte:', error);
        });
    };
    
    // Apenas para fins de depuração de possíveis erros e inconsistências
    img.onerror = function() {
        alert("Erro ao carregar a imagem");
        // Adicione aqui o código para lidar com o erro ------> Implementar melhorias
    };
 
    // Lógica para selecionar lojas diferentes dependendo da esoclha do meu usuário 
    switch (lojaSelecionada) {
        case 'grupoAgp':
            img.src = './img/grupoagp_2023.png';
            break;
        case 'extremaJlr':
            img.src = './img/extrema_2023.png';
            break;
        case 'terraMotos':
            img.src = './img/terramotos_2023.png';
            break;
        case 'orionKia':
            img.src = './img/orion_2023.png';
            break;
        case 'truckfor':
            img.src = './img/truckfor_2023.png';
            break;
        case 'triumph':
            img.src = './img/triumph_2023.png';
            break;
        default:
            img.src = './img/grupoagp_2023.png';
    }
 }
 
