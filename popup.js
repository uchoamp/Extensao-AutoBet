document.addEventListener("DOMContentLoaded", function(){

  document.querySelector("#btn").addEventListener("click", function(){

    var quantBet = document.querySelector("#qbets").value;

    quantBet = quantBet/100

    
    chrome.tabs.executeScript({
      code: "var quantBet = "+quantBet+";"
    });
    chrome.tabs.executeScript({
      file: 'autoCod.js'

    });
  
    

  })

  document.querySelector("#stop").addEventListener("click", ()=>{

  chrome.tabs.executeScript({
    code: "clearInterval(interval); clearInterval(interval1);"
  });




  });

})