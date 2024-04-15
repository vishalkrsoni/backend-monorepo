import jwt from 'jsonwebtoken';
import { getTimeInIST } from './timeHelper';

const { ACCESS_TOKEN_VALIDITY, REFRESH_TOKEN_VALIDITY, JWT_SECRET_KEY } =
  process.env;

const parseInputTimeValidity = (timeString: string): number => {
  // Extract the numeric value
  const value = parseInt(timeString.slice(0, -1));

  // Extracting the last character
  const unit = timeString.slice(-1);

  if (isNaN(value)) {
    throw new Error(`Given time unit is invalid : ${timeString}`);
  }

  switch (unit.toLowerCase()) {
    // Converting seconds to milliseconds
    case 's':
      return value * 1000;
    // Converting minutes to milliseconds
    case 'm':
      return value * 60 * 1000;
    // Converting hours to milliseconds
    case 'h':
      return value * 60 * 60 * 1000;
    // Converting days to milliseconds
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    // Converting weeks to milliseconds
    case 'w':
      return value * 7 * 24 * 60 * 60 * 1000;
    // Converting years to milliseconds
    case 'y':
      return value * 365 * 24 * 60 * 60 * 1000;
    // Converting months to milliseconds (considering 30 days)
    case 'mo':
      return value * 30 * 24 * 60 * 60 * 1000;
    default:
      throw new Error(`Given time format is invalid: ${timeString}`);
  }
};

export const generateAccessToken = (tokenData: object) => {
  const expiresIn = parseInputTimeValidity(ACCESS_TOKEN_VALIDITY);

  // Convert milliseconds to minutes
  const expirationMinutes = expiresIn / (60 * 1000);
  return {
    token: jwt.sign(
      {
        ...tokenData,
      },
      JWT_SECRET_KEY,
      {
        expiresIn,
      },
    ),
    expiresAt: getTimeInIST(new Date(Date.now() + expiresIn)),
    message: `Token will expire in ${expirationMinutes} minutes`,
  };
};

export const generateRefreshToken = (tokenData: object) => {
  const expiresIn = parseInputTimeValidity(REFRESH_TOKEN_VALIDITY);
  // Convert milliseconds to minutes
  const expirationMinutes = expiresIn / (60 * 1000);
  return {
    token: jwt.sign(
      {
        ...tokenData,
      },
      JWT_SECRET_KEY,
      {
        expiresIn,
      },
    ),
    expiresAt: getTimeInIST(new Date(Date.now() + expiresIn)),
    message: `Token will expire in ${expirationMinutes} minutes`,
  };
};
