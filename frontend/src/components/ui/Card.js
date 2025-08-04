import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Visibility,
  Download,
  TrendingUp,
  Security,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0px 16px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
    '& .card-image': {
      transform: 'scale(1.05)',
    },
    '& .card-overlay': {
      opacity: 1,
    },
  },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  transition: 'transform 0.4s ease',
  position: 'relative',
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 2,
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: '4px 12px',
  borderRadius: 20,
  fontWeight: 600,
  fontSize: '0.875rem',
  zIndex: 3,
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 3,
  fontWeight: 600,
  ...(status === 'new' && {
    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    color: 'white',
  }),
  ...(status === 'hot' && {
    background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
    color: 'white',
  }),
  ...(status === 'featured' && {
    background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
    color: 'white',
  }),
}));

const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
  onView,
  isFavorite = false,
  ...props
}) => {
  const {
    id,
    name,
    description,
    price,
    image,
    rating = 4.5,
    reviews = 0,
    downloads = 0,
    author,
    status, // 'new', 'hot', 'featured'
    tags = [],
  } = product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <StyledCard {...props}>
      <Box sx={{ position: 'relative' }}>
        <CardImage
          className="card-image"
          image={image || '/placeholder-ea.jpg'}
          title={name}
        />
        
        <CardOverlay className="card-overlay">
          <Button
            variant="contained"
            startIcon={<Visibility />}
            onClick={() => onView(id)}
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: 'primary.main',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            Quick View
          </Button>
        </CardOverlay>

        <PriceTag>{formatPrice(price)}</PriceTag>
        
        {status && (
          <StatusChip
            size="small"
            label={status.toUpperCase()}
            status={status}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 600, lineHeight: 1.3 }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.5 }}
        >
          {description}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({reviews} reviews)
          </Typography>
        </Box>

        {/* Author */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}
          >
            {author?.charAt(0)}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            by {author}
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Download sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
            <Typography variant="caption" color="text.secondary">
              {formatNumber(downloads)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
            <Typography variant="caption" color="text.secondary">
              95% Win Rate
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Security sx={{ fontSize: 16, mr: 0.5, color: 'warning.main' }} />
            <Typography variant="caption" color="text.secondary">
              Verified
            </Typography>
          </Box>
        </Box>

        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.65rem' }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(product)}
          sx={{ flexGrow: 1, mr: 1 }}
        >
          Add to Cart
        </Button>

        <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <IconButton
            onClick={() => onToggleFavorite(id)}
            color={isFavorite ? 'error' : 'default'}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;

