import { promiseWorker } from '../promise'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import {
  actionProfilePageDataType,
  actionUpdateAvatarType,
} from '../../../actions/types/myDataTypes'
import {
  actionAboutMe,
  actionUserUpsert,
  actionAvatar,
  actionGetAvatar,
} from '../../../actions/query/aboutMeQuery'
import { fullPageAboutUserWorker } from '../userProfile'
export function* fullProfilePageWorker() {
  const { auth } = yield select()
  if (auth?.payload?.sub?.id) {
    const aboutMe = yield call(
      promiseWorker,
      actionAboutMe(auth?.payload?.sub.id),
    )
    if (aboutMe) {
      yield put(actionProfilePageDataType(aboutMe))
    }
  }
}
export function* fullProfilePageWatcher() {
  yield takeEvery('FULLPROFILE_PAGE', fullProfilePageWorker)
}

function* userUpdateWorker({ user }) {
  const {
    myData: {
      aboutMe: { _id },
    },
  } = yield select()
  const userUpsert = yield call(promiseWorker, actionUserUpsert(user, _id))
  if (userUpsert) {
    yield call(fullPageAboutUserWorker, { _id })
    yield call(fullProfilePageWorker)
  }
}
export function* userUpdateWatcher() {
  yield takeEvery('USER_UPDATE', userUpdateWorker)
}

function* setAvatarWorker({ file }) {
  const {
    myData: {
      aboutMe: { _id },
    },
  } = yield select()
  const setAvatar = yield call(promiseWorker, actionAvatar(file, _id))
  const { avatar } = yield call(promiseWorker, actionGetAvatar(_id))
  if (setAvatar) {
    yield call(fullPageAboutUserWorker, { _id })
    yield put(actionUpdateAvatarType(avatar))
  }
}

export function* setAvatarWatcher() {
  yield takeEvery('SET_AVATAR', setAvatarWorker)
}
