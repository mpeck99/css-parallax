

  $(function(){
    let nav = document.querySelector('.site-nav'),
        navHeight = nav.scrollHeight,
        aboutMonsters = document.querySelector('#meet'), 
        headerContent = document.querySelector('.header-content'), 
        headerCue = document.querySelector('.header--cue'), 
        monsterScroll = document.querySelectorAll('#monster-group .monster')

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

    monsterScroll.forEach((item) => item.style.animationDelay  = `${Math.random() * 0.5 + 0.3}s`);

      
    function inViewPort(el){
      let rect = el.getBoundingClientRect();

      return(
        (rect.top <= 0 && rect.botom >=0) || 
        (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
        (rect.top >= 0 && rect.botom <= window.innerHeight)
      )
    }

    function moveHeader(){
        let mainOnTop = aboutMonsters.getBoundingClientRect().top - navHeight;
        let top = window.pageYOffset;
        mainOnTop < 0
         ? nav.classList.add('in-body')
         : nav.classList.remove('in-body')

        let currentCuePosition = headerContent.getBoundingClientRect().top;

        currentCuePosition < 0
        ? headerCue.classList.add('d-none')
        : headerCue.classList.remove('d-none')

        headerContent.style.transform = (`translateY(-${top/2}px)`);
        headerContent.style.opacity = 1 - Math.max(top/(window.innerHeight * 0.5), 0);

        monsterScroll.forEach((item) => inViewPort(item) 
        ? item.classList.add('appear') 
        : item.classList.remove('appear'))

        window.requestAnimationFrame(moveHeader);
    }

    window.requestAnimationFrame(moveHeader);

    let controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: `#friend`,
      offset: -150,
    })
        .setClassToggle('.content', 'appear')
        .addTo(controller);
  });