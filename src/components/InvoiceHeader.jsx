import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

const InvoiceHeader = ({ invoiceData, onInvoiceDataChange }) => {
  const handleChange = (field) => (event) => {
    onInvoiceDataChange({
      ...invoiceData,
      [field]: event.target.value
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img 
                src="/images/logo.png" 
                alt="Mic's Bakery" 
                style={{ 
                  height: '80px',
                  width: 'auto'
                }} 
              />
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#8B7355', 
                    fontFamily: '"Playfair Display", serif',
                    mb: 1
                  }}
                >
                  Mic's Bakery
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#8B7355',
                    fontFamily: '"Noto Sans TC", sans-serif'
                  }}
                >
                  米の烘焙屋
                </Typography>
              </Box>
            </Box>
            <Box>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={invoiceData.invoiceType}
                  onChange={handleChange('invoiceType')}
                >
                  <FormControlLabel 
                    value="invoice" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography>Invoice</Typography>
                        <Typography>發票</Typography>
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value="receipt" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography>Receipt</Typography>
                        <Typography>收據</Typography>
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ 
            backgroundColor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="body2">
              Room 205E, 2/F, World Trade Centre,
            </Typography>
            <Typography variant="body2">
              8 Tsun Yip Lane, Kwun Tong, Kowloon, Hong Kong
            </Typography>
            <Typography variant="body2">
              觀塘駿業里8號世貿大樓2樓205E室
            </Typography>
            <Typography variant="body2">
              Tel 電話: 9824 8272 | Email 電郵: micmicbakery@gmail.com
            </Typography>
            <Typography variant="body2">
              Instagram: @mics_bakery | Facebook: @micmicbakery
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Invoice/Receipt No. 發票/收據編號"
            value={invoiceData.invoiceNo}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel>Channel Source 渠道來源</InputLabel>
            <Select
              value={invoiceData.channel}
              onChange={handleChange('channel')}
              label="Channel Source 渠道來源"
            >
              {[
                'Facebook',
                'Instagram',
                'WhatsApp',
                'Friend Referral 親友介紹',
                'Walk-in 門市',
                'Others 其他'
              ].map((channel) => (
                <MenuItem key={channel} value={channel}>
                  {channel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceHeader;