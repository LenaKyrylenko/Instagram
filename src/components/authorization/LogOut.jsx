import {
    actionClearDataLogoutTypeSaga,
} from '../../redux/saga'
import { LogOut } from '../HeaderButtons'
import { connect } from 'react-redux'

export const CLogout = connect(null, {
    onClick: actionClearDataLogoutTypeSaga,
  })(LogOut)