const { User } = require('../../../models');

async function getUsersPaginated(page_number, page_size, filter, sortOptions) {
  let skip = 0;
  let limit = 0;

  if (page_number) {
    page_number = parseInt(page_number);
    if (isNaN(page_number) || page_number < 1) {
      throw new Error('Invalid page_number value');
    }
    skip = (page_number - 1) * (page_size || 0);
  }

  if (page_size) {
    page_size = parseInt(page_size);
    if (isNaN(page_size) || page_size < 1) {
      throw new Error('Invalid page_size value');
    }
    limit = page_size;
  }

  const usersQuery = User.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const userMapping = await usersQuery.exec();

  let userFormatted = userMapping.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  const countQuery = User.countDocuments(filter);

  let [users, count] = await Promise.all([userFormatted, countQuery]);

  const total_pages = page_size ? Math.ceil(count / page_size) : 1;
  const has_previous_page = page_number && page_number > 1;
  const has_next_page = page_number && skip + limit < count;

  return {
    users,
    count,
    total_pages,
    has_previous_page,
    has_next_page,
  };
}

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsersPaginated,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
