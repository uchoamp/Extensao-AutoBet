async function bet() {
    let odd = document.getElementById("mbet-FOURFOLD-1-real-tdo");
    
    if (quantBet <= 0) {
        return 0;
    }

    if (odd) {
        odd = odd.value;
        if (odd > minOdd) {
            document.querySelector("#mbet-FOURFOLD-1-real-stake").value =
                "0.01";
            document
                .querySelector(".place-bets-button")
                .setAttribute("class", "place-bets-button ui-betslip-action");
            document.querySelector(".place-bets-button").click();
        }
    } else {
        let repete = document.querySelector(".add-previous-selections");
        if (repete) {
            quantBet -= 1;
            repete.click();
        }
    }
    setTimeout(bet, 700);
}

bet();