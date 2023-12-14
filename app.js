let listaSorte = [];
let numLimite = 100;

function exibirTela(tag,texto){
    let campo  = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto,"Brazilian Portuguese Female", {rate:1.2});
}


function mensInicial(){
    exibirTela('h1', "BORA JOGAR");
    exibirTela('p', "Escolha um número entre 1 e 100:");
}

mensInicial();

let numSecreto = gerarAleatorio();
let tentativas = 1;

function gerarAleatorio() {
    let numEscolhido = parseInt(Math.random()*numLimite+1);
    let qteLista = listaSorte.length;

    if(qteLista == numLimite){
        listaSorte=[];
    }

    if (listaSorte.includes(numEscolhido)){
        return gerarAleatorio();
    } else{
        listaSorte.push(numEscolhido);
        return numEscolhido;
    }
}


function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numSecreto) {
        exibirTela("h1" , "Parabéns!");

        let palaTentativa = tentativas >1 ? "tentativas" : "tentativa";
        let mensTentativa = `Você acertou com ${tentativas} ${palaTentativa}!`;

        exibirTela("p" , mensTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numSecreto) {
            exibirTela('p', "O número secreto é menor que o escolhido.");
        }
        else {
            exibirTela('p', "O número secreto é maior que o escolhido.");
        }
        tentativas++;
        limparCampo();
}
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}


function resetJogo() {
    numSecreto = gerarAleatorio();
    limparCampo();
    tentativas=1;
    mensInicial();
    document.getElementById('reiniciar').setAttribute("disabled",true);
}
