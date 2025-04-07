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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const PaymentInfo = ({ paymentInfo, onPaymentInfoChange, isEnglish }) => {
  const handleChange = (field) => (event) => {
    const value = event?.target?.value ?? event;
    onPaymentInfoChange({
      ...paymentInfo,
      [field]: value
    });
  };

  const handleBankTransferChange = (event) => {
    const value = event.target.value;
    if (value === 'Bank Transfer') {
      onPaymentInfoChange({
        ...paymentInfo,
        paymentMethod: value,
        bankType: 'HSBC'
      });
    } else {
      onPaymentInfoChange({
        ...paymentInfo,
        paymentMethod: value,
        bankType: ''
      });
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#8B7355' }}>
        {isEnglish ? "Payment Information" : "付款資料"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={isEnglish ? "Payment Date" : "付款日期"}
              value={paymentInfo.paymentDate}
              onChange={(newValue) => handleChange('paymentDate')(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>{isEnglish ? "Payment Method" : "付款方式"}</InputLabel>
            <Select
              value={paymentInfo.paymentMethod || ''}
              onChange={handleBankTransferChange}
              label={isEnglish ? "Payment Method" : "付款方式"}
            >
              <MenuItem value="Cash">{isEnglish ? "Cash" : "現金"}</MenuItem>
              <MenuItem value="Bank Transfer">{isEnglish ? "Bank Transfer" : "銀行轉賬"}</MenuItem>
              <MenuItem value="FPS">{isEnglish ? "FPS" : "轉數快"}</MenuItem>
              <MenuItem value="PayMe">PayMe</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {paymentInfo.paymentMethod === 'Bank Transfer' && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{isEnglish ? "Bank" : "銀行"}</InputLabel>
              <Select
                value={paymentInfo.bankType || 'HSBC'}
                onChange={handleChange('bankType')}
                label={isEnglish ? "Bank" : "銀行"}
              >
                <MenuItem value="HSBC">{isEnglish ? "HSBC" : "匯豐銀行"}</MenuItem>
                <MenuItem value="BOC">{isEnglish ? "BOC" : "中國銀行"}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>{isEnglish ? "Delivery Method" : "配送方式"}</InputLabel>
            <Select
              value={paymentInfo.deliveryMethod || ''}
              onChange={handleChange('deliveryMethod')}
              label={isEnglish ? "Delivery Method" : "配送方式"}
            >
              <MenuItem value="Self Pickup">{isEnglish ? "Self Pickup" : "自取"}</MenuItem>
              <MenuItem value="Delivery">{isEnglish ? "Delivery" : "送貨"}</MenuItem>
              <MenuItem value="Class">{isEnglish ? "Class" : "課堂"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={isEnglish ? "Class/Pickup Date" : "上課/取貨日期"}
              value={paymentInfo.classDate}
              onChange={handleChange('classDate')}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={isEnglish ? "Class/Pickup Time" : "上課/取貨時間"}
              value={paymentInfo.pickupTime}
              onChange={handleChange('pickupTime')}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>{isEnglish ? "Discount Type" : "折扣類型"}</InputLabel>
            <Select
              value={paymentInfo.discountType || ''}
              onChange={handleChange('discountType')}
              label={isEnglish ? "Discount Type" : "折扣類型"}
            >
              <MenuItem value=""><em>{isEnglish ? "None" : "無"}</em></MenuItem>
              <MenuItem value="amount">{isEnglish ? "Fixed Amount" : "固定金額"}</MenuItem>
              <MenuItem value="90">{isEnglish ? "90% off" : "九折"}</MenuItem>
              <MenuItem value="85">{isEnglish ? "85% off" : "八五折"}</MenuItem>
              <MenuItem value="80">{isEnglish ? "80% off" : "八折"}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {paymentInfo.discountType === 'amount' && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={isEnglish ? "Discount Amount" : "折扣金額"}
              type="number"
              value={paymentInfo.discountValue || ''}
              onChange={handleChange('discountValue')}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={isEnglish ? "Deposit" : "訂金"}
            type="number"
            value={paymentInfo.deposit || ''}
            onChange={handleChange('deposit')}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PaymentInfo;