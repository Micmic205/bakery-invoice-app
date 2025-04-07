import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ItemList = ({ items, onItemsChange, isEnglish }) => {
  const categories = [
    { en: 'Cake Course', zh: '蛋糕課程' },
    { en: 'Cookie Course', zh: '曲奇課程' },
    { en: 'Holiday Special Course', zh: '節日限定課程' },
    { en: 'Cookie Order', zh: '曲奇訂製' },
    { en: 'Others', zh: '其他' }
  ];

  const handleAddItem = () => {
    onItemsChange([
      ...items,
      { name: '', category: '', quantity: 1, price: 0 }
    ]);
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleItemChange = (index, field) => (event) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'price' 
        ? Number(event.target.value)
        : event.target.value
    };
    onItemsChange(newItems);
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#8B7355' }}>
          {isEnglish ? "Items List" : "商品列表"}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddItem}
          variant="contained"
          sx={{ backgroundColor: '#8B7355', '&:hover': { backgroundColor: '#6B5335' } }}
        >
          {isEnglish ? "Add Item" : "新增項目"}
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>{isEnglish ? "Description" : "項目"}</TableCell>
              <TableCell>{isEnglish ? "Category" : "類別"}</TableCell>
              <TableCell align="right">{isEnglish ? "Quantity" : "數量"}</TableCell>
              <TableCell align="right">{isEnglish ? "Unit Price" : "單價"}</TableCell>
              <TableCell align="right">{isEnglish ? "Subtotal" : "小計"}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    value={item.name || ''}
                    onChange={handleItemChange(index, 'name')}
                    placeholder={item.category?.includes('Order') ? 
                      (isEnglish ? "Please specify: size, flavor, color, decoration requirements, etc." : "請填寫：尺寸、口味、顏色、裝飾要求等細節") : 
                      (isEnglish ? "Item Description" : "項目描述")
                    }
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={item.category || ''}
                      onChange={handleItemChange(index, 'category')}
                      displayEmpty
                    >
                      <MenuItem value="">
                        {isEnglish ? "Select Category" : "選擇類別"}
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.en} value={`${category.en} ${category.zh}`}>
                          {isEnglish ? category.en : category.zh}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.quantity || 1}
                    onChange={handleItemChange(index, 'quantity')}
                    inputProps={{ min: 1 }}
                    sx={{ width: '80px' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.price || 0}
                    onChange={handleItemChange(index, 'price')}
                    inputProps={{ min: 0 }}
                    sx={{ width: '100px' }}
                  />
                </TableCell>
                <TableCell align="right">
                  ${(item.quantity || 0) * (item.price || 0)}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleDeleteItem(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                {isEnglish ? "Total:" : "總計:"}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                ${total}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ItemList;