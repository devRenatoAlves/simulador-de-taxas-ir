const _ = require ("os");
const inquirer = require ("inquirer");
const chalk = require ("chalk");
const Table = require ("cli-table3")


console.info(chalk.bgBlue.black("Bem-Vindo a Simulação de taxa de alíquotas regressivas de IR(Imposto de Renda)"))
operation()

function operation () {
  inquirer.prompt([{
    type: "list",
    name: "action",
    message: "Oque deseja fazer?",
    choices: ['Simular' , 'Consultar tabela de impostos', 'Sair'] 
  }])
  .then((answer) => {

    if(answer.action === 'Simular'){
      simular()
    }else if (answer.action === 'Consultar tabela de impostos') {
      consultTabela()
    } else if (answer.action === 'Sair') {
      console.log(chalk.bgGreen.black('Obrigado por usar o Simulador'))
      process.exit()
    }
  })           
  .catch((err) => console.log(err))                   
}

function simular () {
  inquirer.prompt([{
    name: "valor",
    message: "Qual é o valor do seu investimento?"
  }])
  .then((answer) => {
    const valor = parseFloat(answer.valor)
    jurosAA(valor)
  })
  .catch((err) => console.log (err))
}

function jurosAA (valor) {
  const valorSimulado = valor;

  inquirer.prompt([{
    type: "list",
    name: "prazoInvestimento",
    message: "Quanto tempo você demorou para sacar seu investimento?",
    choices: ["Até 180 dias", "181 até 360 dias", "361 até 720 dias", "Acima de 720 dias"]
  }]) 
  .then((answer) => {
    const prazo = answer['prazoInvestimento']
    let porcentagem;

    if(prazo === "Até 180 dias") {
      porcentagem = 22.50;
    } else if (prazo === "181 até 360 dias") {
      porcentagem = 20.00;
    }else if (prazo === "361 até 720 dias") {
      porcentagem = 17.50; 
    }else if (prazo === "Acima de 720 dias") {
      porcentagem = 15.00;
    }

    const imposto = (porcentagem/100) * valor;
    const valorFinal = valor - imposto;

    return console.log(chalk.bgGreen.black(`Você irá receber R$${valorFinal.toFixed(2)} do seu investimento, já descontando o Imposto de Renda de ${porcentagem}%.`))
    
  })
  .catch((err) => console.log(err))
}

function consultTabela () {
const table = new Table ({
  head: ['Periodo', 'Alíquota%'],
  colWidths: [20,20]
});

table.push(
  ['Até 180 dias', '22.5%'],
  ['De 181 a 360 dias', '20%'],
  ['De 361 a 720 dias', '17.5%'],
  ['Acima de 720 dias', '15%']
);

console.log(table.toString());
return operation()
}
