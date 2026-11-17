import { submitEnquiry } from '../../worker/index.js';

// Contact form endpoint, reusing the existing enquiry logic from worker/index.js.
export default async (request) => {
  const response = await submitEnquiry(request);
  response.headers.set('Cache-Control', 'no-store');
  return response;
};

export const config = { path: '/api/enquiry' };
