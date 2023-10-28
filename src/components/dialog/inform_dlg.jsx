import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button, ButtonText, CloseIcon, Heading, Icon } from '@gluestack-ui/themed';

export default ({Title, Visible, OnSubmit, children}) => {

  return (
    <AlertDialog
      isOpen={Visible}
      onClose={() => {
        OnSubmit(true)
      }}
    >
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{Title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          {children}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            bg="$primary_alpha_0"
            style={{width: '100%'}}
            action="negative"
            onPress={() => {
              OnSubmit(true)
            }}
          >
            <ButtonText>OK</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}