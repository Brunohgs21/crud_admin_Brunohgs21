import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";

const reactivateUserService = async (
  userId: number
): Promise<TUserResponse> => {
  const queryString: string = `
                UPDATE users
                    SET "active" = true
                WHERE
                    id = $1
                RETURNING
                    "id", "name", "email", "admin", "active"
            `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  console.log(queryResult.rows[0]);

  return queryResult.rows[0];
};

export default reactivateUserService;
