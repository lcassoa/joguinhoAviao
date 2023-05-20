function jogo() {
    var body = document.getElementById("body");
    var canvas = document.getElementById("gameCanvas")
    var ctx = canvas.getContext('2d')

    var tInicial = new Date().getTime();
    var intervalo, tAtual;
    var pontos = 0; // Variável para contar os pontos
    var gameOver = false;

    //Meteoro
    var x = Math.random() * (canvas.width - 25);
    var y = 0;
    var wMeteoro = new Image();
    var velMeteoro = 0.5;
    wMeteoro.src = 'meteoro2.png';

    //Largura e altura das imagens são iguais
    var width = 50;
    var height = 50;

    //Aviao
    var wAviao = new Image();
    wAviao.src = 'aviao.png'
    var xAviao = 150;
    var yAviao = 300;
    var rotate = 0;

    var btnIniciar = document.getElementById('btnIniciar');
    btnIniciar.addEventListener('click', function () {
        iniciarJogo();
    });

    requestAnimationFrame(gameloop);
    function gameloop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!gameOver) {
            if (y <= 400) {
                if (wMeteoro.complete) {
                    ctx.drawImage(wMeteoro, x, y, width, height);
                }
            } else {
                // Gerar novo meteoro no topo da tela
                x = Math.random() * canvas.width;
                y = 0
                pontos++; // Incrementar os pontos quando um meteoro passa pelo avião

                if (pontos % 2 == 0) {
                    velMeteoro += 0.1;
                }
            }
            y += velMeteoro; // Incrementar a variável y indicando o deslocamento para baixo

            moverAviao(); // Atualiza a posição do avião
            // Desenha o avião
            desenharAviao(xAviao, yAviao, width, height);
            // Chama novamente o ciclo da animação
            detectarColisao();

            // Atualiza os pontos na tela
            ctx.fillStyle = 'white';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Pontos: ' + pontos, 10, 30);
            ctx.fillText('VEL METEORO: ' + velMeteoro, 10, 50);
            ctx.fillText('x METEORO: ' + x, 10, 70);
            ctx.fillText('y METEORO: ' + y, 10, 90);
            ctx.fillText('x AVIAO: ' + xAviao, 10, 110);
            ctx.fillText('y AVIAO: ' + yAviao, 10, 130);

            requestAnimationFrame(gameloop);
        } else {
            ctx.font = "40px Helvetica";
            ctx.fillStyle = 'red';
            ctx.fillText('WASTED', canvas.width / 2 - 150, canvas.height / 2)
        }
    }

    function iniciarJogo() {
        pontos = 0; // Reinicia os pontos
        tInicial = new Date().getTime(); // Inicia o tempo inicial
        gameOver = false; // Reseta o estado do jogo
        gameloop(); // Inicia o loop do jogo
    }
    window.onkeydown = pressionaTecla;

    function pressionaTecla(tecla) {
        if (tecla.keyCode == 38) { // CIMA
            yAviao -= 10;
            rotate = 0;
        }
        if (tecla.keyCode == 40) { // BAIXO
            yAviao += 10;
            rotate = 90;
        }
        if (tecla.keyCode == 39) { // DIREITA
            xAviao += 10;
            rotate = 45;
        }
        if (tecla.keyCode == 37) { // ESQUERDA
            xAviao -= 10;
            rotate = 180;
        }
    }

    function moverAviao() {
        //atualiza a posição do avião com base nas teclas pressionadas
        //limita a posição do avião ao canvas
        if (xAviao < 0) {
            xAviao = 0;
        }
        if (xAviao + 50 >= canvas.width) {
            xAviao = canvas.width - 50;
        }
        if (yAviao < 0) {
            yAviao = 0;
        }
        if (yAviao + 50 >= canvas.height) {
            yAviao = canvas.height - 50;
        }
    }

    function desenharAviao(pX, pY, pW, pH) {
        wAviao.src = 'aviao.png';
        ctx.save();
        ctx.translate(pX + pW / 2, pY + pH / 2);
        ctx.rotate(rotate)
        ctx.drawImage(wAviao, -pW / 2, -pH / 2, pW, pH);
        ctx.restore();
    }

    function detectarColisao() {
        if (
            xAviao + width > x &&
            xAviao <= x + width &&
            yAviao + height > y &&
            yAviao < y + height
        ) {
            gameOver = true;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "40px Helvetica";
            ctx.fillStyle = 'yellow';
            ctx.fillText('WASTED', canvas.width / 2 - 100, canvas.height / 2);
        }
    }
}