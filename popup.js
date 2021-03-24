document.addEventListener("DOMContentLoaded", function(){
 

  const inputQuantBets = document.querySelector("#qbets");
  const btnBet = document.querySelector("#btnBet");


  inputQuantBets.oninput = ()=>{
    if(inputQuantBets.value){
      btnBet.removeAttribute("disabled");
    }else{
      btnBet.setAttribute("disabled", "true");
    }
  }


  btnBet.addEventListener("click", function(){
    
    this.setAttribute("disabled", "true");

    let quantBet = inputQuantBets.value;

    chrome.tabs.executeScript({
      code: "var quantBet = "+quantBet+";"
    });

    chrome.tabs.executeScript({
      file: 'inject.js'
    });

    window.close();

  })

  document.querySelector("#stop").addEventListener("click", ()=>{

  chrome.tabs.executeScript({
    code: "clearInterval(interval);"
  });

  });

})