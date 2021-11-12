
async function bet(data) {
    quantBet = data.quantBet;
    minOdd = data.minOdd;
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
            chrome.storage.local.set({"quantBet":--quantBet});
            repete.click();
        }
    }
    setTimeout(() => chrome.storage.local.get(["quantBet","minOdd"], bet), 700);
}


function getOrderedCashoutContainer(){
    this.btns_to_cash_out = [];
    this.co_container = [];
    let right_multiples = document.getElementsByClassName(
        "cashout-match-list-1"
    )[0];
    let left_multiples = document.getElementsByClassName(
        "cashout-match-list-2"
    )[0];
    if (left_multiples) {
        let co_right = right_multiples.getElementsByClassName(
            "cashout-match-container"
        );
        let co_left = left_multiples.getElementsByClassName(
            "cashout-match-container"
        );
        for (let i = 0; i < co_right.length; i++) {
            this.co_container.push(co_right[i]);
            this.btns_to_cash_out.push(co_right[i].getElementsByClassName("cashout-button")[0]);
            if (co_left[i]) {
                this.co_container.push(co_left[i])
                this.btns_to_cash_out.push(co_left[i].getElementsByClassName("cashout-button")[0]);
            };
        }
    } else {
        if(right_multiples)co_container = right_multiples.getElementsByClassName("cashout-match-container"  )[0];
    }
}




function getMultiples() {
    let result = [];
    let i = (j = 0);
    let matchs, ancors, lk_bet;
    let conca = (current_conca = "");


    for (const multiple of co_container) {
        matchs = multiple.querySelector(".bet-legs");
        ancors =  matchs.querySelectorAll("a.ui-nav.ui-top");

        for (let a of ancors) {
            lk_bet = a.getAttribute("href");
            conca += lk_bet;
        }
        if (conca != current_conca) {
            current_conca = conca;
            if (j != 0) {
                result[i] =
                    i > 0
                        ? { start: result[i - 1]["end"], end: j }
                        : { start: 0, end: j };
                i++;
            }
        }
        j++;
        conca = "";
    }
    if (j > 0)
        result[i] =
            i > 0
                ? { start: result[i - 1]["end"], end: j }
                : { start: 0, end: j };

    return result;
}



function injectCashOut(i, end) {

    if (i > end) {
        return;
    }

    btns_to_cash_out[i].click();

    i++;

    setTimeout(function () {
        injectCashOut(i, end);
    }, 500);
}
