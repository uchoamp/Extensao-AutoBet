var interval = setInterval(() => {

    let odd = document.getElementById("mbet-FOURFOLD-1-real-tdo");

    if (odd) {
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
            quantBet -= 1;
            if (quantBet == 0) {
                clearInterval(interval);
            }else{
                repete.click();
            }
        }
        console.log(quantBet)
    }

}, 500);





