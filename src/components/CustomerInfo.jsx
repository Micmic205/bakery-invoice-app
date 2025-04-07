import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const CustomerInfo = ({ customerInfo, onCustomerInfoChange, isEnglish }) => {
  const handleChange = (field) => (event) => {
    onCustomerInfoChange({
      ...customerInfo,
      [field]: event.target.value
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#8B7355' }}>
        {isEnglish ? "Customer Information" : "客戶資料"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={isEnglish ? "Customer Name" : "客戶姓名"}
            value={customerInfo.name || ''}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={isEnglish ? "Contact Number" : "聯絡電話"}
            value={customerInfo.phone || ''}
            onChange={handleChange('phone')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={isEnglish ? "Email Address" : "電郵地址"}
            type="email"
            value={customerInfo.email || ''}
            onChange={handleChange('email')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>{isEnglish ? "Channel" : "接觸渠道"}</InputLabel>
            <Select
              value={customerInfo.channel || ''}
              onChange={handleChange('channel')}
              label={isEnglish ? "Channel" : "接觸渠道"}
            >
              <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={isEnglish ? "Address" : "地址"}
            value={customerInfo.address || ''}
            onChange={handleChange('address')}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={isEnglish ? "Remarks" : "備註"}
            value={customerInfo.remarks || ''}
            onChange={handleChange('remarks')}
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerInfo;