function jogo() {
    var canvas = document.getElementById("gameCanvas")
    var ctx = canvas.getContext('2d')

    var btnIniciar = document.getElementById('btnIniciar');
    btnIniciar.addEventListener('click', function () {
        if (gameOver) {
            iniciarJogo();
        }
    });

    var tInicial = new Date().getTime();
    var pontos = 0; // Variável para contar os pontos
    var gameOver = false;
    var timer = 0;

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
    var angle = 0;
    var angleX = 0;

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

            if (timer >= 10) {
                if (pontos <= 10) {
                    pontos = 0
                } else {
                    pontos -= 10
                }
                timer = 0
            }

            // Atualiza os pontos na tela
            ctx.fillStyle = 'white';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Pontos: ' + pontos, 10, 30);
            ctx.fillText('Timer: ' + timer, 10, 50);
            requestAnimationFrame(gameloop);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "40px Helvetica";
            ctx.fillStyle = 'red';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }
    }

    function iniciarJogo() {
        pontos = 0; // Reinicia os pontos
        tInicial = new Date().getTime(); // Inicia o tempo inicial
        gameOver = false; // Reseta o estado do jogo
        timer = 0
        gameloop(); // Inicia o loop do jogo
    }
    window.onkeydown = pressionaTecla;

    setInterval(function () {
        timer++
    }, 1000);

    function pressionaTecla(tecla) {
        if (tecla.keyCode == 38 || tecla.keyCode == 87) { // CIMA ou W
            yAviao -= 10;
            angle = -Math.PI / 2;
            angleX = Math.PI / 2;
            timer = 0
        }
        if (tecla.keyCode == 40 || tecla.keyCode == 83) { // BAIXO ou S
            yAviao += 10;
            angle = Math.PI / 2;
            angleX = Math.PI / 2;
            timer = 0
        }
        if (tecla.keyCode == 39 || tecla.keyCode == 68) { // DIREITA ou D
            xAviao += 10;
            angle = 0;
            angleX = Math.PI / 2;
            timer = 0
        }
        if (tecla.keyCode == 37 || tecla.keyCode == 65) { // ESQUERDA ou A
            xAviao -= 10;
            angle = 0;
            angleX = -Math.PI / 2;
            timer = 0
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
        ctx.rotate(angle); // Aplica a rotação no eixo y
        ctx.rotate(angleX); // Aplica a rotação no eixo X
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
            ctx.fillStyle = 'red';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }
    }
}