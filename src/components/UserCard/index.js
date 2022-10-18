import './index.css'

export default function UserCard ({userInfo}) {
    console.log(userInfo)
    return (
        <div className="user-card-container">
            <img
                className="user-card-pic" 
                src={userInfo?.img}
                alt="Did not load"
            />
            <div className="user-card-info">
                <h3 className="name">{userInfo?.name}</h3>
                <small className="username">{userInfo?.username}</small>
                <p className="city"><b>City: </b>{userInfo?.city}</p>
                <p className="email"><b>Email: </b>{userInfo?.email}</p>
                <p className="cell"><b>Phone: </b>{userInfo?.phone}</p>
            </div>
        </div>
    )
}