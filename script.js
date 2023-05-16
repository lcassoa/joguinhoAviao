var canvas = document.getElementById("gameCanvas")
    var ctx = canvas.getContext('2d')
    var x = Math.random() * (canvas.width - 200);
    var y = 0;
    var width = 50;
    var height = 50;
    var xAviao = 150;
    var yAviao = 300;
    var wMeteoro = new Image();
    wMeteoro.src = 'meteoro.png';
    var wAviao = new Image();
    wAviao.src = 'aviao'

    requestAnimationFrame(gameloop);
    function gameloop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (y <= 400) {
            if (wMeteoro.complete) {
                ctx.drawImage(wMeteoro, x, y, width, height);
            }
        } else {
            // gerar novo meteoro no topo da tela
            x = Math.random() * (canvas.width - 200);
            y = 0;
        }
        y += 5; //incrementar a variável y indicando o deslocamento para baixo
        moverAviao(); //atualiza a posição do avião
        //desenha o avião na nova posição
        desenharAviao(xAviao, yAviao, width, height);
        //chama novamente o ciclo da animação
 
        requestAnimationFrame(gameloop);
        detectarColisao();
    }

    window.onkeydown = pressionaTecla;

    function pressionaTecla(tecla) {
        if (tecla.keyCode == 39) {
            xAviao += 10; //aumentar o x tem o efeito de ir para a direita
        }
        if (tecla.keyCode == 37) {
            xAviao -= 10; //diminuir o x tem o efeito de ir para a esquerda
        }
    }

    function moverAviao() {
        //atualiza a posição do avião com base nas teclas pressionadas
        //limita a posição do avião ao canvas
        if (xAviao < 0) {
            xAviao = 0;
        }
        if (xAviao > canvas.width - 100) {
            xAviao = canvas.width - 100;
        }
    }

    function desenharAviao(pX, pY, pW, pH) {
        var wAviao = new Image();
        wAviao.src = 'aviao.png'
        ctx.drawImage(wAviao, pX, pY, pW, pH);
    }

    function detectarColisao() {
        if (((xAviao + width) > x && xAviao < (x +
            width)) && ((yAviao + yAviao) > y
                && width < (y + height)
            )) {
            //interrompe o game loop parando a movimentação do quadrado vermelho
            window.clearInterval(id_interval);
            alert("Game Over")
        }
    }