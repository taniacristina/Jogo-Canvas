var canvas; // variavel para referenciar o elemento canvas no HTML
var contexto; // variavel para referenciar o contexto (2d ou 3d) que vamos utilizar para desenhar o jogo

var dx = 5;  // velocidade horizontal do circulo
var dy = 5; // velocidade vertical do circulo
var x = 250; // posição horizontal inicial do circulo
var y = 100; // posição vertical inicial do circulo

var largura_canvas = 500; // largura da tela retangular do canvas
var altura_canvas = 200; //  altura da tela retangular do canvas
var tempo = 0; // variavel para controlar o tempo em que aparecer o quadrado

var quadrado_x; // Variavel para guardar a coordenada x em que iremos adicionar o novo quadrado
var quadrado_y; // Variavel para guardar a coordenada y em que iremos adicionar o novo quadrado 
var distX; // Variavel para guardar a distância horizontal entre o circulo e o quadrado
var distY; // Varivale para guardar a distância vertical entre o circulo e o quadrado

var play = true; // Variavel que indica se podemos desenhar um novo quadrado. True = podemos, false = não podemos
var pontos = 0; // Variavel para fazer a contagem de pontos do jogo

var eat = new Audio('audio/eat.wav'); // Variavel para guardar o arquivo de audio que utilizaremos. Esse arquivo será chamado sempre que o circulo "comer" um quadrado

// Função em que o programa será iniciado
function Iniciar() {
    canvas = document.getElementById("canvas"); // Buscando o elemento canvas no html
    contexto = canvas.getContext("2d"); // Estabelecendo o contexto 2d para o jogo
    return setInterval(Atualizar, 100); // Através desse método, a função Atualizar é chamada a cada 100 milisegundos
}

// Função para desenhar a tela do jogo
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

// Função para desenhar o circulo
function DesenharCirculo() {
    contexto.beginPath(); 
    contexto.fillStyle = "yellow"; // Indicando a cor do circulo
    contexto.arc(x, y, 10, 0, Math.PI*2, true); // Desenhando o circulo com as coordenadas x e y, com raio 10, e angulo inicial de pi * 2
    contexto.fill(); // Desenhando o circulo
}


// Função para desenhar o quadrado
function DesenharQuadrado(){ 

        var lugar_ocupado = false; // Essa variavél tem como função dizer se o local onde iremos adicionar a quadrado já esta ocupado
        
        if(x + 10 == quadrado_x && y + 10 == quadrado_y) lugar_ocupado = true; // Se as arestas do circulo forem iguais as cordenadas do quadrado significa que o lugar esta ocupado

        // Se a variável play for true e lugar ocupado for false podemos desenhar o quadrado
        if(play==true && lugar_ocupado== false) { 

            contexto.fillStyle = "red";// estabelecendo a cor do quadrado
            contexto.beginPath();  // inicia o caminho
            contexto.fillRect(quadrado_x * 10, quadrado_y * 10, 10, 10); // desenhando o quadrado            
            contexto.closePath(); // fechando o caminho   

        } else {
            // Se a variável play for false ou a variavel lugar ocupado for true desenhamos o quadrado em uma área fora do canvas
            contexto.fillStyle = "white";// estabelecendo a cor do quadrado
            contexto.beginPath();  // inicia o caminho
            contexto.fillRect(100, 200, 10, 10); // desenhando o quadrado            
            contexto.closePath(); // fechando o caminho                       
        }
}

// Função para calcular novas coordenadas para o proximo quadrado
function AdicionarQuadrado(){  
       
        play=true; // Varivale play igual a true, que indica que podemos desenhar um novo quadrado

        // Calculando uma coordenada aleatória. A função Math.random retorna um valor aleatório entre 0 e 1. A função parseInt converte o valor para inteiro
        quadrado_x = parseInt(Math.random()* (largura_canvas / 10)); 
        quadrado_y = parseInt(Math.random()* (altura_canvas / 10));               
}

// Função para identificar captura do quadrado
function CapturarQuadrado(){ 
    
    distX = Math.abs(x - quadrado_x*10 - 5); // Calculando a distância horizontal entre o quadrado e o circulo. A função abs retorna o módulo do número.
    distY = Math.abs(y - quadrado_y*10 - 5); // Calculando a distância vertical entre o quadrado e o circulo.

    // "Catetos" para auxiliar o calculo da distância diagonal entre o circulo e o quadrado 
    var cx = distX - 5; 
    var cy = distY - 5;

    // Verificando se as distâncias entre o cirulo e o quadrado são menores que cinco, indicando que eles estão se tocando na borda
    // Verificamos também se a distância diagonal entre o circulo e o quadrado esta abaixo de cem, ou seja, se eles estão se tocando na diagonal
    if(distX <= 5 && distY <= 5 || (cx*cx + cy*cy) <= 100) { 
        
        quadrado_y = 0; quadrado_x = 0; // Atribuindo zero as coordenas do quadrado
        pontos+=10; // Incrementando os pontos de 10
        document.getElementById('pontos').innerHTML= pontos; // Mostrando os pontos na página
        eat.play(); // Executando o arquivo de audio
        play = false; // Variavel play igual a false para indicar que não podemos desenhar outro quadrado na tela
    }
}

// Função que recebe o evento de pressionar a seta
function KeyDown(evt){
    switch (evt.keyCode) { // O KeyCode retorna o código unicode da tecla pressionada
        
        case 38:  // Seta para cima
            if (y - dy > 0){  // Se a subtração da velocidade em y e do tamanho y do circulo for maior que 0
                y -= dy; // decrementamos a coordenada y com o valor de dy
            }
            break;

        case 40: // Seta para baixo
            if (y + dy < altura_canvas){ // Se a soma da velocidade em y e do tamanho y do circulo for menor que a altura da tela
                y += dy; // incrementamos a coordenada y com o valor de dy
            }
            break;

        case 37:  // Seta para a esquerda
            if (x - dx > 0){ // Se a subtração da velocidade em x e do tamanho x do circulo for maior que 0
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

// Função que será chamada a cada 100 milisegundo
function Atualizar() {

    DesenharTela();  // Chama a função para desenhar a tela 
    DesenharCirculo(); //  Chama a função para desenhar o circulo

    tempo += 100; // Incremento da variavel tempo para calcular quando iremos adicionar um novo quadrado
    if(tempo % (100*50) ==0) AdicionarQuadrado(); // 
    DesenharQuadrado(); // Chama o método para desenhar o quadrado
    CapturarQuadrado(); // Chama o método para capturar o quadrado

}

window.addEventListener('keydown', KeyDown, true); // Atribuindo um manipulador de eventos ao elemento KeyDown
Iniciar(); // No momento em que o programa for iniciado a função Iniciar será chamada
