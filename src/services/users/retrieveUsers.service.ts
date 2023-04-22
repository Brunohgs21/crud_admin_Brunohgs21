import { QueryConfig } from "pg";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import { client } from "../../database";

const retrieveUsersService = async (userId: number): Promise<TUserResponse> => {
  // const userResponse = responseUserSchema.parse(user);
  const queryString = `
    SELECT
      "id",
      "name",
      "email",
      "admin",
      "active"
    FROM
      users
    WHERE
      id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default retrieveUsersService;
