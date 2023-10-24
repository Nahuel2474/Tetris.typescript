export const cols = 10;
export const rows = 25;
export const block = 20;

export const shapes = [
  {
    name: "L al reves ",
    color: "#FF4136", // Rojo
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    name: "L",
    color: "#FF851B", // Naranja
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    name: "I",
    color: "#FFDC00", // Amarillo
    shape: [
      [0,0,0,0],
      [1, 1, 1, 1],
      [0,0,0,0],
    ],
  },
  {
    name: "Cuadrado",
    color: "#2ECC40", // Verde
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    name: "escalera",
    color: "#0074D9", // Azul
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    name: "escalera al reves",
    color: "#001f3f", // Azul oscuro
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    name: "piramide",
    color: "#B10DC9", // Morado
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
];