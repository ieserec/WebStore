
const steps = [
  {
    id: '1',
    message: 'Hola. Estoy aqui para ayudar',
    trigger: '2',
  },
  {
    id: '2',
    message: 'Cúal es tu nombre?',
    trigger: '3',
  },
  {
    id: '3',
    user: true,
    trigger: '4',
  },
  {
    id: '4',
    message: 'Hola {previousValue}, en que podemos ayudarte.',
    trigger: '5',
  },
  {
    id: '5',
    options: [
      { value: 'productos', label: 'Productos', trigger: '6' },
      { value: 'preguntas', label: 'Preguntas Frecuentes', trigger: 'preguntas' },
    ],
  },
  {
    id: '6',
    options: [
      { value: 'telefonos', label: 'Telefonos', trigger: 'telefonos' },
      { value: 'computadores', label: 'Computadores', trigger: 'computadores' },
    ],
  },
  {
    id: 'telefonos', options: [
      { value: 'samsung', label: 'Samsung', trigger: '1' },
      { value: 'huawei', label: 'Huawei', trigger: '1' },
      { value: 'xiaomi', label: 'Xiaomi', trigger: '1' },
      { value: 'iphone', label: 'Iphone', trigger: '1' },
    ],
  },
  {
    id: 'computadores',
    options: [
      { value: 'laptop', label: 'Laptop', trigger: 'laptop' },
      { value: 'escritorio', label: 'Ordenador de escritorio', trigger: 'escritorio' }
    ],
  },
  {
    id: 'laptop',
    options: [
      { value: 'hp', label: 'HP', trigger: 'hp',
    },
      { value: 'Toshiba', label: 'Toshiba', trigger: '1' }
    ],
  },
  {
    id: 'escritorio',
    options: [
      { value: 'monitor', label: 'Monitores', trigger: '1' },
      { value: 'cpu', label: 'Cpu', trigger: '1' }
    ],
  },
  {
    id: 'hp',
    message: 'Te redirigiremos en breves momentos...',
    end: true,
    trigger: '1',

  },
  {
    id: 'preguntas',
    message: 'Te redirigiremos en breves momentos...',
    end: true,
    trigger: '1',

  }
];

export default steps;