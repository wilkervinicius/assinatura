// Função definida para mostrar a seleção de foto apenas quando a checkbox for marcada 
function mostrarEsconderPhoto() {
    var checkbox = document.getElementById("desejaAdicionarFoto");
    var profilePhotoSelection = document.getElementById("profilePhotoSelection");
    profilePhotoSelection.style.display = checkbox.checked ? "block" : "none";
}


//Função principal para criar a assinatura
function criarAssinatura() {
    var container = document.getElementById('assinaturaCriada'); // Cria uma variável  container a qual tem relação estrutural com o elemento do HTML
    while (container.firstChild) { // Lógica para remober a imagem gerada após cada vez que o botão de criar assinatura for criado 
        container.removeChild(container.firstChild);
    }

    // Variável que seleciona a loja a qual o usuário deseja fazer a sua assinatura de e-mail 
    var lojaSelecionada = document.getElementById('lojaSelecionada').value; 
    var canvas = document.createElement("canvas"); // Variável Canvas que escreve os meus elementos na imagem 
    var ctx = canvas.getContext("2d", { alpha: true });
    var img = new Image(); // Inicio uma nova variável 
    img.crossOrigin = 'anonymous'; // Importante para não gerar erro de CORS

    img.onload = function() { // Função que define o canvas com suas estruras iniciais na tela, comprimento e largura 
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height); // Começa a criar na tela de acordo com seu comprimento e largura definidos anteriormente 
        var font1 = new FontFace("Gilroy-bold", "url('fonts/gilroy-bold.otf')", {}); // Crio duas varuáveis, uma para cada fonte para garantir a sincronização da fonte nova com os elemntos do meu canvas 
        var font2 = new FontFace("Gilroy-light", "url('fonts/gilroy-light.otf')", {});

        // Fonte carregada na tela 
        font1.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function(error) { // Caso tenha algum erro, irá gerar um console log, para fazer o devido tratamento do erro; 
            console.log('Erro ao carregar a fonte:', error);
        });

        font2.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
            
            // Inicio três variáveis, uma para cada elemento HTML, o qual será subscrito no canvas; 
            var nome = document.getElementById('nomeColaborador').value;
            var cargo = document.getElementById('cargoColaborador').value;
            var telefone = document.getElementById('telefoneColaborador').value;

            // Definição inicial para o font-size das minhas variáveis 
            var nomeFontSize = 25;
            var cargoFontSize = 18;
            var telefoneFontSize = 18;

            // Aplicando a inscrição no canvas com as variáveis definidas 
            ctx.font = nomeFontSize + "px Gilroy-bold";
            var nomeWidth = ctx.measureText(nome).width;
            ctx.font = cargoFontSize + "px Gilroy-light";
            var cargoWidth = ctx.measureText(cargo).width;
            ctx.font = telefoneFontSize + "px Gilroy-bold";
            var telefoneWidth = ctx.measureText(telefone).width;

            // Variáveis de nomes, cargo, telefone;
            var nomeX = (canvas.width - nomeWidth) / 2;
            var cargoX = (canvas.width - cargoWidth) / 2;
            var telefoneX = (canvas.width - telefoneWidth) / 2;
            
            // Variável do ícone do whatsapp 
            var whatsappImg = new Image();
            whatsappImg.src = './img/whatsapp_icon.png'; 
            
            // Inicia a função que será carregado o ícone do whatsapp 
            whatsappImg.onload = function() {
                var iconSize = 100; 
                var iconX = telefoneX - iconSize + 40; 
                var iconY = 100 - iconSize / 2; 

                // Inicia o desenho do meu canvas, referente ao ícone do whatsapp 
                ctx.drawImage(whatsappImg, iconX, iconY, iconSize, iconSize);


                // Variável referente a imagem de perfil; 
                var profilePhotoInput = document.getElementById('profilePhoto');
                if (profilePhotoInput.files.length > 0) {
                    var file = profilePhotoInput.files[0];
                    var reader = new FileReader(); // Variável reader ficará escutando no meu HTML se alguma foto foi adicionado pelo usuário

                    reader.onload = function(e) {
                        var profilePhoto = new Image();
                        profilePhoto.src = e.target.result;

                        // Carrega a imagem de perfil pelo usuário
                        profilePhoto.onload = function() {   
                            var iconSize = 105; 
                            var iconX = 560; // Posição x do ícone (10 pixels da borda esquerda)
                            var iconY = 23; // Posição y do ícone (10 pixels do topo)

                            // Desenhar uma elipse
                            ctx.save(); // Salvar o contexto atual
                            ctx.beginPath();
                            ctx.ellipse(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, iconSize / 2, 0, 0, Math.PI * 2);
                            ctx.closePath();
                            ctx.clip(); // Usar a elipse como uma máscara junto à foto de perfil; 

                            ctx.drawImage(profilePhoto, iconX, iconY, iconSize, iconSize);
                            ctx.restore(); // Restaurar o contexto para remover a máscara elíptica
                            ctx.font = nomeFontSize + "px Gilroy-bold";
                            ctx.fillText(nome, nomeX, 60);
                            ctx.font = cargoFontSize + "px Gilroy-light";
                            ctx.fillText(cargo, cargoX, 80);
                            var lineHeight = 1; 
                            var lineWidth = 200; 
                            var lineX = (canvas.width - lineWidth) / 2; // Desenha uma linha na tela, para ficar abaixo do telefone 
                            var lineY = 85;
                            ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
                            ctx.font = telefoneFontSize + "px Gilroy-bold";
                            ctx.fillText(telefone, telefoneX, 105);

                            var finalImg = document.createElement("img"); // Gero a minha imagem final a partir do meu canvas 
                            finalImg.src = canvas.toDataURL("image/png"); // Defino a extensão .png para a imagem 
                            container.appendChild(finalImg); // Faço o append final para a imagem ser adicionada ao meu conatiner dentro do meu HTML
                            
                            // Reseto os campos após a assinatura criada 
                            document.getElementById('nomeColaborador').value = '';
                            document.getElementById('cargoColaborador').value = '';
                            document.getElementById('telefoneColaborador').value = '';
                            document.getElementById('profilePhoto').value = '';
                            document.getElementById("desejaAdicionarFoto").checked = false;

                            // Variável que cria o meu botão de download 
                            var downloadButton = document.createElement("button");
                            downloadButton.textContent = "Baixar imagem";
                            downloadButton.onclick = function() {
                                var link = document.createElement('a');
                                link.download = 'assinatura.png';
                                link.href = finalImg.src;
                                link.click();
                            };
                            downloadButton.className = "download-button";
                            container.appendChild(downloadButton);
                        };
                    };
                    reader.readAsDataURL(file);

                } else { // Isso irá ocorrer caso o usuário opte por não carregar a foto de perfil 
                    // Desenhar apenas o texto e o ícone do WhatsApp
                    ctx.font = nomeFontSize + "px Gilroy-bold";
                    ctx.fillText(nome, nomeX, 60);
                    ctx.font = cargoFontSize + "px Gilroy-light";
                    ctx.fillText(cargo, cargoX, 80);
                    var lineHeight = 1; 
                    var lineWidth = 200; 
                    var lineX = (canvas.width - lineWidth) / 2; 
                    var lineY = 85;
                    ctx.fillRect(lineX, lineY, lineWidth, lineHeight);
                    ctx.font = telefoneFontSize + "px Gilroy-bold";
                    ctx.fillText(telefone, telefoneX, 105);

                    var finalImg = document.createElement("img");
                    finalImg.src = canvas.toDataURL("image/png");
                    container.appendChild(finalImg);

                    document.getElementById('nomeColaborador').value = '';
                    document.getElementById('cargoColaborador').value = '';
                    document.getElementById('telefoneColaborador').value = '';
                    document.getElementById('profilePhoto').value = '';
                    document.getElementById("desejaAdicionarFoto").checked = false;

                    var downloadButton = document.createElement("button");
                    downloadButton.textContent = "Baixar imagem";
                    downloadButton.onclick = function() {
                        var link = document.createElement('a');
                        link.download = 'assinatura.png';
                        link.href = finalImg.src;
                        link.click();
                    };
                    downloadButton.className = "download-button";
                    container.appendChild(downloadButton);
                }
            };
        }).catch(function(error) {
            console.log('Erro ao carregar a fonte:', error);
        });
    };

    img.onerror = function() {
        alert("Erro ao carregar a imagem");
    };

    var checkbox = document.getElementById("desejaAdicionarFoto");



    // Se o usuário marcar o checkbox para selecionar uma foto de perfil, carregará a imagem com uma mensagem "conectados pela emoção de ir mais longe "
    if (checkbox.checked){
        switch (lojaSelecionada) {
            case 'grupoAgp':
                img.src = './img/grupoagp_2023F.png'; 
                break;
            case 'extremaJlr':
                img.src = './img/extrema_2023F.png'; 
                break;
            case 'terraMotos':
                img.src = './img/terramotos_2023F.png'; 
                break;
            case 'orionKia':
                img.src = './img/orion_2023F.png';
                break;
            case 'truckfor':
                img.src = './img/truckfor_2023F.png';
                break;
            case 'triumph':
                img.src = './img/triumph_2023F.png'
                break;
        }

    } else { // Se ele não marcar o checkbox irá subir a imagem sem o slogan 
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
                img.src = './img/triumph_2023.png'
                break;
        }

    };

}

