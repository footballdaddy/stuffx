import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Console extends Component {
  render() {
    const {logs} = this.props;
    return (
      <div className="flex-container-wrap">
      <div className="console-container">
        <div className="flex-row align-center battle-log-header">
          <div className="log-icon" />
          <p className="font-medium">Battle log</p>
        </div>
        <div className="console">
          {logs.map((log, i) => (
            <p
            key={i}
            className={log[0] === 'player' ? 'player-log' : 'opponent-log'}
            >
              {log[1]}
            </p>
          ))}
        </div>
      </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.logs.logs,
});

export default connect(
  mapStateToProps,
  {},
)(Console);
