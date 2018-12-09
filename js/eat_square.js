var canvas; // variavel para referenciar o elemento canvas no HTML
var contexto; // variavel para referenciar o contexto (2d ou 3d) que vamos utilizar para desenhar o jogo

var dx = 5;  // velocidade horizontal do circulo
var dy = 5; // velocidade vertical do circulo
var x = 250; // posi��o horizontal inicial do circulo
var y = 100; // posi��o vertical inicial do circulo

var largura_canvas = 500; // largura da tela retangular do canvas
var altura_canvas = 200; //  altura da tela retangular do canvas
var tempo = 0; // variavel para controlar o tempo em que aparecer o quadrado

var quadrado_x; // Variavel para guardar a coordenada x em que iremos adicionar o novo quadrado
var quadrado_y; // Variavel para guardar a coordenada y em que iremos adicionar o novo quadrado 
var distX; // Variavel para guardar a dist�ncia horizontal entre o circulo e o quadrado
var distY; // Varivale para guardar a dist�ncia vertical entre o circulo e o quadrado

var play = true; // Variavel que indica se podemos desenhar um novo quadrado. True = podemos, false = n�o podemos
var pontos = 0; // Variavel para fazer a contagem de pontos do jogo

var eat = new Audio('audio/eat.wav'); // Variavel para guardar o arquivo de audio que utilizaremos. Esse arquivo ser� chamado sempre que o circulo "comer" um quadrado

// Fun��o em que o programa ser� iniciado
function Iniciar() {
    canvas = document.getElementById("canvas"); // Buscando o elemento canvas no html
    contexto = canvas.getContext("2d"); // Estabelecendo o contexto 2d para o jogo
    return setInterval(Atualizar, 100); // Atrav�s desse m�todo, a fun��o Atualizar � chamada a cada 100 milisegundos
}

// Fun��o para desenhar a tela do jogo
function DesenharTela() {

    // Criando um gradiente de cores das bordas da tela
    var gradient=contexto.createLinearGradient(0,0,170,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");

    // Criando a borda da tela com a cor selecionada
    contexto.strokeStyle=gradient; // Indicando a cor das bordas
    contexto.lineWidth=5; // Indicando o tamanho da linha

    // Criando um gradiente de cores para o background da tela
    var grad = contexto.createLinearGradient(largura_canvas, 0, 0, altura_canvas);
    grad.addColorStop(0,'#191970');
    grad.addColorStop(1,'#248EFF');

    contexto.fillStyle = grad; // Carregando a cor criada no background
    contexto.fillRect(0,0, largura_canvas, altura_canvas); // Desenhando o background             
        

    contexto.beginPath(); // Iniciando o caminho        
    contexto.rect(0, 0, largura_canvas, altura_canvas); // Desenhando a tela do jogo
    contexto.closePath(); // Fechando o caminho
    contexto.stroke(); // Desenha um caminho, nesse caso as bordas 
}

// Fun��o para desenhar o circulo
function DesenharCirculo() {
    contexto.beginPath(); 
    contexto.fillStyle = "yellow"; // Indicando a cor do circulo
    contexto.arc(x, y, 10, 0, Math.PI*2, true); // Desenhando o circulo com as coordenadas x e y, com raio 10, e angulo inicial de pi * 2
    contexto.fill(); // Desenhando o circulo
}


// Fun��o para desenhar o quadrado
function DesenharQuadrado(){ 

        var lugar_ocupado = false; // Essa variav�l tem como fun��o dizer se o local onde iremos adicionar a quadrado j� esta ocupado
        
        if(x + 10 == quadrado_x && y + 10 == quadrado_y) lugar_ocupado = true; // Se as arestas do circulo forem iguais as cordenadas do quadrado significa que o lugar esta ocupado

        // Se a vari�vel play for true e lugar ocupado for false podemos desenhar o quadrado
        if(play==true && lugar_ocupado== false) { 

            contexto.fillStyle = "red";// estabelecendo a cor do quadrado
            contexto.beginPath();  // inicia o caminho
            contexto.fillRect(quadrado_x * 10, quadrado_y * 10, 10, 10); // desenhando o quadrado            
            contexto.closePath(); // fechando o caminho   

        } else {
            // Se a vari�vel play for false ou a variavel lugar ocupado for true desenhamos o quadrado em uma �rea fora do canvas
            contexto.fillStyle = "white";// estabelecendo a cor do quadrado
            contexto.beginPath();  // inicia o caminho
            contexto.fillRect(100, 200, 10, 10); // desenhando o quadrado            
            contexto.closePath(); // fechando o caminho                       
        }
}

// Fun��o para calcular novas coordenadas para o proximo quadrado
function AdicionarQuadrado(){  
       
        play=true; // Varivale play igual a true, que indica que podemos desenhar um novo quadrado

        // Calculando uma coordenada aleat�ria. A fun��o Math.random retorna um valor aleat�rio entre 0 e 1. A fun��o parseInt converte o valor para inteiro
        quadrado_x = parseInt(Math.random()* (largura_canvas / 10)); 
        quadrado_y = parseInt(Math.random()* (altura_canvas / 10));               
}

// Fun��o para identificar captura do quadrado
function CapturarQuadrado(){ 
    
    distX = Math.abs(x - quadrado_x*10 - 5); // Calculando a dist�ncia horizontal entre o quadrado e o circulo. A fun��o abs retorna o m�dulo do n�mero.
    distY = Math.abs(y - quadrado_y*10 - 5); // Calculando a dist�ncia vertical entre o quadrado e o circulo.

    // "Catetos" para auxiliar o calculo da dist�ncia diagonal entre o circulo e o quadrado 
    var cx = distX - 5; 
    var cy = distY - 5;

    // Verificando se as dist�ncias entre o cirulo e o quadrado s�o menores que cinco, indicando que eles est�o se tocando na borda
    // Verificamos tamb�m se a dist�ncia diagonal entre o circulo e o quadrado esta abaixo de cem, ou seja, se eles est�o se tocando na diagonal
    if(distX <= 5 && distY <= 5 || (cx*cx + cy*cy) <= 100) { 
        
        quadrado_y = 0; quadrado_x = 0; // Atribuindo zero as coordenas do quadrado
        pontos+=10; // Incrementando os pontos de 10
        document.getElementById('pontos').innerHTML= pontos; // Mostrando os pontos na p�gina
        eat.play(); // Executando o arquivo de audio
        play = false; // Variavel play igual a false para indicar que n�o podemos desenhar outro quadrado na tela
    }
}

// Fun��o que recebe o evento de pressionar a seta
function KeyDown(evt){
    switch (evt.keyCode) { // O KeyCode retorna o c�digo unicode da tecla pressionada
        
        case 38:  // Seta para cima
            if (y - dy > 0){  // Se a subtra��o da velocidade em y e do tamanho y do circulo for maior que 0
                y -= dy; // decrementamos a coordenada y com o valor de dy
            }
            break;

        case 40: // Seta para baixo
            if (y + dy < altura_canvas){ // Se a soma da velocidade em y e do tamanho y do circulo for menor que a altura da tela
                y += dy; // incrementamos a coordenada y com o valor de dy
            }
            break;

        case 37:  // Seta para a esquerda
            if (x - dx > 0){ // Se a subtra��o da velocidade em x e do tamanho x do circulo for maior que 0
                x -= dx; // decrementamos a coordenada x com o valor de dx
            }
            break;

        case 39:  // Seta para a direita
            if (x + dx < largura_canvas){ // Se a soma da velocidade em x e do tamanho x do circulo for menor que a largura da tela
                x += dx; // incrementamos a coordenada x com o valor de dx
            }
            break;
    }
}

// Fun��o que ser� chamada a cada 100 milisegundo
function Atualizar() {

    DesenharTela();  // Chama a fun��o para desenhar a tela 
    DesenharCirculo(); //  Chama a fun��o para desenhar o circulo

    tempo += 100; // Incremento da variavel tempo para calcular quando iremos adicionar um novo quadrado
    if(tempo % (100*50) ==0) AdicionarQuadrado(); // 
    DesenharQuadrado(); // Chama o m�todo para desenhar o quadrado
    CapturarQuadrado(); // Chama o m�todo para capturar o quadrado

}

window.addEventListener('keydown', KeyDown, true); // Atribuindo um manipulador de eventos ao elemento KeyDown
Iniciar(); // No momento em que o programa for iniciado a fun��o Iniciar ser� chamada
