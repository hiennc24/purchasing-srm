import {apiGet} from "services/api/axios";
const listPersons = async (params) => {
  const response = await apiGet('/users', {params});
  return response || [];
};

export default { listPersons };
