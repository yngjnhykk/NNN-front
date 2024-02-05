import { Button } from 'antd';
import { Card, Avatar } from 'antd/dist/antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  console.log(me.nickname);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key='followings'>
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key='followers'>
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname}</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut} loading={logOutLoading} style={{ marginTop: '10px' }}>
        로그아웃
      </Button>
    </Card>
  );
}

export default UserProfile;
