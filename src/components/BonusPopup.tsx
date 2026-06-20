import React from "react";
import { useNavigate } from "react-router";

interface BonusPopupProps {
  visible: boolean;
  onClose: () => void;
  handleBonusClick?: () => void;
  isDesktop?: boolean;
}

const BonusPopup: React.FC<BonusPopupProps> = ({
  visible,
  onClose,
  handleBonusClick,
  isDesktop,
}) => {
  const navigate = useNavigate();

  if (!visible) return null;

  const handleClose = () => {
    onClose();
  };

  const handleRedeemCode = () => {
    handleClose();
    if (handleBonusClick) {
      handleBonusClick();
    }
  };

  const handleTopUp = () => {
    handleClose();
    // Assuming you might want to change this later, for now just close or navigate
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={handleClose}
      ></div>

      <div
        className="relative w-full sm:max-w-[340px] bg-[#EAEAEA] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col p-6 shadow-xl mt-auto sm:mt-0"
      >
        <h2 className="text-[18px] font-bold text-black text-center mb-4">
          Bonus
        </h2>

        <div className="text-[14px] text-black/70 leading-relaxed font-normal text-center mb-6">
          Bonuses can be used for gameplay or converted to WLT. Claim a bonus code, or top up by converting your Gcoin and WLT.
        </div>

        <div className="flex justify-center items-center gap-[12px] w-full text-[14px]">
          <button
            onClick={handleRedeemCode}
            className="flex justify-center items-center cursor-pointer font-[600] w-[130px] h-[40px] border-[1px] border-solid border-black rounded-full text-black active:opacity-70 transition-opacity"
          >
            Redeem Code
          </button>
          <button
            onClick={handleTopUp}
            className="flex justify-center items-center cursor-pointer font-[600] w-[130px] h-[40px] border-[1px] border-solid border-black rounded-full text-black active:opacity-70 transition-opacity"
          >
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default BonusPopup;
