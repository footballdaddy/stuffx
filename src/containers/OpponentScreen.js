import React, { Fragment } from 'react';
import { connect } from 'react-redux';

class OpponentPanel extends React.Component {
  render() {
    const { opponent } = this.props;

    return (
      <div className="opponent-battle-screen opponent">
        {opponent === 'none' ? (
          <Fragment>
            <div>None</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={`opponent-battle-image ${opponent.name}`} />

            <div>
              <p className="text-center">
                <span className="opponent-name">{opponent.name}</span>
                <div className="panel-bar health-bar">
                  <div
                    style={{
                      width: `${Math.floor(
                        100 - (opponent.currentHP / opponent.maxHP) * 100,
                      )}%`,
                    }}
                    className="damage"
                  />
                </div>
                <p>HP: {`${opponent.currentHP} / ${opponent.maxHP}`}</p>
              </p>
              <div className="effect-box">
                <p>
                  Current effects: {opponent.effects.length === 0 && 'none'}
                </p>
                {opponent.effects.map((effect, i) => (
                  <div key={i} className="flex-row">
                    <div className={`battle-effect effect-${effect.name}`} />

                    <p className="center">{`${effect.name}: ${
                      effect.duration
                    } turns`}</p>
                  </div>
                ))}
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
