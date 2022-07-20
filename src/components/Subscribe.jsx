import {
    actionFullUnSubscribe,
    actionFullSubscribe,
} from '../actions'
import {actionChangeSubscribeSaga} from '../redux/saga'
import { Button} from 'antd'
import { connect } from 'react-redux'
  
const Subscribe = ({
    myId,
    deleteSubscribe,
    aboutMeFollowing = [],
    changeSubscribe,
    followId,
  }) => {
    const checkFollowId = aboutMeFollowing?.find(
      (follower) => follower?._id === followId,
  )?._id
  console.log('check following in subscribe component', checkFollowId)
    return (
      <>
        <div style={{ display: 'flex' }} onClick={()=>changeSubscribe(followId,checkFollowId)}>
          {checkFollowId ?
          
            (
            <Button
              size="large" type="primary"
               danger
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              size="large"
                type="primary"
                primary
            >
              Subscribe
            </Button>
          )}
        </div>
      </>
    )
}
export const CSubscribe = connect((state) => ({
    myId: state.auth?.payload?.sub?.id,
    aboutMeFollowing: state.myData?.aboutMe?.following,
    followId: state.userData?.aboutUser?._id,
}),
    {
      changeSubscribe:actionChangeSubscribeSaga
  }
)(Subscribe)

export const CSubscribeLinkUser = connect((state) => ({
  myId: state.auth?.payload?.sub?.id,
  aboutMeFollowing: state.myData?.aboutMe?.following,
  // followId: state.userData?.aboutUser?._id,
}),
  {
    changeSubscribe:actionChangeSubscribeSaga
  }
)(Subscribe)