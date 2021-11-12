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

async function initial() {
    const tab = await getCurrentTab();
    compareUrl(tab.url);
    return tab;
}

function selectChange() {
    const numCo = document.getElementById("num-co");

    let interval = intervals[this.value - 1];
    numCo.value = numCo.max = interval.end - interval.start;
    numCo.min = 1;
}

function injectGetOrderedCashoutContainer(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getOrderedCashoutContainer,
    });
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
        chrome.storage.local.set({ quantBet: quantBet, minOdd: minOdd });

        chrome.scripting.executeScript({
            args: [{ quantBet: quantBet, minOdd: minOdd }],
            target: { tabId: tab.id },
            function: bet,
        });

        window.close();
    });

    document.querySelector("#stop").addEventListener("click", () => {
        quantBet = 0;
        chrome.storage.local.set({ quantBet: quantBet });
    });

    if (tab.url.startsWith("https://www.betfair.com/sport/cashout")) {
        document.getElementById("co-container").style.display = "initial";
        injectGetOrderedCashoutContainer(tab);
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
            injectGetOrderedCashoutContainer(tab);
            chrome.scripting.executeScript({
                args: [interval.start, end],
                target: { tabId: tab.id },
                function: injectCashOut,
            });
            window.close();
        };
    }
});
