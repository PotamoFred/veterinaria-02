/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PENDIENTE DE CONFIRMAR ANTES DE PUBLICAR
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Todo lo que hay en este archivo se puede confirmar con una llamada a la
 *  clínica o mirándolo en sus redes. Está agrupado aquí, y no disperso por los
 *  componentes, para que sea una sola sesión de edición en vez de ocho.
 *
 *  Busca `PENDIENTE` en el proyecto: esta es la lista completa.
 *
 *  1. EQUIPO y TESTIMONIOS son ficticios. Son nombres inventados de personas que
 *     no existen, publicados como si fueran el equipo médico y como si fueran
 *     reseñas de clientes reales. En una web de una clínica real eso es
 *     publicidad engañosa, y el riesgo no es teórico: alguien puede llegar
 *     esperando a la "Dra. Camila Restrepo".
 *
 *     Opciones: se reemplazan por los datos reales, o se borran del sitio.
 *     Mientras tanto, `render: false` oculta la sección sin tocar el código.
 *
 *  2. EMAIL, REDES y LEGAL son cadenas vacías a propósito. Los componentes no
 *     dibujan un enlace que no lleva a ningún sitio: un `href="#"` que parece
 *     un enlace y no lo es es peor que no dibujarlo.
 *  ─────────────────────────────────────────────────────────────────────────────
 */

const PENDIENTE = "PENDIENTE" as const;

/** Clínica y contacto. El teléfono sí es real. */
export const CLINICA = {
  nombre: "Bienestar Animal",
  ciudad: "Ibagué",
  telefonoDisplay: "315 647 8656",
  telefonoE164: "573156478656",
  direccion: "Manzana M, Casa 13, Barrio Las Palmas",
  /** Sin confirmar: se deja vacío y el enlace no se dibuja. */
  email: "",
  mapaUrl: "",
} as const;

/**
 * RRSS de la clínica. Solo se dibujan las que tengan URL: un ancla a "#" parece
 * un enlace y no lleva a ninguna parte.
 * Rellenar con las URLs completas, por ejemplo "https://instagram.com/miClinica".
 */
export const REDES = {
  facebook:
    "https://www.facebook.com/BienestarAnimalIbagueclinicaVeterinaria?locale=es_LA",
  instagram: "https://www.instagram.com/bienestaranimalibague/?hl=es-la",
  tiktok: "https://www.tiktok.com/@bienestar.animal85",
} as const;

/** Rutas de las políticas legales. Vacío = el enlace no se dibuja. */
export const LEGAL = {
  privacidad: "",
  terminos: "",
  avisoLegal: "",
  cookies: "",
} as const;

export const REDES_LISTAS = (Object.keys(REDES) as (keyof typeof REDES)[])
  .filter((k) => REDES[k])
  .map((k) => ({ red: k, url: REDES[k] }));

export const LEGAL_LISTAS = (
  [
    ["privacidad", "Política de privacidad"],
    ["terminos", "Términos y condiciones"],
    ["avisoLegal", "Aviso legal"],
    ["cookies", "Cookies"],
  ] as [keyof typeof LEGAL, string][]
)
  .filter(([clave]) => LEGAL[clave])
  .map(([clave, etiqueta]) => ({ etiqueta, href: LEGAL[clave] }));

/** Equipo médico. Todo por confirmar. */
export type Miembro = {
  nombre: string;
  cargo: string;
  especialidad: string;
  initials: string;
};

export const EQUIPO: Miembro[] = [
  {
    nombre: "Dra. Camila Restrepo",
    cargo: "Dirección clínica",
    especialidad: "Medicina preventiva y geriatría animal",
    initials: "CR",
  },
  {
    nombre: "Dr. Andrés Lozano",
    cargo: "Cirugía veterinaria",
    especialidad: "Cirugías y traumatología",
    initials: "AL",
  },
  {
    nombre: "Dra. Valentina Torres",
    cargo: "Atención a exóticos",
    especialidad: "Conejos, aves y pequeños mamíferos",
    initials: "VT",
  },
  {
    nombre: "Diego Marley",
    cargo: "Diagnóstico por imagen",
    especialidad: "Ecografía y radiografía digital",
    initials: "DM",
  },
];

export type Testimonio = {
  name: string;
  pet: string;
  text: string;
  rating: number;
};

/** Reseñas de clientes. Todas ficticias: hay que sustituirlas o quitarlas. */
export const TESTIMONIOS: Testimonio[] = [
  {
    name: "Camila Rodríguez",
    pet: "Dueña de Luna 🐈",
    text: "El equipo de Bienestar Animal es increíble. Mi gata llegó muy asustada y la trataron con una ternura que nunca olvidaré.",
    rating: 5,
  },
  {
    name: "Andrés Morales",
    pet: "Dueño de Thor 🐕",
    text: "Llevé a Thor para una cirugía y todo salió perfecto. Las instalaciones son impecables y el seguimiento post-operatorio fue excelente.",
    rating: 5,
  },
  {
    name: "Valentina Torres",
    pet: "Dueña de Kiwi 🐇",
    text: "Por fin una clínica que atiende conejos con el mismo cuidado que a perros y gatos. Totalmente recomendada.",
    rating: 5,
  },
  {
    name: "Diego Lozano",
    pet: "Dueño de Max 🐕",
    text: "El diagnóstico fue rápido y preciso. En menos de 24 horas Max ya estaba recuperándose. Servicio de primera.",
    rating: 5,
  },
  {
    name: "Sofía Jiménez",
    pet: "Dueña de Milo 🐈",
    text: "Me explicaron todo el proceso paso a paso. Se nota que realmente les importa el bienestar de los animales.",
    rating: 5,
  },
  {
    name: "Carlos Peña",
    pet: "Dueño de Rocky 🐕",
    text: "Años llevando a Rocky aquí y nunca una mala experiencia. Son constantes, profesionales y súper amables.",
    rating: 5,
  },
  {
    name: "Isabela Vargas",
    pet: "Dueña de Nala 🐈",
    text: "El servicio de vacunación es rapidísimo. En 15 minutos salimos y Nala estuvo tranquila todo el tiempo.",
    rating: 5,
  },
  {
    name: "Miguel Ángel Castro",
    pet: "Dueño de Bravo 🐕",
    text: "Tienen todos los servicios en un solo lugar. No necesito ir a otro sitio. Atención al cliente impecable.",
    rating: 5,
  },
];

/**
 * Lo que falta por confirmar, para poder mostrarlo de un vistazo.
 * Todo en cero significa que la web se puede publicar.
 */
export function pendientes(): string[] {
  const falta: string[] = [];
  if (!CLINICA.email) falta.push("email de contacto");
  if (!CLINICA.mapaUrl) falta.push("URL del mapa");
  if (!REDES_LISTAS.length) falta.push("redes sociales");
  if (!LEGAL_LISTAS.length) falta.push("páginas legales");
  return falta;
}

export { PENDIENTE };