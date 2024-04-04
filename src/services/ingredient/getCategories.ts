// import API_PATH from "../../constants/path";
// import api from '../api';

// type CategoryProps = {
//   categories: CategoryInfoProps;
// }

// type CategoryInfoProps = {
//   id: number;
//   name: string;
// }

// async function getCategories(): Promise<CategoryProps | null> {
//   try {
//     const response = await api.get<CategoryProps>(API_PATH.INGREDIENT.CATEGORIES);
//     if (response.status !== 200) {
//       throw new Error(`${response.message}`);
//     }
//     console.log(response.message);
//     return response.body;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export default getCategories;

import dummy from './getCategories.json';

async function getCategories() {
  return dummy.body;
}

export default getCategories;
