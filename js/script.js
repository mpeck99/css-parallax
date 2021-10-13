

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
    let friendContentTween = TweenMax.from('#friend .inner', {
      y: 400,
      opacity: 0,
    })
    new ScrollMagic.Scene({
      triggerElement: `#friend`,
      duration: '100%',
      triggerHook: 0,
      offset: -100
    })
    .setTween(friendContentTween)
    .setPin('#friend')
    .addTo(controller);

    // Parachute 
    let paracuteTween = new TimelineMax()
    paracuteTween 
    .from('#parachute', {
        scale: .5,
        opacity: 0,
        rotation: -40, 
        x: '100%',
        y: '-200%'
      })
    .to('#parachute', {
      x: '30%',
      y: '20%',
      rotation: -30
    })
    .to('#parachute', {
      x: '-80%',
      y: '250%',
      rotation: 30,
      opacity: 0
    })

      new ScrollMagic.Scene({
      triggerElement:  "#friend", 
      duration: "170%",
      triggerHook: 0,
    })
    .setTween(paracuteTween)
    .addTo(controller)

    let typesTween = new TimelineMax()

    typesTween.from("#Types .inner .col", {
      scale: .5,
      opacity: 0,
      stagger: 1
    })

    new ScrollMagic.Scene({
      triggerElement: '#Types', 
      triggerHook: 0,
      duration: 300
    })

    .setPin('#Types')
    .setTween(typesTween)
    .addTo(controller)

    let hire = new TimelineMax()

    hire.from("#hire .inner .wrapper .card", {
      scale: .5,
      opacity: 0,
      x: 800,
      y: -200,
      stagger: 1,
      duration: 10,
    })

    new ScrollMagic.Scene({
      triggerElement: '#hire', 
      triggerHook: 0,
      duration: 300
    })

    .setPin('#hire')
    .setTween(hire)
    .addTo(controller)
  });