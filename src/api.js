/**
 * This file is used to define the API endpoints for the application.
 *
 * This will be a fake API, which will return the data from the local storage.
 *
 * Use the useApi hook to create the fake API object, passing the API tableName as the first argument.
 */

/**
 * @param {string} tableName
 *
 * @example
 *
 * export const UserList = () => {
 *   const usersApi = useApi('users');
 *
 *   const users = usersApi.getAll();
 *
 *   return (
 *     <div>
 *       {users.map(user => (
 *         <div key={user.id}>
 *           <h1>{user.name}</h1>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 */
export const useApi = (tableName) => {
  return {
    /**
     * @returns {object[]}
     * @example
     * const usersApi = useApi('users');
     * const users = usersApi.getAll();
     * console.log(users);
     * // Output: [{ id: '24530789', name: 'John Doe' }]
     */
    getAll: () => getFromLocalStorageDB(tableName) || [],
    /**
     * @param {string} id
     * @returns {object}
     * @example
     * const usersApi = useApi('users');
     * const user = usersApi.getById('24530789');
     * console.log(user);
     * // Output: { id: '24530789', name: 'John Doe' }
     */
    getById: (id) => {
      const data = getFromLocalStorageDB(tableName) || [];
      return data.find((d) => d.id === id);
    },
    /**
     * @param {object} data
     * @example
     * const usersApi = useApi('users');
     * const newId = usersApi.create({ name: 'John Doe' });
     * console.log(usersApi.getAll());
     * console.log(newId);
     * // Output: [{ id: '24530789', name: 'John Doe' }]
     * // Output: '24530789'
     */
    create: (data) => {
      const id = String(Math.floor(Math.random() * 100000000));
      const items = getFromLocalStorageDB(tableName) || [];
      items.push({ id, ...data });
      saveToLocalStorageDB(tableName, items);
      return id;
    },
    /**
     * @param {string} id
     * @param {object} data
     * @example
     * const usersApi = useApi('users');
     * usersApi.create('24530789', { name: 'John Doe' });
     * console.log(usersApi.getAll());
     * // Output: [{ id: '24530789', name: 'John Doe' }]
     * usersApi.update('24530789', { name: 'Jane Doe' });
     * console.log(usersApi.getAll());
     * // Output: [{ id: '24530789', name: 'Jane Doe' }]
     */
    update: (id, data) => {
      const items = getFromLocalStorageDB(tableName) || [];
      const index = items.findIndex((d) => d.id === id);
      items[index] = { id, ...data };
      saveToLocalStorageDB(tableName, items);
    },
    /**
     * @param {string} id
     * @example
     * const usersApi = useApi('users');
     * usersApi.create('24530789', { name: 'John Doe' });
     * console.log(usersApi.getAll());
     * // Output: [{ id: '24530789', name: 'John Doe' }]
     * usersApi.delete('24530789');
     * console.log(usersApi.getAll());
     * // Output: []
     */
    delete: (id) => {
      const items = getFromLocalStorageDB(tableName) || [];
      const newItems = items.filter((d) => d.id !== id);
      saveToLocalStorageDB(tableName, newItems);
    },
  };
};

/**
 * Example of a real API endpoint implementation
 */

// export const getAllUsers = () => {
//   return fetch("http://localhost:3001/users")
//     .then((res) => res.json())
//     .then((data) => data);
// };

// export const addUser = (user) => {
//   return fetch("http://localhost:3001/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((res) => res.json())
//     .then((data) => data);
// }

// export const updateUser = (user) => {
//   return fetch(`http://localhost:3001/users/${user.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((res) => res.json())
//     .then((data) => data);
// }

// export const deleteUser = (id) => {
//   return fetch(`http://localhost:3001/users/${id}`, {
//     method: "DELETE",
//   })
//     .then((res) => res.json())
//     .then((data) => data);
// }

// Local Storage Datebase functions
export const getFromLocalStorageDB = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveToLocalStorageDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// NOTE: Reset Local Storage from the console if needed
window.resetLocalStorage = () => {
  localStorage.clear();
};
