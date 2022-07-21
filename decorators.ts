//@logarObjeto
//pode por mais de um decorator em uma classe assim manipulan do melhor a classe
@imprimivel
class Eletrodomestico{
    constructor(){
        console.log('Novo..')
    }
}


type Construtor ={
    new(...arg: any[]) : {};
}

function logarObjeto(construtor:Construtor){
    return class extends construtor{
        constructor(...arg: any[]){
            console.log('Antes...');
            super(...arg)
            console.log('Depois...');
        }
    }
}

interface Eletrodomestico{
    imprimir?(): void ///opcional
}
function imprimivel(construtor:Function) {
    construtor.prototype.imprimir = function(){
        console.log(this)
    }   
}
const eletro = new Eletrodomestico()
eletro.imprimir && eletro.imprimir() // por conta do inteface a nova chamada para essa função deve ficar dessa forma
//verificando para ver se realmente existe essa função dentro do eletrodomestico


// Desafio Decorator perfilAdmin
const usuarioLogado = {
    nome: 'Guilherme Filho',
    email: 'guigui@gmail.com',
    admin: false
}
@testeAdim
class MudancaAdministrativa {
    critico() {
        console.log('Algo crítico foi alterado!')
    }
}
 
new MudancaAdministrativa().critico()
// Todo Generics e feito atravez de <> e usado para dar uma reforça na typagem da função
function testeAdim<T extends Construtor>(construtor:T){// e preciso definir o decorator do tipo construtor usando generics para poder ultilizar o corretamente o Decorators
        return class extends construtor{
            constructor(...arg: any[]){
                super(...arg)
                if(!usuarioLogado || !usuarioLogado.admin){
                    throw new Error('Sem permissão!')
                }
            }
        }
}
/// Decorator relacionado a metodo

class ContaCorrente{
    private saldo: number

    constructor(saldo:number) {
        this.saldo = saldo
    }
    @congelar
    sacar(valor:number){
        if(valor <= this.saldo){
            this.saldo -= valor;
            return true
        }else{
            return false
        }
    }
    @congelar
    getSaldo() {
        return this.saldo
    }
}
const cc = new ContaCorrente(100563.50)
cc.sacar(5000)
console.log(cc.getSaldo());

//impedir de alguem usar a função privada atravez do decorator congelar
cc.getSaldo = function(){
    return this['saldo'] + 7000
}
console.log(cc.getSaldo());
//vai usar esse decorator para congelar o objeto e n ´poder usar mais
function congelar( alvo: any, nomePropriedade: string, descritor: PropertyDescriptor){
    /// descriptor olhe na biblioteca para saber mas vamos usar a função writiable para impedir de usar o objeto
    console.log(alvo);
    console.log(nomePropriedade);
    descritor.writable = false

}
//Decorator para atributo

function naoNegativo(alvo: any ,nomePropriedade:string) {
    delete alvo[nomePropriedade]
    Object.defineProperty(alvo, nomePropriedade, {
        get: function(): any{
            return alvo
        }
    })
}