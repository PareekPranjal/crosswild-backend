const ProductType = require('../models/ProductType');

// @desc    Get all product types
// @route   GET /api/product-types
// @access  Public
exports.getAllProductTypes = async (req, res) => {
  try {
    const { active } = req.query;
    const query = {};
    if (active === 'true') query.isActive = true;

    const productTypes = await ProductType.find(query).sort({ name: 1 }).lean();

    res.json({
      success: true,
      productTypes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product type
// @route   GET /api/product-types/:id
// @access  Public
exports.getProductType = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.id);

    if (!productType) {
      return res.status(404).json({ success: false, message: 'Product type not found' });
    }

    res.json({ success: true, productType });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product type
// @route   POST /api/product-types
// @access  Private/Admin
exports.createProductType = async (req, res) => {
  try {
    const { name, icon, description, detailFields, hasSizes, hasColors, customSizes } = req.body;

    // Auto-generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check for duplicate slug
    const existing = await ProductType.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A product type with this name already exists' });
    }

    const productType = await ProductType.create({
      name,
      slug,
      icon: icon || '📦',
      description: description || '',
      detailFields: detailFields || [],
      hasSizes: hasSizes !== undefined ? hasSizes : true,
      hasColors: hasColors !== undefined ? hasColors : true,
      customSizes: customSizes || [],
    });

    res.status(201).json({
      success: true,
      message: 'Product type created successfully',
      productType,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product type
// @route   PUT /api/product-types/:id
// @access  Private/Admin
exports.updateProductType = async (req, res) => {
  try {
    let productType = await ProductType.findById(req.params.id);

    if (!productType) {
      return res.status(404).json({ success: false, message: 'Product type not found' });
    }

    const updateData = req.body;

    // Regenerate slug if name changed
    if (updateData.name && updateData.name !== productType.name) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check for duplicate slug
      const existing = await ProductType.findOne({ slug: updateData.slug, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A product type with this name already exists' });
      }
    }

    productType = await ProductType.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product type updated successfully',
      productType,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product type
// @route   DELETE /api/product-types/:id
// @access  Private/Admin
exports.deleteProductType = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.id);

    if (!productType) {
      return res.status(404).json({ success: false, message: 'Product type not found' });
    }

    await productType.deleteOne();

    res.json({
      success: true,
      message: 'Product type deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed default product types
// @route   POST /api/product-types/seed
// @access  Private/Admin
exports.seedProductTypes = async (req, res) => {
  try {
    const existingCount = await ProductType.countDocuments();
    if (existingCount > 0) {
      return res.json({ success: true, message: 'Product types already seeded', count: existingCount });
    }

    const defaultTypes = [
      {
        name: 'T-Shirts',
        slug: 't-shirts',
        icon: '👕',
        description: 'Custom printed t-shirts',
        hasSizes: true,
        hasColors: true,
        detailFields: [
          { fieldName: 'Fabric', fieldType: 'select', options: ['Cotton', 'Polyester', 'Cotton-Poly Blend', 'Tri-Blend'], required: false },
          { fieldName: 'Sleeve Type', fieldType: 'select', options: ['Half Sleeve', 'Full Sleeve', 'Sleeveless'], required: false },
          { fieldName: 'Fit', fieldType: 'select', options: ['Regular', 'Slim', 'Oversized', 'Relaxed'], required: false },
          { fieldName: 'GSM', fieldType: 'text', required: false, placeholder: 'e.g., 180 GSM' },
          { fieldName: 'Neck Type', fieldType: 'select', options: ['Round Neck', 'V-Neck', 'Polo', 'Collar'], required: false },
        ],
      },
      {
        name: 'Sweatshirts',
        slug: 'sweatshirts',
        icon: '🧥',
        description: 'Custom hoodies and sweatshirts',
        hasSizes: true,
        hasColors: true,
        detailFields: [
          { fieldName: 'Fabric', fieldType: 'select', options: ['Fleece', 'French Terry', 'Cotton Blend'], required: false },
          { fieldName: 'Type', fieldType: 'select', options: ['Hoodie', 'Crew Neck', 'Zip-Up', 'Pullover'], required: false },
          { fieldName: 'GSM', fieldType: 'text', required: false, placeholder: 'e.g., 300 GSM' },
        ],
      },
      {
        name: 'Caps',
        slug: 'caps',
        icon: '🧢',
        description: 'Custom printed caps and hats',
        hasSizes: false,
        hasColors: true,
        detailFields: [
          { fieldName: 'Style', fieldType: 'select', options: ['Baseball Cap', 'Snapback', 'Trucker', 'Bucket Hat', 'Beanie'], required: false },
          { fieldName: 'Material', fieldType: 'select', options: ['Cotton', 'Polyester', 'Mesh', 'Wool'], required: false },
          { fieldName: 'Closure', fieldType: 'select', options: ['Adjustable', 'Snapback', 'Fitted', 'Velcro'], required: false },
        ],
      },
      {
        name: 'Bags',
        slug: 'bags',
        icon: '🎒',
        description: 'Custom bags and totes',
        hasSizes: false,
        hasColors: true,
        detailFields: [
          { fieldName: 'Type', fieldType: 'select', options: ['Tote Bag', 'Backpack', 'Duffle Bag', 'Sling Bag', 'Laptop Bag', 'Drawstring Bag'], required: false },
          { fieldName: 'Material', fieldType: 'select', options: ['Canvas', 'Polyester', 'Cotton', 'Nylon', 'Jute'], required: false },
          { fieldName: 'Capacity', fieldType: 'text', required: false, placeholder: 'e.g., 20 Liters' },
        ],
      },
      {
        name: 'Mugs',
        slug: 'mugs',
        icon: '☕',
        description: 'Custom printed mugs and drinkware',
        hasSizes: false,
        hasColors: true,
        detailFields: [
          { fieldName: 'Type', fieldType: 'select', options: ['Ceramic Mug', 'Travel Mug', 'Magic Mug', 'Steel Mug', 'Sipper'], required: false },
          { fieldName: 'Capacity', fieldType: 'select', options: ['250ml', '330ml', '400ml', '500ml'], required: false },
          { fieldName: 'Dishwasher Safe', fieldType: 'boolean', required: false },
        ],
      },
      {
        name: 'Business Cards',
        slug: 'cards',
        icon: '💳',
        description: 'Custom business cards',
        hasSizes: false,
        hasColors: false,
        detailFields: [
          { fieldName: 'Paper Type', fieldType: 'select', options: ['Matte', 'Glossy', 'Textured', 'Recycled'], required: false },
          { fieldName: 'Thickness', fieldType: 'select', options: ['300 GSM', '350 GSM', '400 GSM'], required: false },
          { fieldName: 'Finish', fieldType: 'select', options: ['Standard', 'Laminated', 'Spot UV', 'Embossed'], required: false },
          { fieldName: 'Shape', fieldType: 'select', options: ['Standard', 'Rounded Corners', 'Square', 'Die-Cut'], required: false },
        ],
      },
      {
        name: 'Printing',
        slug: 'printing',
        icon: '🖨️',
        description: 'Flyers, brochures, posters',
        hasSizes: false,
        hasColors: false,
        detailFields: [
          { fieldName: 'Print Type', fieldType: 'select', options: ['Flyer', 'Brochure', 'Poster', 'Banner', 'Pamphlet'], required: false },
          { fieldName: 'Paper Size', fieldType: 'select', options: ['A3', 'A4', 'A5', 'A6', 'Custom'], required: false },
          { fieldName: 'Paper Type', fieldType: 'select', options: ['Matte', 'Glossy', 'Art Paper', 'Bond Paper'], required: false },
          { fieldName: 'Sides', fieldType: 'select', options: ['Single Side', 'Both Sides'], required: false },
        ],
      },
      {
        name: 'Uniforms',
        slug: 'uniforms',
        icon: '👔',
        description: 'School, staff, and sports uniforms',
        hasSizes: true,
        hasColors: true,
        detailFields: [
          { fieldName: 'Uniform Type', fieldType: 'select', options: ['School Uniform', 'Staff Uniform', 'Sports Uniform', 'Corporate'], required: false },
          { fieldName: 'Fabric', fieldType: 'select', options: ['Cotton', 'Polyester', 'Cotton-Poly Blend', 'Linen'], required: false },
          { fieldName: 'Includes', fieldType: 'multiselect', options: ['Shirt', 'Pants', 'Skirt', 'Tie', 'Belt', 'Badge'], required: false },
        ],
      },
      {
        name: 'Gifts',
        slug: 'gifts',
        icon: '🎁',
        description: 'Custom gifts and promotional items',
        hasSizes: false,
        hasColors: true,
        detailFields: [
          { fieldName: 'Gift Type', fieldType: 'select', options: ['Photo Frame', 'Keychain', 'Mouse Pad', 'Phone Case', 'Pillow', 'Calendar', 'Other'], required: false },
          { fieldName: 'Material', fieldType: 'text', required: false, placeholder: 'e.g., Acrylic, Wood, Metal' },
        ],
      },
      {
        name: 'Track Suits',
        slug: 'track-suits',
        icon: '🏃',
        description: 'Custom track suits and sportswear',
        hasSizes: true,
        hasColors: true,
        detailFields: [
          { fieldName: 'Fabric', fieldType: 'select', options: ['Polyester', 'Micro Polyester', 'Dry-Fit', 'Cotton Blend'], required: false },
          { fieldName: 'Type', fieldType: 'select', options: ['Full Set', 'Jacket Only', 'Pants Only'], required: false },
          { fieldName: 'Fit', fieldType: 'select', options: ['Regular', 'Slim', 'Relaxed'], required: false },
        ],
      },
      {
        name: 'Bottles',
        slug: 'bottles',
        icon: '🍶',
        description: 'Custom printed bottles and sippers',
        hasSizes: false,
        hasColors: true,
        detailFields: [
          { fieldName: 'Material', fieldType: 'select', options: ['Stainless Steel', 'Plastic', 'Glass', 'Copper'], required: false },
          { fieldName: 'Capacity', fieldType: 'select', options: ['350ml', '500ml', '750ml', '1000ml'], required: false },
          { fieldName: 'Type', fieldType: 'select', options: ['Sipper', 'Flask', 'Sports Bottle', 'Thermos'], required: false },
          { fieldName: 'Insulated', fieldType: 'boolean', required: false },
        ],
      },
      {
        name: 'Logos',
        slug: 'logos',
        icon: '🎨',
        description: 'Custom logo design and branding',
        hasSizes: false,
        hasColors: false,
        detailFields: [
          { fieldName: 'Service Type', fieldType: 'select', options: ['Logo Design', 'Logo Revamp', 'Brand Identity', 'Monogram'], required: false },
          { fieldName: 'File Formats', fieldType: 'multiselect', options: ['PNG', 'SVG', 'PDF', 'AI', 'EPS', 'JPG'], required: false },
          { fieldName: 'Revisions', fieldType: 'select', options: ['2 Revisions', '5 Revisions', 'Unlimited'], required: false },
        ],
      },
    ];

    const created = await ProductType.insertMany(defaultTypes);

    res.status(201).json({
      success: true,
      message: `${created.length} product types seeded successfully`,
      productTypes: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
