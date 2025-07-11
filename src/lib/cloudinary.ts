import * as cloudinaryModule from 'cloudinary'

const cloudinary = cloudinaryModule.v2

if (typeof cloudinary?.config === 'function') {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME || 'dic1gf7vt',
        api_key: process.env.CLOUDINARY_KEY || '243832386915582',
        api_secret: process.env.CLOUDINARY_SECRET || 'ihpVQv6i88W_hRM_IKkhp92Xm7Y',
        secure: true
    })
} else {
    console.warn('Cloudinary config is not a function. Skipping configuration.')
}

export { cloudinary }