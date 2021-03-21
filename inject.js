

var saldo = document.querySelector(".ssc-wla").innerText;
saldo = saldo.replace("$", "");

var saldoFinal = saldo - quantBet;


function chama() {
    saldo = document.querySelector(".ssc-wla").innerText;
    saldo = saldo.replace("$", "");

    if (saldo <= saldoFinal) {
        clearInterval(interval);
    }
}


var interval = setInterval(() => {
    chama();
    let odd = document.getElementById("mbet-FOURFOLD-1-real-tdo");

    if (odd ) {
        odd = odd.value;
        if (odd > 1.5) {
            document.querySelector("#mbet-FOURFOLD-1-real-stake").value = "0.01";
            document.querySelector(".place-bets-button").setAttribute('class', 'place-bets-button ui-betslip-action')
            document.querySelector(".place-bets-button").click();
        }
    }
    else {
        let repete = document.querySelector(".add-previous-selections");
        if (repete) {
            repete.click();
        }
    }

}, 500);





