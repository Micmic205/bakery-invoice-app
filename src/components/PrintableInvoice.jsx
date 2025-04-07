import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const formatAmount = (amount) => {
  return Number(amount).toFixed(1);
};

const PrintableInvoice = React.forwardRef(({ invoiceData, isEnglish, onInvoiceNoChange }, ref) => {
  const { type, customerInfo, items, paymentInfo } = invoiceData;
  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discount = paymentInfo.discountType === 'amount' 
    ? Number(paymentInfo.discountValue || 0)
    : total * (1 - Number(paymentInfo.discountType || 100) / 100);
  const finalTotal = total - discount;
  const balance = finalTotal - (Number(paymentInfo.deposit) || 0);

  return (
    <Paper ref={ref} sx={{ p: 4, minHeight: '297mm', width: '210mm', mx: 'auto' }}>
      <Grid container spacing={2} sx={{ mb: 4, alignItems: 'flex-start' }}>
        <Grid item xs={4}>
          <img 
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Mic's Bakery Limited" 
            style={{ width: '100%', maxWidth: '200px' }} 
          />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 'normal', 
              fontSize: '2.5rem',
              color: '#8B7355',
              letterSpacing: '1px',
              mb: 1
            }}>
              Mic's Bakery Limited
            </Typography>
            <Typography variant="h6" sx={{ 
              fontSize: '1.8rem',
              color: '#8B7355',
              letterSpacing: '1px',
              mb: 2
            }}>
              米の烘焙屋有限公司
            </Typography>

            <Stack spacing={1.5} alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, justifyContent: 'flex-end', maxWidth: '500px' }}>
                <LocationOnIcon sx={{ color: '#8B7355', minWidth: '20px', mt: 0.5 }} fontSize="small" />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: '1rem', color: '#8B7355', lineHeight: 1.5 }}>
                    {isEnglish ? (
                      <>
                        Room 205E, 2/F, World Trade Centre,<br />
                        8 Tsun Yip Lane, Kwun Tong, Kowloon, Hong Kong
                      </>
                    ) : (
                      "觀塘駿業里8號世貿大樓2樓205E室"
                    )}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                <PhoneIcon sx={{ color: '#8B7355', minWidth: '20px' }} fontSize="small" />
                <WhatsAppIcon sx={{ color: '#8B7355', ml: -0.5 }} fontSize="small" />
                <Typography sx={{ fontSize: '1rem', color: '#8B7355' }}>Tel: 9824 8272</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                <EmailIcon sx={{ color: '#8B7355', minWidth: '20px' }} fontSize="small" />
                <Typography sx={{ fontSize: '1rem', color: '#8B7355' }}>Email: micmicsbakery@gmail.com</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InstagramIcon sx={{ color: '#8B7355' }} fontSize="small" />
                  <Typography sx={{ fontSize: '1rem', color: '#8B7355' }}>@mics_bakery</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FacebookIcon sx={{ color: '#8B7355' }} fontSize="small" />
                  <Typography sx={{ fontSize: '1rem', color: '#8B7355' }}>@micmicsbakery</Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
          {type === 'invoice' ? (isEnglish ? 'INVOICE' : '發票') : (isEnglish ? 'RECEIPT' : '收據')}
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Customer:' : '客戶:'}</strong> {customerInfo.name}</Typography>
          <Typography sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Phone:' : '電話:'}</strong> {customerInfo.phone}</Typography>
          {customerInfo.email && (
            <Typography sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Email:' : '電郵:'}</strong> {customerInfo.email}</Typography>
          )}
          {customerInfo.address && (
            <Typography sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Address:' : '地址:'}</strong> {customerInfo.address}</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '1rem', minWidth: '60px' }}>
              <strong>{isEnglish ? 'No.:' : '編號:'}</strong>
            </Typography>
            <input
              type="text"
              value={invoiceData.invoiceNo}
              onChange={(e) => onInvoiceNoChange?.(e.target.value)}
              style={{
                border: 'none',
                borderBottom: '1px solid #8B7355',
                fontSize: '1rem',
                width: '100px',
                padding: '2px 4px',
                color: '#8B7355',
                outline: 'none',
                backgroundColor: 'transparent'
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '1rem', minWidth: '60px' }}>
              <strong>{isEnglish ? 'Date:' : '日期:'}</strong>
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              {invoiceData.date.toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '1rem', minWidth: '120px' }}>
              <strong>{isEnglish ? 'Payment Method:' : '付款方式:'}</strong>
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              {paymentInfo.paymentMethod}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '1rem', minWidth: '120px' }}>
              <strong>{isEnglish ? 'Delivery Method:' : '配送方式:'}</strong>
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              {paymentInfo.deliveryMethod}
            </Typography>
          </Box>
          {paymentInfo.classDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '1rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Class/Pickup Date:' : '上課/取貨日期:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {paymentInfo.classDate.toLocaleDateString()}
              </Typography>
            </Box>
          )}
          {paymentInfo.pickupTime && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '1rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Class/Pickup Time:' : '上課/取貨時間:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {paymentInfo.pickupTime.toLocaleTimeString()}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontSize: '1rem' }}>{isEnglish ? 'Description' : '項目'}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{isEnglish ? 'Category' : '類別'}</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}>{isEnglish ? 'Quantity' : '數量'}</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}>{isEnglish ? 'Unit Price' : '單價'}</TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}>{isEnglish ? 'Amount' : '金額'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: '1rem' }}>{item.name}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{item.category}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>{item.quantity}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>${formatAmount(item.price)}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}>${formatAmount(item.quantity * item.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Total:' : '總額:'}</strong></TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>${formatAmount(total)}</strong></TableCell>
            </TableRow>
            {paymentInfo.discountType && (
              <TableRow>
                <TableCell colSpan={4} align="right" sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Discount:' : '折扣:'}</strong></TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>-${formatAmount(discount)}</strong></TableCell>
              </TableRow>
            )}
            {paymentInfo.deposit > 0 && (
              <TableRow>
                <TableCell colSpan={4} align="right" sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Deposit:' : '訂金:'}</strong></TableCell>
                <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>-${formatAmount(paymentInfo.deposit)}</strong></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Balance:' : '結餘:'}</strong></TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem' }}><strong>${formatAmount(balance)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {customerInfo.remarks && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '1rem' }}><strong>{isEnglish ? 'Remarks:' : '備註:'}</strong> {customerInfo.remarks}</Typography>
        </Box>
      )}

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography sx={{ 
          fontSize: '1.2rem',
          fontWeight: 'normal',
          mb: 1,
          color: '#8B7355'
        }}>
          {isEnglish ? "Thank you for your business" : "感謝惠顧"}
        </Typography>
        <Typography sx={{ 
          fontSize: '1.2rem',
          fontWeight: 'normal',
          color: '#8B7355'
        }}>
          {isEnglish 
            ? "It's our pleasure to join your moment."
            : "很榮幸能參與您的美好時刻。"
          }
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Divider sx={{ mb: 1 }} />
            <Typography align="center" sx={{ fontSize: '1rem' }}>
              {isEnglish ? "Company Signature/Chop" : "公司簽署/蓋印"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Divider sx={{ mb: 1 }} />
            <Typography align="center" sx={{ fontSize: '1rem' }}>
              {isEnglish ? "Customer Signature/Chop" : "客戶簽署/蓋印"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
});

PrintableInvoice.displayName = 'PrintableInvoice';

export default PrintableInvoice;