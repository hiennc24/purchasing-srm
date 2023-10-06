import { apiPost } from './api/axios';

const apiUrl = 'https://filemanager.crmdemo.net';
const pathName = apiUrl + '/file';

export function uploadImage({ files }) {
  let formData = new FormData();
  formData.append('files', files);
  const url = pathName + '/upload/image';
  const response = apiPost(url, formData, true);
  return response;
}
