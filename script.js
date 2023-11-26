function criarAssinatura() {
    var container = document.getElementById('assinaturaCriada');
    while (container.firstChild) { 
        container.removeChild(container.firstChild);
    }
    var lojaSelecionada = document.getElementById('lojaSelecionada').value; 
    var canvas = document.createElement("canvas"); 
    var ctx = canvas.getContext("2d");
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

            var nomeX = (canvas.width - nomeWidth) / 2;
            var cargoX = (canvas.width - cargoWidth) / 2;
            var telefoneX = (canvas.width - telefoneWidth) / 2;

            var whatsappImg = new Image();
            whatsappImg.src = './img/whatsapp_icon.png'; 
            
            
            whatsappImg.onload = function() {
                var iconSize = 100; 
                var iconX = telefoneX - iconSize + 40; 
                var iconY = 100 - iconSize / 2; 

                ctx.drawImage(whatsappImg, iconX, iconY, iconSize, iconSize);

                var profilePhotoInput = document.getElementById('profilePhoto');
                profilePhotoInput.onchange = function() {
                    var file = this.files[0];
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        var profilePhoto = new Image();
                        profilePhoto.src = e.target.result;

                        profilePhoto.onload = function() {
                            var iconSize = 115; 
                            var iconX = 540; // Posição x do ícone (10 pixels da borda esquerda)
                            var iconY = 18; // Posição y do ícone (10 pixels do topo)

                            ctx.drawImage(profilePhoto, iconX, iconY, iconSize, iconSize);
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
                            };


                
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
            break
        
    }

}

