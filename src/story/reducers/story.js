
import * as story from '../api/story'
const initialState = {
  choicesStore: {},
  choicesHistory: [],
  choicesIndexHistory: [],
  indexHistory: [],
  choiceOptions: [],
  index: 0,
  choicesExist: false,
  titleScreenShown: true,
  frameIsRendering: false,
  menuButtonsShown: true,
  backlogShown: false,
  textBoxShown: true,
  saveMenuShown: false,
  loadMenuShown: false,
  isSkipping: false,
  choicesIndex: 0,
  story: 'story0'
};

export const setFrameFromChoice = choicesStore => ({
  type: 'SET_FRAME_FROM_CHOICE',
  choicesStore,
});

export const setFrame = index => ({
  type: 'SET_FRAME',
  index,
});
export const setIndexHistory = index => ({
  type: 'SET_INDEX_HISTORY',
  index,
});
export const setChoicesHistory = index => ({
  type: 'SET_CHOICES_HISTORY',
  index,
});
export const setChoicesStore = index => ({
  type: 'SET_CHOICES_STORE',
  index,
});
export const setTitleScreen = index => ({
  type: 'SET_TITLESCREEN',
  index,
});
export const toggleMenu = () => ({
  type: 'TOGGLE_MENU',
});
export const toggleSkipping = value => ({
  type: 'TOGGLE_SKIPPING',
  value,
});
export const toggleSaveMenuShown = value => ({
  type: 'TOGGLE_SAVE_MENU_SHOWN',
  value,
});
export const toggleLoadMenuShown = value => ({
  type: 'TOGGLE_LOAD_MENU_SHOWN',
  value,
});
export const toggleBacklogShown = value => ({
  type: 'TOGGLE_BACKLOG_SHOWN',
  value,
});
export const toggleTextBox = value => ({
  type: 'TOGGLE_TEXT_BOX',
  value,
});

export const beginStory = () => ({
  type: 'BEGIN_STORY',
});
export const beginStory1 = (choicesIndex, choiceOptions) => ({
  type: 'BEGIN_STORY1',
  choicesIndex,
  choiceOptions,
});
export const setNextChoiceData = (choicesIndex, choiceOptions) => ({
  type: 'SET_NEXT_CHOICE_DATA',
  choicesIndex,
  choiceOptions,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FRAME':
      // Makes sure the index is within the novelFrames array
      return {
        ...state,
        index: action.index,
        text: story[state.story][action.index].text,
        bg: story[state.story][action.index].bg,
        bgm: story[state.story][action.index].bgm,
        choicesExist: story[state.story][action.index].choicesExist,
        sceneChange: story[state.story][action.index].sceneChange,
        sound: story[state.story][action.index].sound,
        speaker: story[state.story][action.index].speaker,
        sprite: story[state.story][action.index].sprite,
        spriteEffect: story[state.story][action.index].spriteEffect,
        voice: story[state.story][action.index].voice,
        indexHistory: [...state.indexHistory, action.index],
      };

    case 'SET_TITLESCREEN':
      return {
        ...initialState,
      };
    case 'BEGIN_STORY':
      return {
        ...state,
        isSkipping: false,
        titleScreenShown: false,
        frameIsRendering: true,
      };
    case 'SET_INDEX_HISTORY':
      return {
        ...state,
        indexHistory: action.index,
      };
    case 'SET_CHOICES_HISTORY':
      return {
        ...state,
        choicesHistory: action.index,
      };
    case 'SET_CHOICES_STORE':
      return {
        ...state,
        choicesStore: action.index,
      };

    case 'BEGIN_STORY1':
      return {
        ...state,
        choicesIndex: action.choicesIndex,
        choiceOptions: action.choiceOptions,
      };
    case 'SET_FRAME_FROM_CHOICE':
      return {
        ...state,
        choicesStore: action.choicesStore,
      };
    case 'SET_NEXT_CHOICE_DATA':
      return {
        ...state,
        choicesIndex: action.choicesIndex,
        choiceOptions: action.choiceOptions,
      };

    case 'TOGGLE_SKIPPING':
      return {
        ...state,
        isSkipping: action.value,
      };
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuButtonsShown: !state.menuButtonsShown,
      };
    case 'TOGGLE_TEXT_BOX':
      return {
        ...state,
        textBoxShown: action.value,
      };
    case 'TOGGLE_SAVE_MENU_SHOWN':
      return {
        ...state,
        saveMenuShown: action.value,
      };
    case 'TOGGLE_LOAD_MENU_SHOWN':
      return {
        ...state,
        loadMenuShown: action.value,
      };

    case 'TOGGLE_BACKLOG_SHOWN':
      return {
        ...state,
        backlogShown: action.value,
      };
    default:
      return state;
  }
};
