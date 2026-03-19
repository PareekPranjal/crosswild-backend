const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Generate a unique tracking code
 * Format: CW-{CATEGORY}-{TIMESTAMP_SHORT}-{RANDOM_4}
 * Example: CW-TSHIRTS-3A7F1K-X9D2
 */
const generateTrackingCode = (folder = 'general') => {
  const prefix = 'CW';
  const categoryPart = folder
    .replace('crosswild/', '')
    .replace(/\//g, '-')
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '')
    .substring(0, 12);
  const timePart = Date.now().toString(36).toUpperCase().slice(-6);
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${categoryPart}-${timePart}-${randomPart}`;
};

/**
 * Get Cloudinary folder path based on category
 * Maps product categories to organized folder structure
 */
const getCategoryFolder = (category) => {
  const folderMap = {
    // Product categories
    'tshirts': 'crosswild/products/tshirts',
    't-shirts': 'crosswild/products/tshirts',
    'bags': 'crosswild/products/bags',
    'caps': 'crosswild/products/caps',
    'sweatshirts': 'crosswild/products/sweatshirts-hoodies',
    'sweatshirts-hoodies': 'crosswild/products/sweatshirts-hoodies',
    'lower-shorts': 'crosswild/products/lower-shorts',
    'lowers': 'crosswild/products/lower-shorts',
    'school-office-uniform': 'crosswild/products/uniforms',
    'uniforms': 'crosswild/products/uniforms',
    'printing-embroidery': 'crosswild/products/printing-embroidery',
    'printing': 'crosswild/products/printing-embroidery',
    'apron': 'crosswild/products/apron',
    'chef-coat': 'crosswild/products/chef-coat',
    'raincoats': 'crosswild/products/raincoats',
    // Non-product categories
    'blogs': 'crosswild/blogs',
    'authors': 'crosswild/blogs/authors',
    'seo': 'crosswild/seo',
    'banners': 'crosswild/banners',
    'general': 'crosswild/general',
  };

  const key = (category || 'general').toLowerCase().trim();
  return folderMap[key] || `crosswild/products/${key}`;
};

/**
 * Upload image to Cloudinary with folder structure and tracking code
 * @param {string} imageData - File path or base64 data URI
 * @param {string} imageType - 'file' or 'base64'
 * @param {string} folder - Category or folder name
 * @returns {Promise<{url: string, trackingCode: string, publicId: string}>}
 */
const uploadToImgBB = async (imageData, imageType = 'file', folder = 'general') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary credentials not configured');
    }

    let uploadData = imageData;

    if (imageType === 'base64') {
      if (!imageData.startsWith('data:')) {
        uploadData = `data:image/png;base64,${imageData}`;
      }
    }

    const resolvedFolder = getCategoryFolder(folder);
    const trackingCode = generateTrackingCode(resolvedFolder);

    const result = await cloudinary.uploader.upload(uploadData, {
      folder: resolvedFolder,
      public_id: trackingCode,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      trackingCode,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Upload image from URL to Cloudinary
 * @param {string} imageUrl - External image URL
 * @param {string} folder - Category or folder name
 * @returns {Promise<{url: string, trackingCode: string, publicId: string}>}
 */
const uploadFromUrl = async (imageUrl, folder = 'general') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary credentials not configured');
    }

    const resolvedFolder = getCategoryFolder(folder);
    const trackingCode = generateTrackingCode(resolvedFolder);

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: resolvedFolder,
      public_id: trackingCode,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      trackingCode,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary by public_id or URL
 * @param {string} identifier - Cloudinary public_id or full URL
 */
const deleteImage = async (identifier) => {
  try {
    let publicId = identifier;

    // If it's a URL, extract the public_id
    if (identifier.startsWith('http')) {
      const urlParts = identifier.split('/');
      const uploadIndex = urlParts.indexOf('upload');
      if (uploadIndex === -1) return;
      const publicIdWithExt = urlParts.slice(uploadIndex + 2).join('/');
      publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
    }

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary Delete Error:', error.message);
  }
};

module.exports = {
  uploadToImgBB,
  uploadFromUrl,
  deleteImage,
  generateTrackingCode,
  getCategoryFolder,
  cloudinary,
};
