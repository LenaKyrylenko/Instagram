import { LinkToUser, LinkWithSubscribe } from '../LinkToUser'
import { CSubscribe } from '../Subscribe'

const LikeList = ({ likes, myId }) => {
    console.log('likes ', likes)
  return (
    <>
      <div className="Modal">
        {likes &&
          likes?.map(({ owner: { _id, login, avatar } }) => (
            <LinkWithSubscribe
              _id={_id}
              login={login}
              avatar={avatar}
              size={50}
                  padding={'0px'}
                  myId={myId}
              />
              
          ))}
            
      </div>
    </>
  )
}

export default LikeList
