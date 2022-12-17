/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    TITLE: process.env.TITLE,
    EMAIL: process.env.EMAIL,
    PHONE_NUMBER: process.env.PHONE_NUMBER,
  },
}
