function calculadoraidade(event) {
    event.preventDefault()
    console.log("Iniciando evento");

    let dadosUsuario = pegarValores();

    // Executa a função calcular e salva seu retorno na variavel imc
    // let calIdade = calcular(dadosUsuario.dia, dadosUsuario.mes, dadosUsuario.ano);
    let calIdade = calcular(dadosUsuario.dia, dadosUsuario.mes, dadosUsuario.ano);
   

    // Executa a função classificarImc passando como atributo o valor que esta na variavel imc e salva seu retorno na variavel classificacaoImc
    let classificacaoIdade = classificarIdade(calIdade); 

    // Executa a função organizarDados passando os atributos: dadosUsuario, imc e classificacaoImc, e salva seu retorno na variavel usuarioAtualizado
    let usuarioAtualizado = organizarDados(dadosUsuario, calIdade, classificacaoIdade);

    // Executa a função cadastrarUsuario passando como parametro o usuarioAtualizado
    cadastrarUsuario(usuarioAtualizado);

}

// Passo 1 - Pegar valor
function pegarValores() {
   
    let nomeRecebido = document.getElementById("nome").value.trim(); // trim - apaga os possiveis espaços em branco no inicio e fim da string
    let anoRecebido = parseInt(document.getElementById("ano-nascimento").value);
    let mesRecebido = parseInt(document.getElementById("mes-nascimento").value);
    let diaRecebido = parseInt(document.getElementById("dia-nascimento").value);

   
    let dadosUsuario = {
        nome: nomeRecebido,
        ano: anoRecebido,
        mes: mesRecebido,
        dia: diaRecebido
    }

    console.log(dadosUsuario);

    // Retorna o objeto dadosUsuario
    return dadosUsuario;
}


//Passo 2 - Calcular
// function calcular(dia, mes, ano) 
function calcular(dia, mes, ano) {
     let dataAtual = new Date()
    
    let anoCal =  dataAtual.getFullYear() - ano
    let mesCal = dataAtual.getMonth()
    let diaCal = dataAtual.getDay()

    let idade = 0
    if(mes < mesCal){
        idade = anoCal
    }else if(mes == mesCal) {
        if(dia <= diaCal){
            idade = anoCal
        }else{
            idade = anoCal - 1
        }
    } else {
        idade = anoCal - 1
    }
    

    console.log(idade);

    return idade;
}


//Passo 3 - Classificar
function classificarIdade(idade) {

    if(idade <= 12){
        return "Criança";

    }else if(idade <= 17){
        return "Adolescente"

    }else if (idade <= 65) {
        return "Adulto"

    }else{
        return "Idoso"
    }
}


// Passo 4 - Organizar informações
function organizarDados(dadosUsuario, calIdade, classificacaoIdade) {
    
    // let dataNascimento = "${dia}/${mes}/${ano}"
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', {timeStyle: "long",dateStyle: "short"}). format(Date.now())

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: calIdade,
        classificacao: classificacaoIdade,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}


//Passo 5 - Salvar
function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    
    //if (localStorage.getItem("usuariosCadastrados") == true) {
    if (localStorage.getItem("usuariosCadastrados")) {
        
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    
    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}


// Passo 6 - Ler lista
function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

   
    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado!</td>
    </tr>`

    }else{
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


// Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    console.log(listaDeCadastrados);

    listaDeCadastrados.forEach(pessoa => {
        
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="data de nascimento">${pessoa.dataCadastro}</td>
        <td data-cell="idade">${pessoa.calIdade}</td>
        <td data-cell="faixa etária">${pessoa.classificacaoIdade}</td>
    </tr>`
    });

    
    tabela.innerHTML = template;
}


// Passo 8 - Limpar local storage
function deletarRegistros() {
   
    localStorage.removeItem("usuariosCadastrados")

    window.location.reload();

}