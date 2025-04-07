import React, { useState } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  ThemeProvider,
  createTheme,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomerInfo from './components/CustomerInfo';
import PaymentInfo from './components/PaymentInfo';
import ItemList from './components/ItemList';
import InvoicePreview from './components/InvoicePreview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#8B7355',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#7A6548',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [value, setValue] = useState(0);
  const [isEnglish, setIsEnglish] = useState(true);
  const [invoiceData, setInvoiceData] = useState({
    invoiceType: 'invoice',
    invoiceNo: '',
    customerInfo: {},
    paymentInfo: {},
    items: []
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInvoiceTypeChange = (event, newType) => {
    if (newType !== null) {
      setInvoiceData(prev => ({
        ...prev,
        invoiceType: newType
      }));
    }
  };

  const handleCustomerInfoChange = (customerInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      customerInfo
    }));
  };

  const handlePaymentInfoChange = (paymentInfo) => {
    setInvoiceData(prev => ({
      ...prev,
      paymentInfo
    }));
  };

  const handleItemsChange = (items) => {
    setInvoiceData(prev => ({
      ...prev,
      items
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
          <Container>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <ToggleButtonGroup
                value={invoiceData.invoiceType}
                exclusive
                onChange={handleInvoiceTypeChange}
                size="small"
                sx={{ 
                  bgcolor: '#fff',
                  '& .MuiToggleButton-root': {
                    px: 3,
                    py: 1
                  }
                }}
              >
                <ToggleButton value="invoice">
                  {isEnglish ? "Invoice" : "發票"}
                </ToggleButton>
                <ToggleButton value="receipt">
                  {isEnglish ? "Receipt" : "收據"}
                </ToggleButton>
              </ToggleButtonGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEnglish}
                    onChange={(e) => setIsEnglish(e.target.checked)}
                  />
                }
                label={isEnglish ? "English" : "中文"}
              />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fff' }}>
              <Tabs value={value} onChange={handleTabChange}>
                <Tab label={isEnglish ? "Customer Info" : "客戶資料"} />
                <Tab label={isEnglish ? "Payment Info" : "付款資料"} />
                <Tab label={isEnglish ? "Items" : "項目"} />
                <Tab label={isEnglish ? "Preview" : "預覽"} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <CustomerInfo 
                customerInfo={invoiceData.customerInfo}
                onCustomerInfoChange={handleCustomerInfoChange}
                isEnglish={isEnglish}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PaymentInfo 
                paymentInfo={invoiceData.paymentInfo}
                onPaymentInfoChange={handlePaymentInfoChange}
                isEnglish={isEnglish}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ItemList 
                items={invoiceData.items}
                onItemsChange={handleItemsChange}
                isEnglish={isEnglish}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <InvoicePreview 
                invoiceData={invoiceData}
                isEnglish={isEnglish}
              />
            </TabPanel>
          </Container>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;