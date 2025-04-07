import React, { useState } from 'react';
import './App.css';
import InvoicePreview from './components/InvoicePreview';
import CustomerInfo from './components/CustomerInfo';
import PaymentInfo from './components/PaymentInfo';
import ItemList from './components/ItemList';
import { Box, Container, ToggleButton, ToggleButtonGroup, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TranslateIcon from '@mui/icons-material/Translate';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: '10px 30px',
  color: '#8B7355',
  '&.Mui-selected': {
    backgroundColor: '#8B7355',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6B5335',
    },
  },
}));

const initialData = {
  type: 'invoice',
  invoiceNo: '002701',
  date: new Date(),
  customerInfo: {
    name: '',
    phone: '',
    email: '',
    address: '',
    remarks: '',
    channel: '',
    deliveryMethod: ''
  },
  items: [],
  paymentInfo: {
    paymentDate: null,
    paymentMethod: '',
    bankType: '',
    deliveryMethod: '',
    classDate: null,
    pickupTime: null,
    discountType: '',
    discountValue: '',
    deposit: ''
  }
};

function App() {
  const [invoiceData, setInvoiceData] = useState(initialData);
  const [isEnglish, setIsEnglish] = useState(false);

  const handleCustomerInfoChange = (newCustomerInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      customerInfo: newCustomerInfo
    }));
  };

  const handlePaymentInfoChange = (newPaymentInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      paymentInfo: newPaymentInfo
    }));
  };

  const handleItemsChange = (newItems) => {
    setInvoiceData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setInvoiceData(prev => ({
        ...prev,
        type: newType
      }));
    }
  };

  const handleInvoiceNoChange = (newInvoiceNo) => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceNo: newInvoiceNo
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundImage: `url('/marble-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}>
              <ToggleButtonGroup
                value={invoiceData.type}
                exclusive
                onChange={handleTypeChange}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              >
                <StyledToggleButton value="invoice">
                  發票 Invoice
                </StyledToggleButton>
                <StyledToggleButton value="receipt">
                  收據 Receipt
                </StyledToggleButton>
              </ToggleButtonGroup>

              <IconButton 
                onClick={() => setIsEnglish(prev => !prev)}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.7)' }
                }}
              >
                <TranslateIcon />
              </IconButton>
            </Box>

            <CustomerInfo 
              customerInfo={invoiceData.customerInfo}
              onCustomerInfoChange={handleCustomerInfoChange}
              isEnglish={isEnglish}
            />
            <PaymentInfo 
              paymentInfo={invoiceData.paymentInfo}
              onPaymentInfoChange={handlePaymentInfoChange}
              isEnglish={isEnglish}
            />
            <ItemList 
              items={invoiceData.items}
              onItemsChange={handleItemsChange}
              isEnglish={isEnglish}
            />
            <InvoicePreview 
              invoiceData={invoiceData}
              isEnglish={isEnglish}
              onInvoiceNoChange={handleInvoiceNoChange}
            />
          </Stack>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}

export default App;