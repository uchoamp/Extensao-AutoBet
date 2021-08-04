
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function setBets(quantBet, minOdd) {
    this.quantBet = quantBet;
    this.minOdd = minOdd;
}

document.addEventListener("DOMContentLoaded", async function () {
    const inputQuantBets = document.querySelector("#quant-bets");
    const btnBet = document.querySelector("#btnBet");
    const tab = await getCurrentTab();
    const inputMinOdd = document.getElementById("min-odd");
    let quantBet, minOdd;

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
         chrome.scripting.executeScript({
            args: [0, minOdd],
            target: { tabId: tab.id },
            function: setBets,
        });
   });
});
