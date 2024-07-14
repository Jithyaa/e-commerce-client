import React, { useState } from 'react';
import '../scss/styles/addproduct.scss';
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Box,
  Typography,
  Paper,
  Popover,
  FormHelperText,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { addProductStart, addProductSuccess, addProductFailure } from '../redux/produtRedux';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [product, setProduct] = useState({ title: '', desc: '', categories: 'women' });
  const [variants, setVariants] = useState([{ size: '', color: '#ffffff', price: '', inStock: 'true', img: null }]);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!product.title) newErrors.title = 'Title is required';
    if (!product.desc) newErrors.desc = 'Description is required';
    if (!product.categories) newErrors.categories = 'Category is required';

    variants.forEach((variant, index) => {
      if (!variant.size) newErrors[`size${index}`] = 'Size is required';
      if (!variant.color) newErrors[`color${index}`] = 'Color is required';
      if (!variant.price || variant.price <= 0) newErrors[`price${index}`] = 'Price must be a positive number';
      if (!variant.inStock) newErrors[`inStock${index}`] = 'Stock status is required';
      if (!variant.img) newErrors[`img${index}`] = 'Variant image is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
console.log("jimbum ba",variants)
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [name]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const handleColorChange = (color) => {
    const updatedVariants = variants.map((variant, i) =>
      i === currentColorIndex ? { ...variant, color: color.hex } : variant
    );
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: '', color: '#ffffff', price: '', inStock: 'true', img: null }]);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(addProductStart());
    try {
      let info = { ...product, variants: variants }

      const response = await axios.post('/products/createProduct', JSON.stringify(info), {
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if(response.data.success){
        navigate('/admin/product');
      }
    } catch (err) {
      dispatch(addProductFailure());
    }
  };

  const handleOpenColorPicker = (event, index) => {
    setColorPickerAnchor(event.currentTarget);
    setCurrentColorIndex(index);
  };

  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
    setCurrentColorIndex(null);
  };

  const handleVariantImageChange = async (index, e) => {
    let link;
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","ektlpubi");
    data.append("cloud_name","dkvlosdyw");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dkvlosdyw/image/upload", {
        method: "POST",
        body: data
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const imageData = await response.json();
      const link = imageData.url;
  
      const updatedVariants = [...variants];
      updatedVariants[index].img = link;
      setVariants(updatedVariants);
  
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error state or alert the user
    }

  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        New Product
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={product.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Description"
              name="desc"
              multiline
              rows={4}
              value={product.desc}
              onChange={handleChange}
              error={!!errors.desc}
              helperText={errors.desc}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth error={!!errors.categories}>
              <InputLabel>Categories</InputLabel>
              <Select
                name="categories"
                value={product.categories}
                onChange={handleChange}
              >
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="men">Men</MenuItem>
              </Select>
              {errors.categories && <FormHelperText>{errors.categories}</FormHelperText>}
            </FormControl>
          </Box>
          <Typography variant="h6" gutterBottom>
            Variants
          </Typography>
          {variants.map((variant, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <TextField
                label="Size"
                name="size"
                type="text"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                error={!!errors[`size${index}`]}
                helperText={errors[`size${index}`]}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="file"
                  id={`variantImage${index}`}
                  accept="image/*"
                  onChange={(e) => handleVariantImageChange(index, e)}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`variantImage${index}`}>
                  {variant.img ? (
                    <img src={variant.img} alt="Variant" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                  ) : (
                    <Button variant="outlined" component="span">
                      Add Variant Image
                    </Button>
                  )}
                </label>
                {errors[`img${index}`] && <FormHelperText error>{errors[`img${index}`]}</FormHelperText>}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={(e) => handleOpenColorPicker(e, index)}
                >
                  Choose Color
                </Button>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: variant.color,
                    border: '1px solid #000',
                    marginLeft: 1,
                  }}
                />
                {errors[`color${index}`] && <FormHelperText error>{errors[`color${index}`]}</FormHelperText>}
              </Box>
              <Popover
                open={Boolean(colorPickerAnchor) && currentColorIndex === index}
                anchorEl={colorPickerAnchor}
                onClose={handleCloseColorPicker}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <SketchPicker
                  color={variant.color}
                  onChangeComplete={handleColorChange}
                />
              </Popover>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, e)}
                error={!!errors[`price${index}`]}
                helperText={errors[`price${index}`]}
              />
              <FormControl sx={{ minWidth: 120 }} error={!!errors[`inStock${index}`]}>
                <InputLabel>In Stock</InputLabel>
                <Select
                  name="inStock"
                  value={variant.inStock}
                  onChange={(e) => handleVariantChange(index, e)}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
                {errors[`inStock${index}`] && <FormHelperText>{errors[`inStock${index}`]}</FormHelperText>}
              </FormControl>
              <IconButton onClick={() => handleRemoveVariant(index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={handleAddVariant}
          >
            Add Variant
          </Button>
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
