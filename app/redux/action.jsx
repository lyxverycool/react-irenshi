import fetch from 'isomorphic-fetch'
const counterAction={};//定义计数的动作(同步操作)
//const fetchAction={};//定义获取数据的动作(异步操作)

counterAction.increaseAction = { type: 'increase' };
counterAction.decreaseAction= { type: 'decrease'}

const RECEIVE_POSTS = 'RECEIVE_POSTS'

//获取新闻成功的action
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child =>child.data)
  }
}

function fetchPosts(subreddit) {
  return function (dispatch) {
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      )
  }
}

//如果需要则开始获取文章
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(subreddit))
    }
}



export {counterAction,RECEIVE_POSTS};