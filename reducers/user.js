import { produce } from 'immer';

export const initialState = {
  logInLoading: false, // 로그인
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그아웃
  logOutDone: false,
  logOutError: false,

  siginUpLoading: false, // 회원가입
  siginUpDone: false,
  siginUpError: false,

  changeNicknameLoading: false, // 닉네임
  changeNicknameDone: false,
  changeNicknameError: false,

  followLoading: false, // 팔로우
  followDone: false,
  followError: false,

  unfollowLoading: false, // 언팔로우
  unfollowDone: false,
  unfollowError: false,

  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

// dummy 데이터

const dummyUser = (data) => ({
  ...data,
  nickname: 'yngjnhyk(닉네임)',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'following1' }, { nickname: 'following2' }, { nickname: 'following3' }],
  Followers: [{ nickname: 'follower1' }, { nickname: 'follower2' }, { nickname: 'follower3' }],
});

// action creator

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST: // 팔로우
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST: // 언팔로우
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((i) => i.id !== action.data);
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case LOG_IN_REQUEST: // 로그인
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST: // 로그아웃
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST: // 회원가입
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = false;
        break;
      case SIGN_UP_SUCCESS:
        console.log('SIGN_UP_SUCCESS 실행');
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST: // 닉네임 변경
        console.log('CHANGE_NICKNAME_REQUEST 실행');
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        console.log('CHANGE_NICKNAME_SUCCESS 실행');
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME: // 게시글 추가
        draft.me = { ...state.me, Posts: [{ id: action.data }, ...state.me.Posts] };
        break;
      case REMOVE_POST_TO_ME: // 게시글 삭제
        draft.me = { ...state.me, Posts: state.me.Posts.filter((i) => i.id !== action.data) };
        break;
      default:
        return state;
    }
  });

export default reducer;
