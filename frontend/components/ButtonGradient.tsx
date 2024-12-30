import React from "react";
import { Button, ConfigProvider, Space } from "antd";

import { createStyles } from "antd-style";
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
        font-weight: 500;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #008eff, #00debf);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
const ButtonGradient = ({ disabled, handleButton, buttonName, icon }: any) => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button
        disabled={disabled}
        type="primary"
        size="large"
        onClick={handleButton}
        className="!h-[40px] min-w-[170px] w-auto !text-[14px] !rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:text-black"
      >
        {icon && icon}
        {buttonName}
      </Button>
    </ConfigProvider>
  );
};
export default ButtonGradient;
