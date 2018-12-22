import axios from 'axios';
import conf from '../config';



export function fetchUser() {
  const response = axios.get(conf.host + 'getUser');
  return {
    type: 'get_user',
    payload: response
  }
}

export function fetchNoteList(id) {
  const response = axios.get(conf.host + 'getNoteList', {params:{id: id}});
  return {
    type: 'get_note_list',
    payload: response
  }
}

export function fetchNoteDetail(id,name) {
  const response = axios.get(conf.host + 'getNoteDetail', {params:{id: id, name:name}});
  return {
    type: 'get_note_detail',
    payload: response
  }
}

export function doLogin(usr,pwd) {
  const response = axios.get(conf.host + 'doLogin', {params:{usr:usr, pwd:pwd}});
  return {
    type: 'do_login',
    payload: response
  }
}

export function doLogout() {
  return {
    type: 'do_logout'
  }
}

export function uploadFile(file,id) {
  let config = { headers:{'Content-Type':'multipart/form-data'} };
  let formData = new FormData();
  formData.append('id',id);
  formData.append('file',file);
  
  const response = axios.post(conf.host + 'uploadFile', formData, config);
  return {
    type: 'do_uploadfile',
    payload: response
  }
}

