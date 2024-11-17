import React from 'react';
import styles from './index.module.scss';

interface CustomPopupProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ visible, message, onConfirm, onCancel }) => {
  if (!visible) {
    return <></>;
  }

  return (
    <div className={styles.customPopupOverlay}>
      <div className={styles.customPopup}>
        <p>{message}</p>
        <div className={styles.customPopupButtons}>
          <button
            className={`${styles.customPopupButton} ${styles.confirmButton}`}
            onClick={onConfirm}
          >
            Yes, leave
          </button>
          <button
            className={`${styles.customPopupButton} ${styles.cancelButton}`}
            onClick={onCancel}
          >
            Stay on page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
