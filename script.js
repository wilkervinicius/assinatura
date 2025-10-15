function criarAssinatura() {
    var container = document.getElementById('assinaturaCriada');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var lojaSelecionada = document.getElementById('lojaSelecionada').value;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d", { alpha: true });
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        var font1 = new FontFace("Gilroy-bold", "url('fonts/gilroy-bold.otf')", {});
        var font2 = new FontFace("Gilroy-light", "url('fonts/gilroy-light.otf')", {});

        font1.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function(error) {
            console.log('Erro ao carregar a fonte:', error);
        });

        font2.load().then(function(loaded_face) {
            document.fonts.add(loaded_face);

            var nome = document.getElementById('nomeColaborador').value;
            var cargo = document.getElementById('cargoColaborador').value;
            var telefone = document.getElementById('telefoneColaborador').value;

            var nomeFontSize = 25;
            var cargoFontSize = 18;
            var telefoneFontSize = 18;

            ctx.font = nomeFontSize + "px Gilroy-bold";
            var nomeWidth = ctx.measureText(nome).width;
            ctx.font = cargoFontSize + "px Gilroy-light";
            var cargoWidth = ctx.measureText(cargo).width;
            ctx.font = telefoneFontSize + "px Gilroy-bold";
            var telefoneWidth = ctx.measureText(telefone).width;

            // --- INÍCIO DA SEÇÃO ATUALIZADA ---

            // Define o ponto central horizontal para o bloco de texto (ex: 65% da largura do canvas).
            // Este valor move o centro para a direita, alinhando o texto na área livre.
            var textBlockCenterX = canvas.width * 0.65;

            // Mantém um deslocamento vertical para ajustes finos.
            var deslocamentoY = 10;

            // Calcula a posição X de cada texto, centralizando-os em 'textBlockCenterX'.
            var nomeX = textBlockCenterX - (nomeWidth / 2);
            var cargoX = textBlockCenterX - (cargoWidth / 2);
            var telefoneX = textBlockCenterX - (telefoneWidth / 2);

            // Define a posição Y (vertical) com o deslocamento.
            var nomeY = 60 + deslocamentoY;
            var cargoY = 80 + deslocamentoY;
            var telefoneY = 105 + deslocamentoY;

            // Desenha os textos na tela
            ctx.font = nomeFontSize + "px Gilroy-bold";
            ctx.fillText(nome, nomeX, nomeY);
            ctx.font = cargoFontSize + "px Gilroy-light";
            ctx.fillText(cargo, cargoX, cargoY);

            // Ajusta a linha para também centralizar em 'textBlockCenterX'.
            var lineHeight = 1;
            var lineWidth = 200;
            var lineX = textBlockCenterX - (lineWidth / 2); // Centraliza a linha
            var lineY = 85 + deslocamentoY;
            ctx.fillRect(lineX, lineY, lineWidth, lineHeight);

            // --- FIM DA SEÇÃO ATUALIZADA ---

            ctx.font = telefoneFontSize + "px Gilroy-bold";
            ctx.fillText(telefone, telefoneX, telefoneY);

            var whatsappImg = new Image();
            whatsappImg.src = './img/whatsapp_icon.png';
            whatsappImg.onload = function() {
                var iconSize = 100;
                var iconX = telefoneX - iconSize + 40; // Ajuste o valor conforme necessário
                var iconY = telefoneY - iconSize / 2 -4; // Ajuste vertical do ícone do WhatsApp

                ctx.drawImage(whatsappImg, iconX, iconY, iconSize, iconSize);

                var finalImg = document.createElement("img");
                finalImg.src = canvas.toDataURL("image/png");
                container.appendChild(finalImg);

                document.getElementById('nomeColaborador').value = '';
                document.getElementById('cargoColaborador').value = '';
                document.getElementById('telefoneColaborador').value = '';

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
        }).catch(function(error) {
            console.log('Erro ao carregar a fonte:', error);
        });
    };

    img.onerror = function() {
        alert("Erro ao carregar a imagem");
    };

    switch (lojaSelecionada) {
        case 'grupoAgp':
            img.src = './img/grupoagp_2025.png';
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
    }
}