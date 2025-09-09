// Back-end Services Page JS (reuses behavior patterns)
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Footer testimonial slider (same logic as other pages)
  const track = document.querySelector('footer .feedback-track');
  const dots = document.querySelectorAll('footer .dot');
  const nextBtn = document.querySelector('footer .next');
  const prevBtn = document.querySelector('footer .prev');
  if (track && nextBtn && prevBtn && dots.length) {
    let currentIndex = 0;
    function updateSlider(index){
      track.style.transform = `translateX(-${index * 50}%)`;
      dots.forEach((d,i)=>d.classList.toggle('active', i===index));
    }
    nextBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%dots.length; updateSlider(currentIndex); });
    prevBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex-1+dots.length)%dots.length; updateSlider(currentIndex); });
    dots.forEach((dot,i)=>dot.addEventListener('click', ()=>{ currentIndex=i; updateSlider(currentIndex); }));
  }

  // Vertical tabs interaction for Back-end scope
  const beTabs = document.querySelectorAll('.be-tab');
  const bePanels = document.querySelectorAll('.be-panel');
  if (beTabs.length && bePanels.length) {
    function activate(id){
      beTabs.forEach(t=>t.classList.remove('active'));
      bePanels.forEach(p=>p.classList.remove('active'));
      const tab = Array.from(beTabs).find(t=>t.getAttribute('data-target')===id);
      const panel = document.getElementById(id);
      if (tab) tab.classList.add('active');
      if (panel) panel.classList.add('active');
    }
    beTabs.forEach(tab=>{
      tab.addEventListener('click', ()=> activate(tab.getAttribute('data-target')));
    });
  }
});


