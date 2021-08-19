var intervals = [];

function compareUrl(url) {
    if (!url.match(/betfair\.com/)) {
        window.close();
    }
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getMultiples() {
    let result = [];
    let i = (j = 0);
    let matchs, ancors, lk_bet;
    let conca = (current_conca = "");

    let co_container = getOrderedCashoutContainer();

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
    chrome.storage.local.get(['btns_to_cash_out'], (result)=>{
        result[i].click();
    });
    btns_to_cash_out[i].click();
    i++;

    setTimeout(function () {
        injectCashOut(i, end);
    }, 1000);
}

function setBets(quantBet, minOdd) {
    this.quantBet = quantBet;
    this.minOdd = minOdd;
}

function selectChange() {
    const numCo = document.getElementById("num-co");

    let interval = intervals[this.value - 1];
    numCo.value = numCo.max = interval.end - interval.start;
    numCo.min = 1;
}

async function initial() {
    const tab = await getCurrentTab();
    compareUrl(tab.url);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/js/utils.js"],
    });
    return tab;
}

document.addEventListener("DOMContentLoaded", async function () {
    const tab = await initial();
    const inputQuantBets = document.querySelector("#quant-bets");
    const btnBet = document.querySelector("#btnBet");
    const inputMinOdd = document.getElementById("min-odd");
    const multiple = document.getElementById("multiple");
    const numCo = document.getElementById("num-co");
    const btnCashOut = document.getElementById("cash-out");
    let quantBet = (minOdd = 0);

    multiple.onchange = selectChange;

    inputQuantBets.oninput = () => {
        if (inputQuantBets.value) {
            btnBet.removeAttribute("disabled");
        } else {
            btnBet.setAttribute("disabled", "true");
        }
    };

    btnBet.addEventListener("click", function () {
        this.setAttribute("disabled", "true");

        quantBet = inputQuantBets.value;
        minOdd = inputMinOdd.value;

        chrome.scripting.executeScript({
            args: [quantBet, minOdd],
            target: { tabId: tab.id },
            function: setBets,
        });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["/js/inject.js"],
        });

        window.close();
    });

    document.querySelector("#stop").addEventListener("click", () => {
        quantBet = 0;
        chrome.scripting.executeScript({
            args: [quantBet, minOdd],
            target: { tabId: tab.id },
            function: setBets,
        });
    });

    if (tab.url === "https://www.betfair.com/sport/cashout") {
        document.getElementById("co-container").style.display = "initial";
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: getMultiples,
            },
            (result) => {
                intervals = result[0]["result"];

                let node = multiple.children[0].cloneNode(true);
                while (multiple.firstChild) {
                    multiple.removeChild(multiple.firstChild);
                }

                for (let i = 0; i < intervals.length; i++) {
                    node.value = i + 1;
                    node.innerText = i + 1;
                    multiple.append(node);
                    node = node.cloneNode(true);
                }
                if (intervals.length > 0) {
                    multiple.onchange();
                } else {
                    document.getElementById("co-container").style.display =
                        "none";
                }
            }
        );

        btnCashOut.onclick = function () {
            let interval = intervals[multiple.value - 1];
            let end = Number(interval.start) + Number(numCo.value) - 1;
            chrome.scripting.executeScript({
                args: [interval.start, end],
                target: { tabId: tab.id },
                function: injectCashOut,
            });
            window.close();
        };
    }
});
