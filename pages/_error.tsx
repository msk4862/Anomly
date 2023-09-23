import { NextApiResponse } from "next";

type ErrorProps = {
  statusCode: number;
};

type InitialErrorProps = {
  res: NextApiResponse;
  err: NextApiResponse;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }: InitialErrorProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
