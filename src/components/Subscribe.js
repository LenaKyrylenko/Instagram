import {
    actionFullUnSubscribe,
    actionFullSubscribe,
} from '../actions'
import { Button} from 'antd'
import { connect } from 'react-redux'
  
const Subscribe = ({
    my_Id,
    deleteSubscribe,
    aboutMeFollowing = [],
    addSubscribe,
    followId,
  }) => {
    const checkFollowId = aboutMeFollowing?.find(
      (follower) => follower?._id === followId,
    )?._id
    return (
      <>
        <div style={{ display: 'flex' }}>
          {checkFollowId ? (
            <Button
              size="large" type="primary"
               danger
              onClick={() => deleteSubscribe(my_Id, followId)}
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              size="large"
                type="primary"
                primary
              onClick={() => addSubscribe(my_Id, followId)}
            >
              Subscribe
            </Button>
          )}
        </div>
      </>
    )
}
export const CSubscribe = connect((state) => ({
    my_Id: state.auth?.payload?.sub?.id,
    aboutMeFollowing: state.myData?.aboutMe?.following,
    followId: state.userData?.aboutUser?._id,
}),
    {
        addSubscribe: actionFullSubscribe,
        deleteSubscribe: actionFullUnSubscribe,
}
)(Subscribe)