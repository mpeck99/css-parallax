function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    
    return is_ie; 
  }
  /* Create an alert to show if the browser is IE or not */
  if (isIE()){
      alert('IE is not supported, so some things may not function correctly. Please use Chrome, Firefox, or Safari');
  }

  $(function(){
    let aboutMonsters = document.querySelector('#about');

    function moveHeader(){
        console.log(`${aboutMonsters.getBoundingClientRect().top}`);
        window.requestAnimationFrame(moveHeader);
    }

    window.requestAnimationFrame(moveHeader);
  });