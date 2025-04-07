import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
  Stack,
  Button
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField } from '@mui/material';

const formatAmount = (amount) => {
  return Number(amount).toFixed(1);
};

const InvoicePreview = React.forwardRef(({ invoiceData, isEnglish, onInvoiceNoChange }, ref) => {
  const { type, customerInfo, items, paymentInfo } = invoiceData;
  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discount = paymentInfo.discountType === 'amount' 
    ? Number(paymentInfo.discountValue || 0)
    : total * (1 - Number(paymentInfo.discountType || 100) / 100);
  const finalTotal = total - discount;
  const balance = finalTotal - (Number(paymentInfo.deposit) || 0);

  const localPrintRef = React.useRef();
  const combinedRef = ref || localPrintRef;

  const handleSavePDF = async () => {
    const element = combinedRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${invoiceData.invoiceNo}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button 
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleSavePDF}
          sx={{ 
            bgcolor: '#8B7355',
            '&:hover': {
              bgcolor: '#6F5B3E'
            }
          }}
        >
          {isEnglish ? 'Save as PDF' : '儲存PDF'}
        </Button>
      </Stack>

      <Paper 
        ref={combinedRef}
        sx={{ 
          p: 3,
          minHeight: '297mm',
          width: '210mm',
          mx: 'auto',
          backgroundColor: '#fff',
          '& .MuiTypography-root': {
            fontSize: '0.9rem',
            lineHeight: 1.4
          },
          '& .MuiGrid-root': {
            marginBottom: '0.5rem'
          },
          '& .MuiTableCell-root': {
            padding: '6px 8px',
            fontSize: '0.9rem'
          }
        }}
      >
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <img 
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Mic's Bakery Limited" 
              style={{ width: '100%', maxWidth: '150px' }} 
            />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 'normal', 
                fontSize: '1.8rem',
                color: '#8B7355',
                letterSpacing: '1px',
                mb: 0.5
              }}>
                Mic's Bakery Limited
              </Typography>
              <Typography variant="h6" sx={{ 
                fontSize: '1.4rem',
                color: '#8B7355',
                letterSpacing: '1px',
                mb: 1
              }}>
                米の烘焙屋有限公司
              </Typography>

              <Stack spacing={1} alignItems="flex-end">
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, justifyContent: 'flex-end', maxWidth: '500px' }}>
                  <LocationOnIcon sx={{ color: '#8B7355', minWidth: '20px', mt: 0.5 }} fontSize="small" />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', lineHeight: 1.4 }}>
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
                  <Typography sx={{ fontSize: '0.9rem', color: '#8B7355' }}>Tel: 9824 8272</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  <EmailIcon sx={{ color: '#8B7355', minWidth: '20px' }} fontSize="small" />
                  <Typography sx={{ fontSize: '0.9rem', color: '#8B7355' }}>Email: micmicsbakery@gmail.com</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InstagramIcon sx={{ color: '#8B7355' }} fontSize="small" />
                    <Typography sx={{ fontSize: '0.9rem', color: '#8B7355' }}>@mics_bakery</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FacebookIcon sx={{ color: '#8B7355' }} fontSize="small" />
                    <Typography sx={{ fontSize: '0.9rem', color: '#8B7355' }}>@micsbakery</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '80px' }}>
                <strong>{type === 'invoice' ? (isEnglish ? 'Invoice No.:' : '發票編號:') : (isEnglish ? 'Receipt No.:' : '收據編號:')}</strong>
              </Typography>
              <TextField
                value={invoiceData.invoiceNo}
                onChange={(e) => onInvoiceNoChange(e.target.value)}
                variant="standard"
                size="small"
                sx={{
                  '& .MuiInput-input': {
                    fontSize: '0.9rem',
                    padding: '2px 0'
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '80px' }}>
                <strong>{isEnglish ? 'Date:' : '日期:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {invoiceData.date.toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Customer Name:' : '客戶姓名:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {customerInfo.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Phone:' : '電話:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {customerInfo.phone}
              </Typography>
            </Box>
            {customerInfo.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Email:' : '電郵:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {customerInfo.email}
                </Typography>
              </Box>
            )}
            {customerInfo.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Address:' : '地址:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {customerInfo.address}
                </Typography>
              </Box>
            )}
            {customerInfo.channel && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Channel:' : '銷售渠道:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {customerInfo.channel}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Payment Method:' : '付款方式:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {paymentInfo.paymentMethod}
              </Typography>
            </Box>
            {paymentInfo.bankType && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Bank:' : '銀行:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {paymentInfo.bankType}
                </Typography>
              </Box>
            )}
            {paymentInfo.paymentDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Payment Date:' : '付款日期:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {paymentInfo.paymentDate.toLocaleDateString()}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                <strong>{isEnglish ? 'Delivery Method:' : '配送方式:'}</strong>
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {paymentInfo.deliveryMethod}
              </Typography>
            </Box>
            {paymentInfo.classDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Class/Pickup Date:' : '上課/取貨日期:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {paymentInfo.classDate.toLocaleDateString()}
                </Typography>
              </Box>
            )}
            {paymentInfo.pickupTime && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', minWidth: '120px' }}>
                  <strong>{isEnglish ? 'Class/Pickup Time:' : '上課/取貨時間:'}</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {paymentInfo.pickupTime.toLocaleTimeString('zh-HK', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        <TableContainer sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontSize: '0.9rem' }}>{isEnglish ? 'Description' : '項目'}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{isEnglish ? 'Category' : '類別'}</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{isEnglish ? 'Quantity' : '數量'}</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{isEnglish ? 'Unit Price' : '單價'}</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{isEnglish ? 'Amount' : '金額'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{item.category}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.9rem' }}>{item.quantity}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.9rem' }}>${formatAmount(item.price)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.9rem' }}>${formatAmount(item.quantity * item.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right" sx={{ fontSize: '0.9rem' }}><strong>{isEnglish ? 'Total:' : '總額:'}</strong></TableCell>
                <TableCell align="right" sx={{ fontSize: '0.9rem' }}><strong>${formatAmount(total)}</strong></TableCell>
              </TableRow>
              {paymentInfo.discountType && (
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ fontSize: '0.9rem' }}><strong>{isEnglish ? 'Discount:' : '折扣:'}</strong></TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.9rem' }}><strong>-${formatAmount(discount)}</strong></TableCell>
                </TableRow>
              )}
              {paymentInfo.deposit > 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ fontSize: '0.9rem' }}><strong>{isEnglish ? 'Deposit:' : '訂金:'}</strong></TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.9rem' }}><strong>-${formatAmount(paymentInfo.deposit)}</strong></TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={4} align="right" sx={{ fontSize: '0.9rem' }}><strong>{isEnglish ? 'Balance:' : '結餘:'}</strong></TableCell>
                <TableCell align="right" sx={{ fontSize: '0.9rem' }}><strong>${formatAmount(balance)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {customerInfo.remarks && (
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.9rem' }}><strong>{isEnglish ? 'Remarks:' : '備註:'}</strong> {customerInfo.remarks}</Typography>
          </Box>
        )}

        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ 
            fontSize: '1rem',
            fontWeight: 'normal',
            mb: 0.5,
            color: '#8B7355'
          }}>
            {isEnglish ? "Thank you for your business" : "感謝惠顧"}
          </Typography>
          <Typography sx={{ 
            fontSize: '1rem',
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
              <Typography align="center" sx={{ fontSize: '0.9rem' }}>
                {isEnglish ? "Company Signature/Chop" : "公司簽署/蓋印"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Divider sx={{ mb: 1 }} />
              <Typography align="center" sx={{ fontSize: '0.9rem' }}>
                {isEnglish ? "Customer Signature/Chop" : "客戶簽署/蓋印"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;