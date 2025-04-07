import React from 'react';
import { Box } from '@mui/material';
import CustomerInfo from './CustomerInfo';
import PaymentInfo from './PaymentInfo';
import ItemList from './ItemList';

const InvoiceForm = ({ invoiceData, onInvoiceDataChange }) => {
  const handleCustomerInfoChange = (newCustomerInfo) => {
    onInvoiceDataChange({
      ...invoiceData,
      customerInfo: newCustomerInfo
    });
  };

  const handlePaymentInfoChange = (newPaymentInfo) => {
    onInvoiceDataChange({
      ...invoiceData,
      paymentInfo: newPaymentInfo
    });
  };

  const handleItemsChange = (newItems) => {
    onInvoiceDataChange({
      ...invoiceData,
      items: newItems
    });
  };

  return (
    <Box>
      <CustomerInfo 
        customerInfo={invoiceData.customerInfo}
        onCustomerInfoChange={handleCustomerInfoChange}
      />
      <PaymentInfo 
        paymentInfo={invoiceData.paymentInfo}
        onPaymentInfoChange={handlePaymentInfoChange}
      />
      <ItemList 
        items={invoiceData.items}
        onItemsChange={handleItemsChange}
      />
    </Box>
  );
};

export default InvoiceForm;