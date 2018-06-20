import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function RenderFrame(props) {
  return (
    <div onClick={props.setNextFrame}>
  <div className="container">
        <ReactCSSTransitionGroup
          component="div"
          transitionName={props.sceneChange ? 'scene' : 'sprite'}
          transitionEnterTimeout={props.sceneChange ? 2000 : 400}
          transitionLeaveTimeout={props.sceneChange ? 1700 : 300}
        >
          <img key={props.bg} className="bg" src={props.bg} />
          {props.bgGradient ? <div className={`bg-grad ${props.bgGradient}`} /> : ''}
          {props.sprite && props.sprite.length > 2 ? (
            // <div className="sprite-center">
            <div
              className={`sprite-center ${
                props.spriteEffect ? props.spriteEffect : ''
              }`}
            >
              <span className={`hairfront ${props.sprite[0]} sprites`} />
              <span className={`hairback ${props.sprite[1]} sprites`} />
              <span className={`face ${props.sprite[2]} sprites`} />
              <span className={`body ${props.sprite[3]} sprites`} />
              <span className={`bodydress ${props.sprite[4]} sprites`} />
              <span className={`arms ${props.sprite[5]} sprites`} />
              {/* <span className={`accessory1 ${props.sprite[6]} sprites`} /> */}
            </div>
          ) : (
            // </div>
            <img key={props.sprite} className="sprite" src={props.sprite} />
          )}
        </ReactCSSTransitionGroup>
          {props.text && props.textBoxShown ? (
            <div className="text-box">
              {props.speaker ? (
                <div className="speaker"> {props.speaker} </div>
              ) : null}
              <div className="text">
                {props.speaker ? '"' + props.text + '"' : props.text}
              </div>
            </div>
          ) : null}
        </div>
      </div>
  );
}

export default RenderFrame;
