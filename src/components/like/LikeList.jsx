import { LinkToUser } from '../LinkToUser'

const LikeList = ({ likes }) => {
    console.log('likes ', likes)
  return (
    <>
      <div className="Modal">
        {likes &&
          likes?.map(({ owner: { _id, login, avatar } }) => (
            <LinkToUser
              _id={_id}
              login={login}
              avatar={avatar}
              size={50}
              padding={'0px'}
            />
          ))}
      </div>
    </>
  )
}

export default LikeList
