// Dependencies
import React, { Component } from 'react';
import Sound from 'react-sound';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// API
import * as story from './api/story';
import Choices from './api/Choices';
import quests from './api/quests'
// Components
import TitleScreen from './components/TitleScreen';
import ChoiceMenu from './components/ChoiceMenu';
import RenderFrame from './components/RenderFrame';
import MenuButtons from './components/MenuButtons';
import SaveLoadMenu from './components/SaveLoadMenu';
import Backlog from './components/Backlog';

// CSS
import './styles/App.css';
import './styles/TitleScreen.css';
import './styles/saveLoadMenu.css';
import './styles/effects.css';
import './styles/backlog.css';
// import './App1.css'
class App extends Component {
  /* ============================================================================================
       Diverges to different index depending on user's choice. Important function for VN writers
    ============================================================================================ */

  setFrameFromChoice(choice, jumpToBecauseChoice) {
    for (let i = 0; i < story[this.props.story.story].length; i++) {
      if (
        jumpToBecauseChoice === story[this.props.story.story][i].routeBegins
      ) {
        this.setFrame(i);
      }
    }

    let choicesStore = Object.assign({}, this.props.choicesStore);
    if (choicesStore[choice]) {
      choicesStore[choice]++;
    } else {
      choicesStore[choice] = 1;
    }
    this.props.setFrameFromChoice({ choicesStore });
  }

  setNextFrame() {
    const currentIndex = this.props.story.index;
    // Resume to title screen after testRoutes detours
    if (
      this.props.story.choicesStore.pickedObject === 1 &&
      story[this.props.story.story][currentIndex].jumpBecauseStoreTo ===
        'haveKey'
    ) {
      for (let i = 0; i < story[this.props.story.story].length; i++) {
        if (
          story[this.props.story.story][currentIndex].jumpBecauseStoreTo ===
          story[this.props.story.story][i].receiveJumpBecauseStore
        ) {
          this.setFrame(i);
        }
      }
    } else if (story[this.props.story.story][currentIndex].jumpTo) {
      // Jumps indexes normally
      // let storyVar = story[this.props.story.story];
      if (
        story[this.props.story.story][currentIndex].jumpTo === 'titleScreen'
      ) {
        if (!(this.props.story.completedStory[this.props.story.story] === true)) {
          this.props.setCompletedStory(this.props.story.story);
          this.props.addReward(quests[this.props.story.story].reward);
          console.log('hi');
        }
        this.props.setTitleScreen();
      } else if (story[this.props.story.story][currentIndex].jumpTo) {
        // Resumes to common route
        for (let i = 0; i < story[this.props.story.story].length; i++) {
          if (
            story[this.props.story.story][currentIndex].jumpTo ===
            story[this.props.story.story][i].receiveJump
          ) {
            this.setFrame(i);
          }
        }
      }
    } else if (
      !this.props.story.choicesExist &&
      !this.props.story.loadMenuShown &&
      !this.props.story.saveMenuShown &&
      !this.props.story.titleScreenShown &&
      !this.props.story.backlogShown
    ) {
      // Sets to frame one index higher
      this.setFrame(currentIndex + 1); // Normal functionality; goes to the next frame via index
    }
  }

  /* ===========================================================
       The rest are functionalities. VN writers can ignore rest
    =========================================================== */

  setFrame(index) {
    // Makes sure the index is within the story[this.props.story.story] array
    if (index >= story[this.props.story.story].length) {
      index = story[this.props.story.story].length - 1;
    } else if (index <= -1) {
      index = 0;
    }
    // Updates story[this.props.story.story] with new index
    this.props.setFrame(index);
  }

  // For developers to see what index they're editing. To request, set logIndex to true in story[this.props.story.story].js.
  componentDidMount() {
    for (var i = 0; i < story[this.props.story.story].length; i++) {
      if (story[this.props.story.story][i].logIndex) {
        console.log([i]);
      }
    }
  }

  renderFrame() {
    return (
      <RenderFrame
        setNextFrame={this.setNextFrame.bind(this)}
        bg={this.props.story.bg}
        bgGradient={this.props.story.bgGradient}
        sceneChange={this.props.story.sceneChange}
        sprite={this.props.story.sprite}
        spriteEffect={this.props.story.spriteEffect}
        speaker={this.props.story.speaker}
        text={this.props.story.text}
        textBoxShown={this.props.story.textBoxShown}
        index={this.props.story.index}
      />
    );
  }

  setNextChoice() {
    let choicesIndex = this.props.story.choicesIndex + 1;

    // Makes sure the index is within the Choices array
    if (choicesIndex >= Choices.length) {
      choicesIndex = Choices.length - 1;
    } else if (choicesIndex <= -1) {
      choicesIndex = 0;
    }

    this.props.setNextChoiceData(choicesIndex, Choices[choicesIndex].choices);
  }

  handleChoiceSelected(event) {
    this.stopSkip();
    this.setFrameFromChoice(event.currentTarget.name, event.currentTarget.id);
    this.setNextChoice();
  }
  renderChoiceMenu() {
    return (
      <ChoiceMenu
        choiceOptions={this.props.story.choiceOptions}
        onChoiceSelected={this.handleChoiceSelected.bind(this)}
      />
    );
  }

  toggleMenu() {
    this.props.toggleMenu();
  }

  toggleBacklog() {
    if (this.props.story.saveMenuShown) {
      this.props.toggleSaveMenuShown(false);
    }
    if (this.props.story.loadMenuShown) {
      this.props.toggleLoadMenuShown(false);
    }
    this.props.toggleBacklogShown(!this.props.story.backlogShown);
  }

  toggleTextBox() {
    this.props.toggleTextBox(!this.props.story.textBoxShown);
  }

  toggleSaveMenu() {
    if (this.props.story.loadMenuShown) {
      this.props.toggleLoadMenuShown(false);
    }
    if (this.props.story.backlogShown) {
      this.props.toggleBacklogShown(false);
    }
    this.props.toggleSaveMenuShown(!this.props.story.saveMenuShown);
  }

  toggleLoadMenu() {
    if (this.props.story.saveMenuShown) {
      this.props.story.toggleSaveMenuShown(false);
    }
    if (this.props.story.backlogShown) {
      this.props.toggleBacklogShown(false);
    }
    this.props.toggleLoadMenuShown(!this.props.story.loadMenuShown);
  }

  startSkip() {
    const intervalTime = prompt(
      'How many milliseconds per frame would you like?',
      '75',
    );
    if (intervalTime > 0) {
      this.props.toggleSkipping(true);
      this.textSkipper = setInterval(
        this.setNextFrame.bind(this),
        intervalTime,
      );
    }
  }

  stopSkip() {
    clearInterval(this.textSkipper);
    this.props.toggleSkipping(false);
  }

  // Saves and sets current state to local storage
  saveSlot(number) {
    localStorage.setItem('time' + number, new Date().toString()); // saves the current time to the save slot
    localStorage.setItem(
      number,
      JSON.stringify(this.state, (k, v) => (v === undefined ? null : v)),
    );
    this.setState(this.state);
  }

  // Loads and sets state from local storage
  loadSlot(number) {
    this.setState(JSON.parse(localStorage.getItem(number)));
    this.setState({
      saveMenuShown: false,
    }); // save menu to false and not load because save is true when saving
  }

  // "Begin" Button for title page.
  beginStory = (story) => {
    this.props.beginStory(story);
    this.setFrame(0);
    this.props.beginStory1(0, Choices[0].choices);
  }

  titleScreen() {
    return (
      <TitleScreen
        beginStory={this.beginStory}
        toggleLoadMenu={this.toggleLoadMenu.bind(this)}
      />
    );
  }

  saveMenu() {
    return (
      <SaveLoadMenu
        confirmationMessage="Overwrite save?"
        currentTime={this.props.story.currentTime}
        menuType="Save Menu"
        executeSlot={this.saveSlot.bind(this)}
        toggleMenu={this.toggleSaveMenu.bind(this)}
        speaker={this.props.story.speaker}
        text={this.props.story.text}
        textBoxShown={this.props.story.textBoxShown}
      />
    );
  }

  loadMenu() {
    return (
      <SaveLoadMenu
        confirmationMessage="Load save?"
        currentTime={this.props.story.currentTime}
        menuType="Load Menu"
        executeSlot={this.loadSlot.bind(this)}
        toggleMenu={this.toggleLoadMenu.bind(this)}
        speaker={this.props.story.speaker}
        text={this.props.story.text}
        textBoxShown={this.props.story.textBoxShown}
      />
    );
  }

  // the GUI interface on the bottom
  renderMenuButtons() {
    return (
      <MenuButtons
        menuButtonsShown={this.props.story.menuButtonsShown}
        toggleSaveMenu={this.toggleSaveMenu.bind(this)}
        toggleLoadMenu={this.toggleLoadMenu.bind(this)}
        saveSlot={this.saveSlot.bind(this)}
        loadSlot={this.loadSlot.bind(this)}
        saveMenuShown={this.props.story.saveMenuShown}
        loadMenuShown={this.props.story.loadMenuShown}
        toggleMenu={this.toggleMenu.bind(this)}
        toggleBacklog={this.toggleBacklog.bind(this)}
        toggleTextBox={this.toggleTextBox.bind(this)}
        startSkip={this.startSkip.bind(this)}
        stopSkip={this.stopSkip.bind(this)}
        isSkipping={this.props.story.isSkipping}
        textBoxShown={this.props.story.textBoxShown}
        backlogShown={this.props.story.backlogShown}
      />
    );
  }

  backlog() {
    return (
      <Backlog
        index={this.props.story.index}
        story={this.props.story.story}
        setChoice={this.setNextChoice.bind(this)}
        setFrame={this.setFrame.bind(this)}
        toggleBacklog={this.toggleBacklog.bind(this)}
        choicesStore={this.props.story.choicesStore}
        choicesHistory={this.props.story.choicesHistory}
        indexHistory={this.props.story.indexHistory}
        choicesIndexHistory={this.props.story.choicesIndexHistory}
        setIndexHistory={indexHistory =>
          this.props.setIndexHistory(indexHistory)
        }
        setChoicesHistory={choicesHistory =>
          this.props.setChoicesHistory(choicesHistory)
        }
        setChoicesStore={choicesStore =>
          this.props.setChoicesStore(choicesStore)
        }
      />
    );
  }

  playBGM() {
    return (
      <Sound
        url={this.props.story.bgm}
        playStatus={Sound.status.PLAYING}
        loop="true"
      />
    );
  }
  playSound() {
    return (
      <Sound url={this.props.story.sound} playStatus={Sound.status.PLAYING} />
    );
  }
  playVoice() {
    return (
      <Sound url={this.props.story.voice} playStatus={Sound.status.PLAYING} />
    );
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          className=""
          transitionName="menu"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.story.titleScreenShown ? this.titleScreen() : null}
          {this.props.story.frameIsRendering ? this.renderFrame() : null}
          {/* GUI menu buttons */}
          {this.props.story.backlogShown ? this.backlog() : null}
          {/* {this.props.story.frameIsRendering ? this.renderFrame() : null} */}
          {this.props.story.choicesExist ? this.renderChoiceMenu() : null}
        </ReactCSSTransitionGroup>
        {!this.props.story.titleScreenShown ? this.renderMenuButtons() : null}
        {this.playBGM()}
        {this.playSound()}
        {this.playVoice()}
      </div>
    );
  }
}

export default App;
