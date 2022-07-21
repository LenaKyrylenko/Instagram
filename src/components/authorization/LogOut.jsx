import {
    actionClearDataLogoutTypeSaga,
} from '../../actions/typeSaga/logOutTypesSaga'
import { LogOut } from '../buttons/HeaderButtons'
import { connect } from 'react-redux'

export const CLogout = connect(null, {
    onClick: actionClearDataLogoutTypeSaga,
})(LogOut)
  