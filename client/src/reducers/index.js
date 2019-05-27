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
      return {...state, file: file, noteList:action.payload.data.noteList ,loading: false};
    case 'get_md_detail':
      const mdDetail = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, mdDetail:mdDetail, loading: false};
    case 'save_md_detail':
      toastIt(action.payload.data.msg)
      return {...state, loading: false};
    case 'del_md_detail':
      toastIt(action.payload.data.msg);
      return {...state, noteList:action.payload.data.noteList ,loading: false};
    case 'get_mooc_list':
      const moocList = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, moocList:moocList, loading: false};
    case 'get_mooc_detail':
      const moocDetail = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, moocDetail:moocDetail, loading: false};
    case 'get_project_list':
      const projectList = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, projectList:projectList, loading: false};
    case 'get_project_detail':
      const projectDetail = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, projectDetail:projectDetail, loading: false};
    case 'get_ppt':
      const pptFile = JSON.parse(JSON.stringify(action.payload.data.file));
      return {...state, pptFile:pptFile, loading: false};
    case 'set_loading':
      return {...state, moocDetail:null, noteDetail:null,loading: true};
    case 'get_count':
      const count = JSON.parse(JSON.stringify(action.payload.data));
      return {...state, count:count, loading: false};
    default:
      return state;
  }
}

export default reducer