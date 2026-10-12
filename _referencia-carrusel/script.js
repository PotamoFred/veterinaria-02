/**
 * Carrusel 3D Cover Flow Interactivo
 * Réplica fiel de la interacción y animación del video de referencia
 */

// 1. Datos del carrusel (Imágenes arquitectónicas y urbanas como en el video)
const CAROUSEL_DATA = [
  {
    title: "Vanishing Point",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Glass and Gravity",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Cut From the Sky",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Stacked in White",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "The Long Curve",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Quiet Lines",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Cobalt Facade",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Concrete Chorus",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "City in Motion",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Water and Stone",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
  }
];

class CoverFlowCarousel {
  constructor(data, initialIndex = 7) {
    this.data = data;
    this.total = data.length;
    // En el video empieza alrededor de 'Concrete Chorus' (índice 7)
    this.currentIndex = Math.min(Math.max(0, initialIndex), this.total - 1);

    // Elementos del DOM
    this.stage = document.getElementById("carouselStage");
    this.titleEl = document.getElementById("carouselTitle");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dashTrack = document.getElementById("dashTrack");
    this.viewport = document.querySelector(".carousel-viewport");

    this.cardElements = [];
    this.dashElements = [];
    this.isAnimating = false;

    // Inicializar
    this.init();
  }

  init() {
    this.renderCards();
    this.renderDashes();
    this.bindEvents();
    this.update();
  }

  // Renderiza las tarjetas dentro del escenario 3D
  renderCards() {
    this.stage.innerHTML = "";
    this.cardElements = [];

    this.data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "carousel-card";
      card.dataset.index = index;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Seleccionar ${item.title}`);
      card.tabIndex = 0;

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = "eager";

      card.appendChild(img);
      this.stage.appendChild(card);
      this.cardElements.push(card);

      // Clic directo con el ratón en la imagen
      card.addEventListener("click", () => {
        if (this.currentIndex !== index) {
          this.goToSlide(index);
        }
      });
    });
  }

  // Renderiza las rayitas / dashes inferiores
  renderDashes() {
    this.dashTrack.innerHTML = "";
    this.dashElements = [];

    this.data.forEach((item, index) => {
      const dash = document.createElement("button");
      dash.className = "dash-indicator";
      dash.dataset.index = index;
      dash.setAttribute("role", "tab");
      dash.setAttribute("aria-label", `Ir a ${item.title}`);

      dash.addEventListener("click", () => {
        this.goToSlide(index);
      });

      this.dashTrack.appendChild(dash);
      this.dashElements.push(dash);
    });
  }

  // Configura parámetros dinámicos según el ancho de pantalla
  getTransformMetrics() {
    const width = window.innerWidth;
    if (width <= 600) {
      return {
        baseOffset: 90,
        stepOffset: 70,
        baseZ: -100,
        stepZ: 50,
        rotateAngle: 38
      };
    } else if (width <= 900) {
      return {
        baseOffset: 120,
        stepOffset: 95,
        baseZ: -130,
        stepZ: 65,
        rotateAngle: 42
      };
    } else {
      return {
        baseOffset: 150,
        stepOffset: 125,
        baseZ: -150,
        stepZ: 75,
        rotateAngle: 46
      };
    }
  }

  // Actualiza la posición 3D de todas las tarjetas y controles
  update() {
    const metrics = this.getTransformMetrics();

    this.cardElements.forEach((card, index) => {
      const offset = index - this.currentIndex;

      if (offset === 0) {
        // Tarjeta Activa (Centro)
        card.style.transform = `translateX(0px) translateZ(0px) rotateY(0deg) scale(1)`;
        card.style.zIndex = 50;
        card.style.opacity = "1";
        card.style.filter = "brightness(1)";
        card.classList.add("is-active");
      } else if (offset > 0) {
        // Tarjetas a la Derecha
        const absOffset = offset;
        const translateX = metrics.baseOffset + (absOffset - 1) * metrics.stepOffset;
        const translateZ = metrics.baseZ - (absOffset - 1) * metrics.stepZ;
        const rotateY = -metrics.rotateAngle;
        const scale = Math.max(0.62, 1 - absOffset * 0.075);
        const opacity = Math.max(0, 1 - (absOffset - 1) * 0.22);
        const brightness = Math.max(0.4, 0.9 - absOffset * 0.12);

        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.zIndex = 50 - absOffset;
        card.style.opacity = opacity.toString();
        card.style.filter = `brightness(${brightness})`;
        card.classList.remove("is-active");
      } else {
        // Tarjetas a la Izquierda
        const absOffset = Math.abs(offset);
        const translateX = -(metrics.baseOffset + (absOffset - 1) * metrics.stepOffset);
        const translateZ = metrics.baseZ - (absOffset - 1) * metrics.stepZ;
        const rotateY = metrics.rotateAngle;
        const scale = Math.max(0.62, 1 - absOffset * 0.075);
        const opacity = Math.max(0, 1 - (absOffset - 1) * 0.22);
        const brightness = Math.max(0.4, 0.9 - absOffset * 0.12);

        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.zIndex = 50 - absOffset;
        card.style.opacity = opacity.toString();
        card.style.filter = `brightness(${brightness})`;
        card.classList.remove("is-active");
      }
    });

    // Actualizar rayitas / dashes de navegación
    this.dashElements.forEach((dash, index) => {
      if (index === this.currentIndex) {
        dash.classList.add("is-active");
        dash.setAttribute("aria-selected", "true");
      } else {
        dash.classList.remove("is-active");
        dash.setAttribute("aria-selected", "false");
      }
    });

    // Actualizar estado de las flechas (deshabilitar en los extremos)
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.total - 1;

    // Actualizar título con animación suave
    this.updateTitle(this.data[this.currentIndex].title);
  }

  // Transición suave del título
  updateTitle(newTitle) {
    if (this.titleEl.textContent === newTitle) return;

    this.titleEl.classList.add("title-transition");
    setTimeout(() => {
      this.titleEl.textContent = newTitle;
      this.titleEl.classList.remove("title-transition");
    }, 180);
  }

  // Ir a una diapositiva específica
  goToSlide(index) {
    if (index < 0 || index >= this.total) return;
    this.currentIndex = index;
    this.update();
  }

  // Diapositiva anterior
  prev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  // Diapositiva siguiente
  next() {
    if (this.currentIndex < this.total - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  // Event Listeners
  bindEvents() {
    // Clic en flechas inferiores
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Navegación con teclado (Flecha izquierda y derecha)
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prev();
      } else if (e.key === "ArrowRight") {
        this.next();
      }
    });

    // Soporte para Arrastre / Drag con ratón y Touch táctil
    let startX = 0;
    let isDragging = false;

    const handleDragStart = (clientX) => {
      startX = clientX;
      isDragging = true;
    };

    const handleDragEnd = (clientX) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = clientX - startX;
      const threshold = 40; // Sensibilidad del arrastre en píxeles

      if (diffX > threshold) {
        this.prev();
      } else if (diffX < -threshold) {
        this.next();
      }
    };

    // Eventos de ratón para drag
    this.viewport.addEventListener("mousedown", (e) => {
      handleDragStart(e.clientX);
    });

    window.addEventListener("mouseup", (e) => {
      handleDragEnd(e.clientX);
    });

    // Eventos táctiles para móviles
    this.viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length > 0) {
        handleDragStart(e.touches[0].clientX);
      }
    }, { passive: true });

    this.viewport.addEventListener("touchend", (e) => {
      if (e.changedTouches.length > 0) {
        handleDragEnd(e.changedTouches[0].clientX);
      }
    }, { passive: true });

    // Rueda del ratón (Wheel) con debounce
    let wheelTimeout;
    this.viewport.addEventListener("wheel", (e) => {
      if (wheelTimeout) return;
      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
        if (e.deltaX > 0 || e.deltaY > 0) {
          this.next();
        } else {
          this.prev();
        }
        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 300);
      }
    }, { passive: true });

    // Ajuste responsive en redimensionamiento de ventana
    window.addEventListener("resize", () => {
      this.update();
    });
  }
}

// Iniciar carrusel al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const carousel = new CoverFlowCarousel(CAROUSEL_DATA, 7);
});
