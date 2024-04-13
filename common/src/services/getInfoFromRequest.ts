import { Request as ExpressRequest, Response, NextFunction } from 'express';
import axios from 'axios';
import { logger } from '../store';

// Define custom types for request object with additional properties
export interface CustomRequest extends ExpressRequest {
  deviceInfo?: DeviceInfo;
  locationInfo?: LocationInfo;
}

export interface DeviceInfo {
  deviceType: string;
  osType?: string;
  osVersion?: string;
  browserType?: string;
  browserVersion?: string;
}

export interface LocationInfo {
  ipAddress: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

// Middleware to extract device information from the request
export const extractDeviceInfoMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userAgent = req.headers['user-agent'] || '';
  const deviceType = userAgent;

  // Attach device information to the request object
  req.deviceInfo = { deviceType };

  logger.info(`Device data from request:`, req.deviceInfo);
  next(); // Call the next middleware or route handler
};

async function getCurrentLocation() {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const { city, region, country, loc } = response.data;
    const [latitude, longitude] = loc.split(',');

    console.log('Your current location:');
    console.log(`City: ${city}`);
    console.log(`Region: ${region}`);
    console.log(`Country: ${country}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
  } catch (error) {
    console.error('Error fetching location:', error.message);
  }
}

// Middleware to extract location information from the request
export const extractLocationInfoMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const ipAddress = req.ip;

  try {
    const geolocationApiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=${ipAddress}`;
    const url = `http://ip-api.com/json/${ipAddress}`;

    const response = await axios.get('https://ipinfo.io/json');
    const { city, region, country, loc } = response.data;
    const [latitude, longitude] = loc.split(',');

    console.log('first', response.data);

    // Attach location information to the request object
    req.locationInfo = response.data

    logger.info(`Location data from request:`, req.locationInfo);
  } catch (error) {
    console.error('Error looking up location:', error);
    req.locationInfo = {
      ipAddress,
      country: 'Unknown',
      city: 'Unknown',
      latitude: 0,
      longitude: 0,
    };
  }

  next(); // Call the next middleware or route handler
};
