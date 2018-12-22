import {toastIt} from '../components/Toastr/toastr';

const reducer = ( state = {}, action) => {
  switch (action.type) {
    case 'get_user':
      const payload = JSON.parse(JSON.stringify(action.payload));
      return {...state, payload:payload, loading: false};
    case 'get_note_list':
      const noteList = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, noteList:noteList, loading: false};
    case 'get_note_detail':
      const noteDetail = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, noteDetail:noteDetail, loading: false};
    case 'do_login':
      const login = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, login:login, isLogin: !login.code, loading: false};
    case 'do_logout':
      return {...state, login:null, isLogin: false, loading: false};
    case 'do_uploadfile':
      const file = JSON.parse(JSON.stringify(action.payload.data));

      toastIt(file.msg)
      return {...state, file: file, loading: false};
    default:
      return state;
  }
}

export default reducer