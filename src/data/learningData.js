// Real Photo Learning Data for Toddler Sonic (2.5 years old)

export const COUNTING_QUIZZES = [
  {
    id: 'count_ducks_3',
    audioKey: 'count_ducks_3',
    image: '/images/animals/ducks_3.jpg',
    targetName: 'chú vịt con',
    targetNameEn: 'ducklings',
    question: 'Trong hình có bao nhiêu chú vịt con?',
    questionEn: 'How many ducklings are there?',
    count: 3,
    options: [1, 2, 3, 4],
    audioPrompt: 'Đố bé Sonic, trong hình có bao nhiêu chú vịt con nào?',
    audioPromptEn: 'How many ducklings do you see?',
    praise: 'Đúng rồi! Có 3 chú vịt vàng kêu cạp cạp! Sonic giỏi quá!',
    praiseEn: 'Awesome! 3 cute yellow ducklings!'
  },
  {
    id: 'count_dogs_2',
    audioKey: 'count_dogs_2',
    image: '/images/animals/dogs_2.jpg',
    targetName: 'chú cún con',
    targetNameEn: 'puppies',
    question: 'Trong hình có bao nhiêu chú cún con?',
    questionEn: 'How many puppies are there?',
    count: 2,
    options: [1, 2, 3, 4],
    audioPrompt: 'Trong hình có bao nhiêu chú cún con đáng yêu nè bé?',
    audioPromptEn: 'How many puppies are there?',
    praise: 'Chính xác! Có 2 chú cún con vẫy đuôi!',
    praiseEn: 'Great job! 2 happy puppies!'
  },
  {
    id: 'count_dogs_3',
    audioKey: 'count_dogs_3',
    image: '/images/animals/dogs_3.jpg',
    targetName: 'chú chó',
    targetNameEn: 'dogs',
    question: 'Trong hình có bao nhiêu chú chó?',
    questionEn: 'How many dogs are there?',
    count: 3,
    options: [2, 3, 4, 5],
    audioPrompt: 'Đố Sonic, có bao nhiêu chú chó ngồi thẳng hàng nè?',
    audioPromptEn: 'How many dogs in a row?',
    praise: 'Hoan hô! Có 3 chú chó ngoan ngoãn!',
    praiseEn: 'Super! 3 friendly dogs!'
  },
  {
    id: 'count_cats_2',
    audioKey: 'count_cats_2',
    image: '/images/animals/cats_2.jpg',
    targetName: 'chú mèo con',
    targetNameEn: 'kittens',
    question: 'Trong hình có bao nhiêu chú mèo con?',
    questionEn: 'How many kittens are there?',
    count: 2,
    options: [1, 2, 3, 4],
    audioPrompt: 'Có bao nhiêu chú mèo con kêu meo meo trong hình nè?',
    audioPromptEn: 'How many kittens are there?',
    praise: 'Đúng rồi! Có 2 chú mèo con xinh xắn!',
    praiseEn: 'Spot on! 2 sweet kittens!'
  },
  {
    id: 'count_rabbits_3',
    audioKey: 'count_rabbits_3',
    image: '/images/animals/rabbits_3.jpg',
    targetName: 'chú thỏ trắng',
    targetNameEn: 'bunnies',
    question: 'Trong hình có bao nhiêu chú thỏ trắng?',
    questionEn: 'How many white bunnies are there?',
    count: 3,
    options: [1, 2, 3, 4],
    audioPrompt: 'Có bao nhiêu chú thỏ trắng tai dài trong hình vậy Sonic?',
    audioPromptEn: 'How many white bunnies do you see?',
    praise: 'Tuyệt vời! Có 3 chú thỏ trắng nhảy tung tăng!',
    praiseEn: 'Hooray! 3 fluffy white bunnies!'
  },
  {
    id: 'count_elephant_1',
    audioKey: 'count_elephant_1',
    image: '/images/animals/elephant.jpg',
    targetName: 'chú voi con',
    targetNameEn: 'elephant',
    question: 'Trong hình có bao nhiêu chú voi con?',
    questionEn: 'How many baby elephants are there?',
    count: 1,
    options: [1, 2, 3, 4],
    audioPrompt: 'Trong hình có bao nhiêu chú voi con có vòi dài nè bé?',
    audioPromptEn: 'How many elephants do you see?',
    praise: 'Đúng rồi! Có 1 chú voi con dễ thương!',
    praiseEn: 'Correct! 1 cute baby elephant!'
  }
];

// Direct Letter Recognition (Nhận diện mặt chữ to trực tiếp cho bé 2.5 tuổi)
export const LETTER_QUIZZES = [
  {
    id: 'letter_a',
    audioKey: 'letter_a',
    targetLetter: 'A',
    color: '#ef4444',
    question: 'Đố Sonic tìm chữ A nè!',
    questionEn: 'Find the letter A!',
    correctLetter: 'A',
    options: ['A', 'B', 'C'],
    audioPrompt: 'Đố bé Sonic, đâu là chữ A nào?',
    audioPromptEn: 'Where is the letter A?',
    praise: 'Đúng rồi! Đây là chữ A! Bé Sonic thông minh quá!',
    praiseEn: 'Awesome! That is the letter A!'
  },
  {
    id: 'letter_b',
    audioKey: 'letter_b',
    targetLetter: 'B',
    color: '#3b82f6',
    question: 'Đố Sonic tìm chữ B nè!',
    questionEn: 'Find the letter B!',
    correctLetter: 'B',
    options: ['B', 'C', 'D'],
    audioPrompt: 'Đố bé Sonic, đâu là chữ B nào?',
    audioPromptEn: 'Where is the letter B?',
    praise: 'Chính xác! Đây là chữ B! Sonic giỏi quá!',
    praiseEn: 'Great job! That is the letter B!'
  },
  {
    id: 'letter_c',
    audioKey: 'letter_c',
    targetLetter: 'C',
    color: '#10b981',
    question: 'Đố Sonic tìm chữ C nè!',
    questionEn: 'Find the letter C!',
    correctLetter: 'C',
    options: ['C', 'A', 'B'],
    audioPrompt: 'Đố bé Sonic, đâu là chữ C nào?',
    audioPromptEn: 'Where is the letter C?',
    praise: 'Hoan hô! Đây là chữ C! Bé giỏi lắm!',
    praiseEn: 'Hooray! That is the letter C!'
  },
  {
    id: 'letter_o',
    audioKey: 'letter_o',
    targetLetter: 'O',
    color: '#f59e0b',
    question: 'Đố Sonic tìm chữ O tròn xoe!',
    questionEn: 'Find the round letter O!',
    correctLetter: 'O',
    options: ['O', 'A', 'C'],
    audioPrompt: 'Đố bé Sonic, đâu là chữ O tròn xoe nào?',
    audioPromptEn: 'Where is the round letter O?',
    praise: 'Đúng rồi! Chữ O tròn như quả trứng gà! Sonic giỏi quá!',
    praiseEn: 'Super! That is the round letter O!'
  },
  {
    id: 'letter_d',
    audioKey: 'letter_d',
    targetLetter: 'D',
    color: '#8b5cf6',
    question: 'Đố Sonic tìm chữ D nè!',
    questionEn: 'Find the letter D!',
    correctLetter: 'D',
    options: ['D', 'B', 'O'],
    audioPrompt: 'Đố bé Sonic, đâu là chữ D nào?',
    audioPromptEn: 'Where is the letter D?',
    praise: 'Tuyệt vời! Đây là chữ D! Sonic nhớ bài siêu quá!',
    praiseEn: 'Spot on! That is the letter D!'
  }
];

export const SHAPE_QUIZZES = [
  {
    id: 'shape_circle',
    audioKey: 'shape_circle',
    image: '/images/shapes/circle.jpg',
    question: 'Đố Sonic đây là hình gì nè?',
    questionEn: 'What shape is this?',
    correctAnswer: 'Hình Tròn',
    correctAnswerEn: 'Circle',
    options: ['Hình Tròn', 'Hình Vuông', 'Hình Tam Giác'],
    optionsEn: ['Circle', 'Square', 'Triangle'],
    audioPrompt: 'Đố bé Sonic, khối gỗ màu đỏ này là hình gì nè?',
    audioPromptEn: 'What shape is this red object?',
    praise: 'Đúng rồi! Đây là Hình Tròn tròn xoe không có góc!',
    praiseEn: 'Hooray! It is a Circle!'
  },
  {
    id: 'shape_square',
    audioKey: 'shape_square',
    image: '/images/shapes/square.jpg',
    question: 'Đố Sonic đây là hình gì nè?',
    questionEn: 'What shape is this?',
    correctAnswer: 'Hình Vuông',
    correctAnswerEn: 'Square',
    options: ['Hình Vuông', 'Hình Tròn', 'Hình Tam Giác'],
    optionsEn: ['Square', 'Circle', 'Triangle'],
    audioPrompt: 'Khối gỗ màu xanh này có bốn cạnh bằng nhau là hình gì nè?',
    audioPromptEn: 'What shape is this blue cube?',
    praise: 'Chính xác! Đây là Hình Vuông bốn cạnh đều nhau!',
    praiseEn: 'Awesome! It is a Square!'
  },
  {
    id: 'shape_triangle',
    audioKey: 'shape_triangle',
    image: '/images/shapes/triangle.jpg',
    question: 'Đố Sonic đây là hình gì nè?',
    questionEn: 'What shape is this?',
    correctAnswer: 'Hình Tam Giác',
    correctAnswerEn: 'Triangle',
    options: ['Hình Tam Giác', 'Hình Vuông', 'Hình Tròn'],
    optionsEn: ['Triangle', 'Square', 'Circle'],
    audioPrompt: 'Hình có ba góc nhọn như chiếc nón này là hình gì nè bé?',
    audioPromptEn: 'What shape has 3 corners?',
    praise: 'Tuyệt vời! Đây là Hình Tam Giác ba góc nhọn!',
    praiseEn: 'Spot on! It is a Triangle!'
  }
];

export const COLOR_QUIZZES = [
  {
    id: 'color_duck',
    audioKey: 'color_duck',
    image: '/images/animals/duck.jpg',
    question: 'Chú vịt con này có màu gì nè?',
    questionEn: 'What color is this duckling?',
    correctColorName: 'Màu Vàng',
    correctColorNameEn: 'Yellow',
    options: [
      { name: 'Màu Vàng', nameEn: 'Yellow', bg: '#facc15' },
      { name: 'Màu Đỏ', nameEn: 'Red', bg: '#ef4444' },
      { name: 'Màu Xanh Dương', nameEn: 'Blue', bg: '#3b82f6' }
    ],
    audioPrompt: 'Chú vịt con này có bộ lông màu gì vậy bé Sonic?',
    audioPromptEn: 'What color is this cute duckling?',
    praise: 'Đúng rồi! Chú vịt con có bộ lông Màu Vàng tươi!',
    praiseEn: 'Correct! The duck is Yellow!'
  },
  {
    id: 'color_apple',
    audioKey: 'color_apple',
    image: '/images/fruits/apple.jpg',
    question: 'Quả táo này có màu gì nè?',
    questionEn: 'What color is this apple?',
    correctColorName: 'Màu Đỏ',
    correctColorNameEn: 'Red',
    options: [
      { name: 'Màu Đỏ', nameEn: 'Red', bg: '#ef4444' },
      { name: 'Màu Vàng', nameEn: 'Yellow', bg: '#facc15' },
      { name: 'Màu Tím', nameEn: 'Purple', bg: '#a855f7' }
    ],
    audioPrompt: 'Quả táo này có màu gì đỏ mọng nè bé?',
    audioPromptEn: 'What color is this apple?',
    praise: 'Chính xác! Quả táo chín có Màu Đỏ rực rỡ!',
    praiseEn: 'Super! The apple is Red!'
  },
  {
    id: 'color_square',
    audioKey: 'color_square',
    image: '/images/shapes/square.jpg',
    question: 'Khối hình vuông này có màu gì nè?',
    questionEn: 'What color is this square block?',
    correctColorName: 'Màu Xanh Dương',
    correctColorNameEn: 'Blue',
    options: [
      { name: 'Màu Xanh Dương', nameEn: 'Blue', bg: '#3b82f6' },
      { name: 'Màu Đỏ', nameEn: 'Red', bg: '#ef4444' },
      { name: 'Màu Vàng', nameEn: 'Yellow', bg: '#facc15' }
    ],
    audioPrompt: 'Khối hình vuông này có màu gì nè bé Sonic?',
    audioPromptEn: 'What color is this block?',
    praise: 'Hoan hô! Khối vuông có Màu Xanh Dương tươi mát!',
    praiseEn: 'Great! The square is Blue!'
  },
  {
    id: 'color_grape',
    audioKey: 'color_grape',
    image: '/images/fruits/grape.jpg',
    question: 'Chùm nho này có màu gì nè?',
    questionEn: 'What color are these grapes?',
    correctColorName: 'Màu Tím',
    correctColorNameEn: 'Purple',
    options: [
      { name: 'Màu Tím', nameEn: 'Purple', bg: '#a855f7' },
      { name: 'Màu Vàng', nameEn: 'Yellow', bg: '#facc15' },
      { name: 'Màu Đỏ', nameEn: 'Red', bg: '#ef4444' }
    ],
    audioPrompt: 'Chùm nho này có màu gì ngọt lịm nè bé?',
    audioPromptEn: 'What color are the grapes?',
    praise: 'Đúng rồi! Chùm nho chín có Màu Tím đậm đà!',
    praiseEn: 'Hooray! The grapes are Purple!'
  }
];

export const VEHICLES_DATA = [
  {
    id: 'firetruck',
    name: 'Xe Cứu Hỏa',
    nameEn: 'Fire Truck',
    image: '/images/vehicles/firetruck.jpg',
    sfx: 'sfx_firetruck',
    voiceIntro: 'vehicle_firetruck',
    description: 'Chữa cháy dập lửa',
    descriptionEn: 'Fights fires',
    color: '#ef4444'
  },
  {
    id: 'police',
    name: 'Xe Cảnh Sát',
    nameEn: 'Police Car',
    image: '/images/vehicles/police_car.jpg',
    sfx: 'sfx_police',
    voiceIntro: 'vehicle_police',
    description: 'Tuần tra an toàn',
    descriptionEn: 'Keeps us safe',
    color: '#3b82f6'
  },
  {
    id: 'ambulance',
    name: 'Xe Cứu Thương',
    nameEn: 'Ambulance',
    image: '/images/vehicles/ambulance.jpg',
    sfx: 'sfx_ambulance',
    voiceIntro: 'vehicle_ambulance',
    description: 'Cấp cứu bệnh nhân',
    descriptionEn: 'Emergency care',
    color: '#dc2626'
  },
  {
    id: 'train',
    name: 'Tàu Hỏa',
    nameEn: 'Train',
    image: '/images/vehicles/train.jpg',
    sfx: 'sfx_train',
    voiceIntro: 'vehicle_train',
    description: 'Tu tu xình xịch',
    descriptionEn: 'Choo choo train',
    color: '#b91c1c'
  },
  {
    id: 'airplane',
    name: 'Máy Bay',
    nameEn: 'Airplane',
    image: '/images/vehicles/airplane.jpg',
    sfx: 'sfx_airplane',
    voiceIntro: 'vehicle_airplane',
    description: 'Bay trên bầu trời',
    descriptionEn: 'Flies high',
    color: '#0284c7'
  },
  {
    id: 'excavator',
    name: 'Máy Xúc',
    nameEn: 'Excavator',
    image: '/images/vehicles/excavator.jpg',
    sfx: 'sfx_excavator',
    voiceIntro: 'vehicle_excavator',
    description: 'Múc đất xây nhà',
    descriptionEn: 'Digs ground',
    color: '#eab308'
  }
];

export const VEHICLE_QUIZZES = [
  {
    id: 'quiz_vehicle_firetruck',
    correctVehicleId: 'firetruck',
    audioPromptKey: 'quiz_vehicle_firetruck',
    praiseKey: 'praise_firetruck',
    sfx: 'sfx_firetruck',
    question: 'U u u... Còi xe cứu hỏa màu đỏ chữa cháy ở đâu nè?',
    questionEn: 'Where is the red fire truck fighting fires?',
    options: ['firetruck', 'police', 'ambulance']
  },
  {
    id: 'quiz_vehicle_police',
    correctVehicleId: 'police',
    audioPromptKey: 'quiz_vehicle_police',
    praiseKey: 'praise_police',
    sfx: 'sfx_police',
    question: 'Pí po pí po! Xe cảnh sát bắt kẻ xấu đâu rồi Sonic ơi?',
    questionEn: 'Where is the police car with siren?',
    options: ['police', 'firetruck', 'train']
  },
  {
    id: 'quiz_vehicle_ambulance',
    correctVehicleId: 'ambulance',
    audioPromptKey: 'quiz_vehicle_ambulance',
    praiseKey: 'praise_ambulance',
    sfx: 'sfx_ambulance',
    question: 'E e e... Xe cứu thương chở bác sĩ ở đâu nè bé?',
    questionEn: 'Where is the emergency ambulance?',
    options: ['ambulance', 'police', 'excavator']
  },
  {
    id: 'quiz_vehicle_train',
    correctVehicleId: 'train',
    audioPromptKey: 'quiz_vehicle_train',
    praiseKey: 'praise_train',
    sfx: 'sfx_train',
    question: 'Tu tu xình xịch! Đoàn tàu hỏa dài thật dài đâu nè?',
    questionEn: 'Where is the choo-choo train?',
    options: ['train', 'airplane', 'firetruck']
  },
  {
    id: 'quiz_vehicle_airplane',
    correctVehicleId: 'airplane',
    audioPromptKey: 'quiz_vehicle_airplane',
    praiseKey: 'praise_airplane',
    sfx: 'sfx_airplane',
    question: 'Vù vù vù! Máy bay bay vút trên mây xanh đâu rồi ta?',
    questionEn: 'Where is the airplane flying high?',
    options: ['airplane', 'train', 'police']
  },
  {
    id: 'quiz_vehicle_excavator',
    correctVehicleId: 'excavator',
    audioPromptKey: 'quiz_vehicle_excavator',
    praiseKey: 'praise_excavator',
    sfx: 'sfx_excavator',
    question: 'Rầm rầm xình xịch! Máy xúc xúc đất công trường ở đâu nè?',
    questionEn: 'Where is the yellow excavator digging?',
    options: ['excavator', 'firetruck', 'ambulance']
  }
];

export const ANIMAL_SOUND_QUIZZES = [
  {
    id: 'sound_dog',
    correctAnimalId: 'dog',
    sfx: 'sfx_dog',
    audioPromptKey: 'quiz_sound_dog',
    praiseKey: 'praise_sound_dog',
    question: 'Gâu gâu gâu! Ai đang gọi bé Sonic đi chơi đấy nhỉ?',
    questionEn: 'Woof woof! Who is barking to play with Sonic?',
    options: [
      { id: 'dog', name: 'Bạn Cún', nameEn: 'Dog', image: '/images/animals/dog.jpg' },
      { id: 'cat', name: 'Bạn Mèo', nameEn: 'Cat', image: '/images/animals/cat.jpg' },
      { id: 'duck', name: 'Bạn Vịt', nameEn: 'Duck', image: '/images/animals/duck.jpg' }
    ]
  },
  {
    id: 'sound_cat',
    correctAnimalId: 'cat',
    sfx: 'sfx_cat',
    audioPromptKey: 'quiz_sound_cat',
    praiseKey: 'praise_sound_cat',
    question: 'Meo meo meo! Ai đang làm nũng đòi Sonic vuốt ve nè?',
    questionEn: 'Meow meow! Who wants a cuddle?',
    options: [
      { id: 'cat', name: 'Bạn Mèo', nameEn: 'Cat', image: '/images/animals/cat.jpg' },
      { id: 'rabbit', name: 'Bạn Thỏ', nameEn: 'Rabbit', image: '/images/animals/rabbit.jpg' },
      { id: 'dog', name: 'Bạn Cún', nameEn: 'Dog', image: '/images/animals/dog.jpg' }
    ]
  },
  {
    id: 'sound_duck',
    correctAnimalId: 'duck',
    sfx: 'sfx_duck',
    audioPromptKey: 'quiz_sound_duck',
    praiseKey: 'praise_sound_duck',
    question: 'Cạp cạp cạp! Ai đang bơi dưới nước tìm bé Sonic nè?',
    questionEn: 'Quack quack! Who is swimming in the pond?',
    options: [
      { id: 'duck', name: 'Bạn Vịt', nameEn: 'Duck', image: '/images/animals/duck.jpg' },
      { id: 'rooster', name: 'Chú Gà Trống', nameEn: 'Rooster', image: '/images/animals/rooster.jpg' },
      { id: 'cat', name: 'Bạn Mèo', nameEn: 'Cat', image: '/images/animals/cat.jpg' }
    ]
  },
  {
    id: 'sound_elephant',
    correctAnimalId: 'elephant',
    sfx: 'sfx_elephant',
    audioPromptKey: 'quiz_sound_elephant',
    praiseKey: 'praise_sound_elephant',
    question: 'Ò ó ooo! Chú voi con có chiếc vòi dài chào bé Sonic nè!',
    questionEn: 'Who has a long trunk? Meet the elephant!',
    options: [
      { id: 'elephant', name: 'Bạn Voi', nameEn: 'Elephant', image: '/images/animals/elephant.jpg' },
      { id: 'cow', name: 'Bạn Bò', nameEn: 'Cow', image: '/images/animals/cow.jpg' },
      { id: 'dog', name: 'Bạn Cún', nameEn: 'Dog', image: '/images/animals/dog.jpg' }
    ]
  },
  {
    id: 'sound_rooster',
    correctAnimalId: 'rooster',
    sfx: 'sfx_rooster',
    audioPromptKey: 'quiz_sound_rooster',
    praiseKey: 'praise_sound_rooster',
    question: 'Ò ó o o! Ai gáy vang gọi bé Sonic dậy tập thể dục nè?',
    questionEn: 'Cock-a-doodle-doo! Who wakes Sonic up in the morning?',
    options: [
      { id: 'rooster', name: 'Chú Gà Trống', nameEn: 'Rooster', image: '/images/animals/rooster.jpg' },
      { id: 'duck', name: 'Bạn Vịt', nameEn: 'Duck', image: '/images/animals/duck.jpg' },
      { id: 'cat', name: 'Bạn Mèo', nameEn: 'Cat', image: '/images/animals/cat.jpg' }
    ]
  },
  {
    id: 'sound_cow',
    correctAnimalId: 'cow',
    sfx: 'sfx_cow',
    audioPromptKey: 'quiz_sound_cow',
    praiseKey: 'praise_sound_cow',
    question: 'Ùm bò bò! Ai cho bé ly sữa thơm béo ngậy nè?',
    questionEn: 'Moo moo! Who gives yummy milk to Sonic?',
    options: [
      { id: 'cow', name: 'Bạn Bò Sữa', nameEn: 'Cow', image: '/images/animals/cow.jpg' },
      { id: 'elephant', name: 'Bạn Voi', nameEn: 'Elephant', image: '/images/animals/elephant.jpg' },
      { id: 'rabbit', name: 'Bạn Thỏ', nameEn: 'Rabbit', image: '/images/animals/rabbit.jpg' }
    ]
  }
];

