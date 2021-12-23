import React, {useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Creators } from '../redux';

interface AuthUser {
  username: string,
  email: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const money = useAppSelector((state) => state.loginReducer);
  
  const [userInfo, setUsetInfo] = useState<AuthUser>({} as AuthUser);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'username':
        setUsetInfo({
          ...userInfo,
          username: e.target.value
        });
        break;
      case 'email':
        setUsetInfo({
          ...userInfo,
          email: e.target.value
        });
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    dispatch(Creators.login({
      username: userInfo.username,
      email: userInfo.email
    }))
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="mb-3">
        <label  className="form-label">Name</label>
        <input type="text" className="form-control" value={userInfo?.username} placeholder="name" name="username" onChange={handleChangeInput} />
      </div>
      <div className="mb-3">
        <label  className="form-label">Email address</label>
        <input type="email" className="form-control" value={userInfo?.email} onChange={handleChangeInput} name="email" placeholder="name@example.com" />
      </div>
      <button type="submit" className="btn btn-primary" onClick={(e) => {
        e.preventDefault();
        handleLogin()
      }}>Login</button>

      <div> user name is {userInfo?.username}</div>

      {/* <p>{money}</p> */}
      <button onClick={()=> { dispatch(Creators.depoistAction({count: 1}))}}>Dem</button>
    </div>
  )
}

export default (Login);