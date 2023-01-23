import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './styles.css'

interface DialogProps {
  onSave: any
  disable?: boolean
}

export const SaveDialog = ({ disable, onSave }: DialogProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="Button violet" disabled={disable}>
        Salvar
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
          Confirmar solicitação?
        </AlertDialog.Title>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button gray">Cancelar</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="Button green" onClick={onSave}>
              Sim
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)
