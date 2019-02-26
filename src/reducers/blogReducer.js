const INITIAL_STATE = {
  blogPage: false,
}

const blogPage = (state, action) => {
  return {
    ...state,
    blogPage: action.status,
  }
}

function blogReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'BLOG_PAGE': {
      return blogPage(state, action)
    }
    default:
      return state
  }
}

export default blogReducer
