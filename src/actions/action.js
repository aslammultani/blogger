import * as actionTypes from '../constants/constant'

export function setAuthUser(user) {
  return {
    type: actionTypes.AUTH_USER_SET,
    user,
  }
}

export function clickedOnBlog(status) {
  return {
    type: actionTypes.BLOG_PAGE,
    status,
  }
}
