import { LinkWithSubscribe } from '../LinkToUser'
const LikeList = ({ likes, myId }) => {
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
