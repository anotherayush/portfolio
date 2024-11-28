let isTypedYearInitialized = false;

class ArchiveTypedAnimations {
  constructor() {
    this.categoryElement = document.getElementById('typed-year');
    this.typedInstance = null;
  }

  startCategoryAnimation() {
    if (isTypedYearInitialized) return; 
    
    isTypedYearInitialized = true; 

    this.typedInstance = new Typed(this.categoryElement, {
      strings: ['Hackathons - Personal - Semester - Mini Projects'],
      typeSpeed: 50,
      backSpeed: 0,
      loop: false,
      showCursor: false,
      startDelay: 300,
      onComplete: () => {
        this.typedInstance = null;
      },
    });
  }

  initialize() {
    this.startCategoryAnimation(); 
  }

  destroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
      this.typedInstance = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const animations = new ArchiveTypedAnimations();
  animations.initialize();
});
