// SALVAR SALÁRIO
document.getElementById("salvarSalario").addEventListener("click", function () {
    let salario = document.getElementById("salario").value
    localStorage.setItem("salario", salario)
    exibir_resumo()
});

// CADASTRAR DESPESAS
document.getElementById("formdespesas").addEventListener("submit", function(event){
    event.preventDefault()

    var nome1 = document.getElementById("nome").value
    var data1 = document.getElementById("data").value
    var valor1 = document.getElementById("valor").value

    var despesa = { nome: nome1, data: data1, valor: Number(valor1) }

    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || []

    lista_despesas.push(despesa)

    localStorage.setItem('listagem', JSON.stringify(lista_despesas))

    document.getElementById('formdespesas').reset()

    exibirDespesas()
    exibirResumo()
})


function exibirDespesas(){
    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || []
    var output = document.getElementById('output')
    output.innerHTML = ''

    for(let i=0; i<lista_despesas.length; i++){
        let li = document.createElement('li')
        li.textContent = 'Data: ' + lista_despesas[i].data +
                         ' | Nome: ' + lista_despesas[i].nome +
                         ' | Valor: R$ ' + lista_despesas[i].valor.toFixed(2)
        output.appendChild(li)
    }
}

function exibirResumo() {
    var salario = Number(localStorage.getItem('salario')) || 0
    var lista_despesas = JSON.parse(localStorage.getItem('listagem')) || [];

    var total = 0
    for (let i = 0; i < lista_despesas.length; i++) {
        total = total + lista_despesas[i].valor
    }

    var saldo = salario - total

    document.getElementById("resumo").innerHTML =
        "Salário: R$ " + salario.toFixed(2) + "<br>" +
        "Total de despesas: R$ " + total.toFixed(2) + "<br>" +
        "Saldo final: R$ " + saldo.toFixed(2)
}

window.onload = function () {
    document.getElementById("salario").value = localStorage.getItem("salario") || ""
    exibirDespesas();
    exibirResumo();

}

