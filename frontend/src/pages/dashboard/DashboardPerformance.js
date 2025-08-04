import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Timeline,
  ShowChart,
  Assessment,
} from '@mui/icons-material';
import { FadeInUp } from '../../components/ui/Animations';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DashboardPerformance = () => {
  const [timeRange, setTimeRange] = useState('30');

  const performanceData = {
    totalProfit: 2750000,
    totalLoss: 450000,
    netProfit: 2300000,
    winRate: 75.5,
    totalTrades: 127,
    winningTrades: 96,
    losingTrades: 31,
    profitFactor: 6.11,
    averageWin: 28645,
    averageLoss: 14516,
    maxDrawdown: 125000,
    sharpeRatio: 1.85
  };

  const monthlyPerformance = [
    { month: 'Jan 2024', profit: 345000, trades: 15, winRate: 80 },
    { month: 'Feb 2024', profit: 278000, trades: 12, winRate: 75 },
    { month: 'Mar 2024', profit: 412000, trades: 18, winRate: 78 },
    { month: 'Apr 2024', profit: 156000, trades: 10, winRate: 70 },
    { month: 'May 2024', profit: 523000, trades: 22, winRate: 82 },
    { month: 'Jun 2024', profit: 389000, trades: 16, winRate: 81 }
  ];

  const topPerformingEAs = [
    { name: 'Advanced EA Bot', profit: 875000, trades: 45, winRate: 82.2 },
    { name: 'Scalping Expert', profit: 645000, trades: 38, winRate: 78.9 },
    { name: 'Grid Trading Bot', profit: 456000, trades: 28, winRate: 75.0 },
    { name: 'Trend Following EA', profit: 324000, trades: 16, winRate: 81.3 }
  ];

  const getPerformanceColor = (value, isProfit = true) => {
    if (isProfit) {
      return value > 0 ? 'success.main' : 'error.main';
    }
    return value > 70 ? 'success.main' : value > 50 ? 'warning.main' : 'error.main';
  };

  return (
    <>
      <FadeInUp>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Performance Analytics
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track your trading performance and EA statistics
          </Typography>
        </Box>
      </FadeInUp>

      {/* Time Range Selector */}
      <FadeInUp>
        <Box sx={{ mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 3 months</MenuItem>
              <MenuItem value="365">Last year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FadeInUp>

      {/* Key Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: getPerformanceColor(performanceData.netProfit), mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: getPerformanceColor(performanceData.netProfit) }}>
                      {formatCurrency(performanceData.netProfit)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Net Profit
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assessment sx={{ fontSize: 40, color: getPerformanceColor(performanceData.winRate, false), mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {performanceData.winRate}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Win Rate
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShowChart sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {performanceData.totalTrades}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Trades
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Timeline sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {performanceData.profitFactor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Profit Factor
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Detailed Performance Metrics */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Performance Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Profit
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 600 }}>
                      {formatCurrency(performanceData.totalProfit)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Loss
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 600 }}>
                      {formatCurrency(performanceData.totalLoss)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Winning Trades
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {performanceData.winningTrades}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Losing Trades
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {performanceData.losingTrades}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Average Win
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatCurrency(performanceData.averageWin)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Average Loss
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formatCurrency(performanceData.averageLoss)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Max Drawdown
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'warning.main' }}>
                      {formatCurrency(performanceData.maxDrawdown)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Sharpe Ratio
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {performanceData.sharpeRatio}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>

        {/* Top Performing EAs */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FadeInUp>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Top Performing EAs
                </Typography>
                
                {topPerformingEAs.map((ea, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {ea.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                        {formatCurrency(ea.profit)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {ea.trades} trades • {ea.winRate}% win rate
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={ea.winRate} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </FadeInUp>
        </Grid>
      </Grid>

      {/* Monthly Performance */}
      <FadeInUp>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Monthly Performance
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Profit/Loss</TableCell>
                    <TableCell align="right">Trades</TableCell>
                    <TableCell align="right">Win Rate</TableCell>
                    <TableCell align="right">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyPerformance.map((month, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {month.month}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            color: getPerformanceColor(month.profit)
                          }}
                        >
                          {formatCurrency(month.profit)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {month.trades}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={`${month.winRate}%`}
                          color={month.winRate > 75 ? 'success' : month.winRate > 60 ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <LinearProgress 
                          variant="determinate" 
                          value={month.winRate} 
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </FadeInUp>
    </>
  );
};

export default DashboardPerformance;


