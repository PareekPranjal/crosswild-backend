const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/**
 * Upload image to ImgBB
 * @param {string} imagePath - Path to the image file or base64 string
 * @param {string} imageType - 'file' or 'base64'
 * @returns {Promise<string>} - Returns the ImgBB image URL
 */
const uploadToImgBB = async (imageData, imageType = 'file') => {
  try {
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error('ImgBB API key not configured');
    }

    const formData = new FormData();

    if (imageType === 'file') {
      // Upload from file path
      formData.append('image', fs.createReadStream(imageData));
    } else {
      // Upload from base64
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      formData.append('image', base64Data);
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (response.data && response.data.success) {
      return response.data.data.url;
    } else {
      throw new Error('Failed to upload image to ImgBB');
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Upload image from URL
 * @param {string} imageUrl - Image URL
 * @returns {Promise<string>} - Returns the ImgBB image URL
 */
const uploadFromUrl = async (imageUrl) => {
  try {
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error('ImgBB API key not configured');
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      null,
      {
        params: {
          image: imageUrl,
        },
      }
    );

    if (response.data && response.data.success) {
      return response.data.data.url;
    } else {
      throw new Error('Failed to upload image to ImgBB');
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', error.message);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

module.exports = {
  uploadToImgBB,
  uploadFromUrl,
};
