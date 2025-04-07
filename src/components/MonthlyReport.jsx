import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { format } from 'date-fns';

const MonthlyReport = ({ invoiceData }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, i) => i);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // 模擬數據，實際應用中應從數據庫獲取
  const monthlyData = {
    totalRevenue: 25000,
    totalOrders: 45,
    categoryBreakdown: {
      '蛋糕課程': 8500,
      '麵包課程': 6000,
      '餅乾課程': 4500,
      '蛋糕訂製': 3500,
      '麵包訂製': 2500
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#8B7355' }}>
        月度報表
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>年份</InputLabel>
            <Select
              value={selectedYear}
              label="年份"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>月份</InputLabel>
            <Select
              value={selectedMonth}
              label="月份"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <MenuItem key={month} value={month}>
                  {format(new Date(2000, month), 'MMMM')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          總覽
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>總營業額：${monthlyData.totalRevenue}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>總訂單數：{monthlyData.totalOrders}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>
        類別分析
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>類別</TableCell>
              <TableCell align="right">營業額</TableCell>
              <TableCell align="right">佔比</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(monthlyData.categoryBreakdown).map(([category, revenue]) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell align="right">${revenue}</TableCell>
                <TableCell align="right">
                  {((revenue / monthlyData.totalRevenue) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MonthlyReport;