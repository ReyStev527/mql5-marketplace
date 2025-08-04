import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Slide,
  Backdrop,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    background: alpha(theme.palette.background.paper, 0.95),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    boxShadow: `0px 24px 48px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: '1.25rem',
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(0, 3),
  '&.MuiDialogContent-dividers': {
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  gap: theme.spacing(1),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[500],
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
  },
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
}));

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableBackdropClick = false,
  showCloseButton = true,
  dividers = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isMobile}
      slots={{ backdrop: StyledBackdrop }}
      {...props}
    >
      {title && (
        <StyledDialogTitle>
          {title}
          {showCloseButton && (
            <CloseButton onClick={onClose} size="small">
              <Close />
            </CloseButton>
          )}
        </StyledDialogTitle>
      )}

      <StyledDialogContent dividers={dividers}>
        {children}
      </StyledDialogContent>

      {actions && (
        <StyledDialogActions>
          {actions}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};

// Specialized modal variants
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  ...props
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      actions={[
        <button
          key="cancel"
          onClick={onClose}
          style={{
            padding: '8px 16px',
            border: `1px solid ${theme.palette.grey[300]}`,
            borderRadius: '8px',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          {cancelText}
        </button>,
        <button
          key="confirm"
          onClick={onConfirm}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            background: theme.palette[confirmColor].main,
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {confirmText}
        </button>,
      ]}
      {...props}
    >
      {message}
    </Modal>
  );
};

export default Modal;

