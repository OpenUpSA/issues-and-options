import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const BasicButtonStyles = {
  textTransform: 'none',
  backgroundColor: '#ED3D32',
  color: '#FFFFFF',
  borderRadius: '3px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  height: '41px',
  lineHeight: '17px',
  boxShadow: 'none',
}

export const BasicButton = styled(Button)({
  ...BasicButtonStyles
})

export const UsefulLinkButton = styled(Button)({
  backgroundColor: 'rgba(255, 255, 255, 0.13)',
  color: '#FFFFFF',
  textTransform: 'none',
  padding: '12px'
});

export const GetStartedButton = styled(Button)({
  ...BasicButtonStyles,
  width: '145px',
});

export const BackButton = styled(Button)({
  ...BasicButtonStyles,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '12px'
});
