import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export interface QRCodeTypeProps {
  value: string;
}

const QRCodeComponent: React.FC<QRCodeTypeProps> = (props) => {
  return (
    <div>
      <QRCodeCanvas value={props.value} />
    </div>
  );
};

export default QRCodeComponent;
