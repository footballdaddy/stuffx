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
    choicesExist: true,
  },
  {
    routeBegins: 'pickedUpObject',
    text: 'I bend down to pick up the object.',
  },
  {
    text: "It's a key.",
    jumpTo: 'objectChoice',
  },
  {
    routeBegins: 'objectIgnored',
    text: "I shouldn't do that.",
  },
  {
    text: 'It could be infected or a trap.',
    jumpTo: 'objectChoice',
  },
  {
    receiveJump: 'objectChoice',
    text: 'I walk ahead deeper into the dungeon and see a door ahead.',
  },
  {
    text:
      "I grab the handle and pull it, but it doesn't budge. It needs a key.",
    jumpBecauseStoreTo: 'haveKey',
  },
  {
    text: 'I try picking it, but nothing happens.',
  },
  {
    logIndex: true,
    sceneChange: true,
    jumpTo: 'titleScreen',
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
    logIndex: true,
    sceneChange: true,
    jumpTo: 'titleScreen',
  },
];
// BG
for (let i = 0; i < 9; i++) {
  story[i].bg = require('../bg/microphone.jpeg'); // source https://www.pexels.com/photo/blur-close-up-dark-focus-302655/
}

story[9].bg = require('../bg/microphone.jpeg');

for (let i = 10; i < 12; i++) {
  story[i].bg = require('../bg/microphone.jpeg'); // source https://www.pexels.com/photo/blur-close-up-dark-focus-302655/
}

story[12].bg = require('../bg/notBlockEnd.png');

// BGM
// ['head', 'hairfront', 'hairback', 'body', 'bodywear', 'arms', ]

export default story;
