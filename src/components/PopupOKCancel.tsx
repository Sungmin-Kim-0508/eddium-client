import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../components/Buttons'

const OpaqueLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  z-index: 15;
`

const PopupBaseBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PopupWrapper = styled.div`
  width: 54rem;
  min-height: 550px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 0px;
  border-radius: 4px;
`;

type PopupOKCancelProps = {
  title: string;
  visible: boolean;
  confirmLabel: string;
  onConfirm?: () => any;
  onCancel?: () => any;
}

const PopupOKCancel: React.FC<PopupOKCancelProps> = ({ children, title, visible, confirmLabel, onConfirm, onCancel }) => {
  useEffect(() => {
    // prevent activating scroll bar when modal is opened
    document.body.style.overflowY = visible ? 'hidden' : 'initial';
  }, [visible])
  if (!visible) return null;

  const btnColor = confirmLabel === 'Delete' ? 'bg-red-700 hover:bg-red-800' : null

  return (
    <>
      <OpaqueLayer />
      <PopupBaseBlock>
        <PopupWrapper>
          <div className="text-3xl font-medium">
            <span>{title}</span>
          </div>
          <div className="mb-6 text-base text-mediumGray">
            <p>{children}</p>
          </div>
          <div>
            {onCancel && (
              <button className={`border border-black text-black py-2 px-4 rounded mr-3`} onClick={onCancel}>
                Cancel
              </button>
            )}
            <button className={`${btnColor} text-white font-bold py-2 px-4 rounded mr-3`} onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </PopupWrapper>
      </PopupBaseBlock>
    </>
  );
}

export default PopupOKCancel