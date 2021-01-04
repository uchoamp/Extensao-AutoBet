

var saldo =  document.querySelector(".ssc-wla").innerText;
saldo = saldo.replace("$","");

var saldoFinal = saldo - quantBet;


 function chama(){
        saldo =  document.querySelector(".ssc-wla").innerText;

        saldo = saldo.replace("$","");


         if(saldo <= saldoFinal){
            clearInterval(interval);
            clearInterval(interval1);}
 }


var interval = setInterval(( )=>{

        chama();
        document.querySelector("#mbet-FOURFOLD-1-real-stake").value =  "0.01";
        document.querySelector(".place-bets-button").setAttribute('class', 'place-bets-button ui-betslip-action')
        document.querySelector(".place-bets-button").click();

     
    }, 1000);


var interval1 = setInterval(( )=>{

        chama();
        document.querySelector(".add-previous-selections").click()
        

        
        },1000)



