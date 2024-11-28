class TypedAnimations {
    constructor() {
        this.nameTyped = null;
        this.locationTyped1 = null;
        this.locationTyped2 = null;
    }
  
    initialize() {
        // this.nameTyped = new Typed('#typed-text', {
        //     strings: ['Hi! I\'m <br>Ayush Srivastava.'],
        //     typeSpeed: 40,
        //     backSpeed: 0,
        //     loop: false,
        // });

        setTimeout(() => {
                this.nameTyped = new Typed('#typed-text', {
                    strings: ['Hi! I\'m <br>Ayush Srivastava.'],
                    typeSpeed: 40,
                    backSpeed: 0,
                    loop: false,
                }),1000;

                  this.locationTyped1 = new Typed('#typed-location1', {
                    strings: ['Software Developer from India.'],
                    typeSpeed: 60,
                    backSpeed: 0,
                    loop: false
                  });
                }, 2000);
            
                setTimeout(() => {
                    this.locationTyped2 = new Typed('#typed-location2', {
                        strings: ['Web Developer | Product Enthusiast.'],
                        typeSpeed: 60,
                        backSpeed: 0,
                        loop: false
                      });
                  }, 3500);
    }
  
    cleanup() {
        if (this.nameTyped) {
            this.nameTyped.destroy();
            this.nameTyped = null;
        }
        if (this.locationTyped1) {
            this.locationTyped1.destroy();
            this.locationTyped1 = null;
        }
        if (this.locationTyped2) {
            this.locationTyped2.destroy();
            this.locationTyped2 = null;
        }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const typedAnimations = new TypedAnimations();
    typedAnimations.initialize();
  }); 