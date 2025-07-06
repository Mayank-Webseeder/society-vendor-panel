import { useState } from 'react';
import JobDetailsModal from './JobDetailsModal';
import QuotationFormModal from './QuotationFormModal';
import WithdrawApplicationModal from './WithdrawApplicationModal';
import ConfirmationDialog from './ConfirmationDialog';



const NewLeadModal = ({ open, onClose, lead, onFillQuotation }) => {

  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [proceed, setProceed] = useState(false);

  if (!open || !lead) return null;




  // For "Applied" with "Approval Pending", show WithdrawApplicationModal
  if (lead.status === "Applied" && lead.pendingStatus === "Approval Pending") {
    return (
      <>
        <WithdrawApplicationModal
          open={open}
          onClose={onClose}
          lead={lead}
          onWithdraw={() => setShowWithdrawConfirm(true)}
        />
        <ConfirmationDialog
          open={showWithdrawConfirm}
          onClose={() => setShowWithdrawConfirm(false)}
          onConfirm={() => {
            setShowWithdrawConfirm(false);
            onClose();
          }}
          title="Withdraw Application"
          message="Are you sure you want to Withdraw this application?"
        />
      </>
    );
  }



  
  // For "New" or other cases, show JobDetailsModal
  return (
    <JobDetailsModal
      open={open}
      onClose={onClose}
      lead={lead}
      isApplied={lead.status === "Applied"}
      onWithdraw={() => setShowWithdrawConfirm(true)}
      onApplyClick={() => setProceed(true)}
      onFillQuotation={onFillQuotation}
      proceed={proceed}
    />
  );
};

export default NewLeadModal;