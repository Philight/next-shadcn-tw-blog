import { m, MotionProps } from 'framer-motion';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: React.ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }: Props) {
  return (
    <m.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} variants={varContainer()} {...other}>
      {children}
    </m.div>
  );
}
