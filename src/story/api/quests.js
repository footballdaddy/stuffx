const quests =


{
  'story0': {
    id: 0,
    title: 'The Beginning',
    reqs: { exp: 0 },
    reward: { gold: 200 }
  },
  'story1': {
    id: 1,
    title: 'The Second',
    reqs: { exp: 200 },
    reward: { gold: 200 }
  },
  'story2': {
    id: 2,
    title: 'The third',
    reqs: { exp: 200 },
    reward: { gold: 200 }
  },
}


// .filter((quest, index) => index < 4 && this.props.completedStory[quest] !== this.state.activeIndex === 1 ? true : false)

export default quests;
