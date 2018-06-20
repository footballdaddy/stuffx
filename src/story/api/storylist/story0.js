const b = 'Block';
const bn = 'https://i.imgur.com/hRqbUnd.png';

let story = [
  {
    speaker: b,
    sprite: [
      'layana-hairfront',
      'layana-hairback',
      'layana-face',
      'layana-body',
      'layana-bodydress',
      'layana-arms-down',
    ],
    spriteEffect: "shake",
    // sprite: bn,
    text: "So we will keep track of the player's choices.",
  },
  {
    speaker: b,
    sprite: [
      'layana-hairfront',
      'layana-hairback',
      'layana-face',
      'layana-body',
      'layana-bodydress',
      'layana-arms-down',
    ],
    spriteEffect: "shake",
    // sprite: bn,
    text: " we will keep track of the player's choices.",
  },
  {
    speaker: b,
    sprite: [
      'layana-hairfront',
      'layana-hairback',
      'layana-face',
      'layana-body',
      'layana-bodydress',
      'layana-arms-down',
    ],
    spriteEffect: "shake",
    // sprite: bn,
    text: " will keep track of the player's choices.",
  },
  {
    text: 'I try picking it, but nothing happens.',
    sceneChange: true,
    jumpTo: 'titleScreen',

  },
  {
    bg: require('../bg/microphone.jpeg'),

    logIndex: true,
  },
  // Jumps to below if the user picks up the key
  {
    receiveJumpBecauseStore: 'haveKey',
    sound: require('../sounds/thump.mp3'),
    text: 'I take out the key from my pocket and insert it into the lock.',
  },
  {
    text: 'The door opens.',
  },
  {
    bg: require('../bg/microphone.jpeg'),
    sceneChange: true,
    jumpTo: 'titleScreen',
  },
];
// BG

// for (let i = 10; i < 12; i++) {
//   story[i].bg = require('../bg/microphone.jpeg'); // source https://www.pexels.com/photo/blur-close-up-dark-focus-302655/
// }


// BGM
// ['head', 'hairfront', 'hairback', 'body', 'bodywear', 'arms', ]

export default story;
