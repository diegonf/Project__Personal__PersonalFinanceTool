import { useEffect, useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useShowChooseTypeTransactionPopUp, useShowReceiptPopUp } from 'assets/state/hooks/addTransactionHooks';
import classNames from 'classnames';
import styles from './AddPlusButton.module.scss';
import AddPlusButtonPopUp from './AddPlusButtonPopUp/AddPlusButtonPopUp';


const AddPlusButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showPopUp, setShowPopUp] = useShowChooseTypeTransactionPopUp();
  const [showReceiptPopUp] = useShowReceiptPopUp();

  useEffect(() => {
    document.addEventListener('click', (event) => handleClickOutside(event));
    return () => {
      document.removeEventListener('click', (event) => handleClickOutside(event));
    };
  }, [ref]);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      setShowPopUp(false);
    }
  };

  const handlePlusButtonClick = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <section ref={ref} className={classNames({
      [styles.addPlusButton__container]: true,
    })}>
      <AiOutlinePlusCircle 
        role="button"
        className={classNames({
          [styles.addPlusButton__button]: true,
          [styles['addPlusButton__button-x']]: showPopUp,
          [styles['addPlusButton__button-position']]: showReceiptPopUp
        })} title='Add button'
        onClick={handlePlusButtonClick}
      />
      <AddPlusButtonPopUp />
    </section>
  );
};

export default AddPlusButton;
