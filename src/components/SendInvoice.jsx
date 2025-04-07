import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Alert,
  IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SendInvoice = ({ invoiceData }) => {
  const [open, setOpen] = useState(false);
  const [sendMethod, setSendMethod] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    // 這裡將來會添加實際的發送邏輯
    setStatus('發送成功！');
    setTimeout(() => {
      setOpen(false);
      setStatus('');
    }, 2000);
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          onClick={() => {
            setSendMethod('email');
            setOpen(true);
          }}
          sx={{
            backgroundColor: '#8B7355',
            '&:hover': {
              backgroundColor: '#6B5335'
            }
          }}
        >
          發送電郵收據
        </Button>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={() => {
            setSendMethod('whatsapp');
            setOpen(true);
          }}
          sx={{
            backgroundColor: '#25D366',
            '&:hover': {
              backgroundColor: '#128C7E'
            }
          }}
        >
          發送 WhatsApp 收據
        </Button>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {sendMethod === 'email' ? '發送電郵收據' : '發送 WhatsApp 收據'}
        </DialogTitle>
        <DialogContent>
          {status && <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert>}
          <TextField
            fullWidth
            label={sendMethod === 'email' ? "電郵地址" : "WhatsApp 號碼"}
            defaultValue={sendMethod === 'email' ? invoiceData.customerInfo.email : invoiceData.customerInfo.phone}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleSend} variant="contained">
            發送
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendInvoice;