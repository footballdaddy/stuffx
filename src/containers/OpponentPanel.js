import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class OpponentPanel extends React.Component {
  render() {
    const { opponent } = this.props;

    return (
      <div className="opponent-battle-screen">
        {opponent === 'none' ? (
          <Fragment>
            <div>None</div>
          </Fragment>
        ) : (
          <Fragment>
          <div className="hero-attributes">
            <div className="attr-pts">
              <p>Stats</p>
            </div>

            <div className="flex-row">
              <div className="panel-damage attr-pic" />
              <p>
                    Damage:<br />{' '}
                    {`${Math.round(opponent.damage[0])} - ${Math.round(
                      opponent.damage[1],
                    )}`}
                  </p>
                </div>
                <div className="flex-row">
                  <div className="panel-hit-chance attr-pic" />
                  <p>
                    Hit chance:<br /> {Math.round(opponent.hitChance * 100)}%
                  </p>
                </div>

                <div className="flex-row">
                  <div className="panel-armor attr-pic" />
                  <p>
                    Armor:<br /> {opponent.armor}
                  </p>
                </div>
                <div className="flex-row">
                  <div className="panel-block-chance attr-pic" />
                  <p>
                    Block chance:<br /> {Math.round(opponent.dodgeChance * 100)}%
                  </p>
                </div>
                <div className="flex-row">
                  <div className="panel-life-drain attr-pic" />
                  <p>
                    Life drain:<br /> {Math.round(opponent.lifeDrain * 100)}%
                  </p>
                </div>
                <div className="flex-row">
                  <div className="panel-life-drain attr-pic" />
                  <p>
                    Critical Chance:<br />{' '}
                    {Math.round(opponent.criticalChance * 100)}%
                  </p>
                </div>
                <div className="flex-row">
                  <div className="panel-xp attr-pic" />
                  <p>
                    Reward Exp:<br /> {opponent.reward.XP} <br />
                    Reward Gold:<br /> {opponent.reward.gold}
                  </p>
                </div>
              </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent.opponent,
});

export default connect(
  mapStateToProps,
  {},
)(OpponentPanel);
