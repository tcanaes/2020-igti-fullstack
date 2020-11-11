import http from '../http-common';

const getAll = () => {
  return http.get('/grade');
};

const get = (id) => {
  const url = `/grade/${id}`;
  console.log('get: ', url);
  return http.get(url);
  
  // const result = http.get(`/grade/${id}`);
  // console.log(result);
  // return result;
};

const create = (data) => {
  return http.post('/grade', data);
};

const update = (id, data) => {
  return http.put(`/grade/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/grade/${id}`);
};

const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  return http.get(`/grade?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
