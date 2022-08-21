import { clearAllDataWatcher } from './saga/logOut'
import { feedWatcher } from './saga/feed'
import { all } from 'redux-saga/effects'
import { promiseWatcher } from './saga/promise'
import { loginWatcher } from './saga/login'
import { registerWatcher } from './saga/register'
import {
  fullProfilePageWatcher,
  userUpdateWatcher,
  setAvatarWatcher,
} from './saga/myProfile'
import { fullPageAboutUserWatcher } from './saga/userProfile'
import { exploreWatcher } from './saga/explore'
import {
  addCommentFeedWatcher,
  addCommentOnePostWatcher,
  addSubCommentWatcher,
  getSubCommentWatcher,
  getSubCommentFeedWatcher,
  addSubCommentFeedWatcher
} from './saga/comment'
import { onePostWatcher, postsWatcher } from './saga/post'
import { changeLikePostWatcher, changeLikePostFeedWatcher } from './saga/like'
import { changeSubscribeWatcher } from './saga/subscribe'
import { editPostWatcher } from './saga/post'
function* rootSaga() {
  yield all([
    promiseWatcher(),
    fullProfilePageWatcher(),
    loginWatcher(),
    registerWatcher(),
    fullPageAboutUserWatcher(),
    feedWatcher(),
    exploreWatcher(),
    onePostWatcher(),
    addCommentOnePostWatcher(),
    changeLikePostWatcher(),
    editPostWatcher(),
    changeSubscribeWatcher(),
    userUpdateWatcher(),
    setAvatarWatcher(),
    clearAllDataWatcher(),
    postsWatcher(),
    addCommentFeedWatcher(),
    addSubCommentWatcher(),
    getSubCommentWatcher(),
    changeLikePostFeedWatcher(),
    getSubCommentFeedWatcher(),
    addSubCommentFeedWatcher()
  ])

}

export default rootSaga
