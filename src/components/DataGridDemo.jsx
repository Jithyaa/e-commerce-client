import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../utils/axios';
import { getProductStart, getProductSuccess, getProductFailure } from '../redux/produtRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';




export default function DataGridDemo({ products,setFetched }) {
  const columns = [
    { field: 'variantId', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'inStock',
      headerName: 'Stock',
      width: 100,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 130,
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 140,
      renderCell: (params) => (
        <>
          <div style={{ color: params.row.color, backgroundColor: params.row.color }}>
            .
          </div>
        </>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.row._id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.variantId)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(getProductStart());
      try {
        const res = await axios.get('/api/products');
        dispatch(getProductSuccess(res.data));
      } catch (err) {
        dispatch(getProductFailure());
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleEdit = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) {
      // history.push(`/addproduct/${selectedProduct._id}`, { product: selectedProduct });
    }
  };
  const handleDelete = async (id) => {
    console.log("iiiidddd",id)
    if (id) {
      try {
        let response = await axios.post('/products/deleteVariant',{id});
        if(response.data.success){
          setFetched(prev=>!prev);
        }
      } catch (err) {
        console.error('Failed to delete variant:', err);
      }
    } else {
      console.error('Cannot delete variant without id:', id);
    }
  };



  const rows = products.map(product => ({
    ...product,
    id: product.variantId,
  }));
  console.log(rows);

  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#f8f8f8' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
