var btns_to_cash_out = [];

function getOrderedCashoutContainer() {
    let co_container = [];
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
            co_container.push(co_right[i]);
            btns_to_cash_out.push(co_right[i].getElementsByClassName("cashout-button")[0]);
            if (co_left[i]) {
                co_container.push(co_left[i])
                btns_to_cash_out.push(co_left[i].getElementsByClassName("cashout-button")[0]);
            };
        }
    } else {
        co_container = right_multiples.getElementsByClassName(
            "cashout-match-container"
        )[0];
    }
    return co_container;
}
