import React, { Component } from 'react';
import quests from '../api/quests';
import { connect } from 'react-redux';
import { Tab, Button } from 'semantic-ui-react';

class TitleScreen extends Component {
  handleButton = (reqs, story) => {
    return (
      this.props.exp >= reqs ?
      <Button onClick={() => this.props.beginStory(story)}>Start</Button>
      :
      <Button onClick={() => this.props.beginStory(story)} disabled>Reqs Not Met</Button>
    )

  };

  handleItems = () =>
    Object.keys(quests)
      .filter(
        (quest, index) =>
          index < 4 && this.props.completedStory[quest] !== true,
      )
      .map(item => {
        return (
          <article key={quests[item].id} className="card">
            <div className="text">
              <h2>
                Memory {quests[item].id}: {quests[item].title}
              </h2>
              <p>
                Requirements: <span>{quests[item].reqs.exp} XP</span>
              </p>

              <p>
                Rewards: <span>???</span>
                {console.log([item])}
              </p>
              {this.handleButton(quests[item].reqs.exp, [item])}

            </div>
          </article>
        );
      });
  handleItemsFinished = () =>
    Object.keys(quests)
      .filter(
        (quest, index) =>
          index < 2 && this.props.completedStory[quest] !== false,
      )
      .map(item => {
        return (
          <article key={quests[item].id} className="card">
            <div className="text">
              <h2>
                Memory {quests[item].id}: {quests[item].title}
              </h2>
              <p>
                Requirements: <span>{quests[item].reqs.exp}</span>
              </p>

              <p>
                Rewarded:{' '}
                <span>
                  {' '}
                  {this.props.completedStory[item] === true ? (
                    <span>{quests[item].reward.gold}</span>
                  ) : (
                    <span>???</span>
                  )}
                </span>
              </p>
              {/* <button onClick={this.props.beginStory}>Relive </button> */}
            </div>
          </article>
        );
      });
  render() {
    return (
      <div>
        <Tab
          panes={[
            {
              menuItem: 'Locked Memories',
              render: () => <Tab.Pane>{this.handleItems()}</Tab.Pane>,
            },
            {
              menuItem: 'Recovered Memories',
              render: () => <Tab.Pane>{this.handleItemsFinished()}</Tab.Pane>,
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  completedStory: state.story.completedStory,
  exp: state.playerstats.exp,
});

export default connect(
  mapStateToProps,
  {},
)(TitleScreen);
