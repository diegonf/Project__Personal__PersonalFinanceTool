import { ITransaction } from 'assets/interfaces/interfaces';
import { useCurrentReceipt, useShowReceiptPopUp } from 'assets/state/hooks/addTransactionHooks';
import classNames from 'classnames';
import TransactionReceipt from './TransactionReceipt/TransactionReceipt';
import styles from './TransactionSummary.module.scss';


const TransactionSummary = ({ transaction }: { transaction: ITransaction }) => {
  const [showReceipt, setShowReceipt] = useShowReceiptPopUp();
  const [,setCurrentTransaction] = useCurrentReceipt();
  
  const formatDate = (date: Date) => {
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const dateString = `${day < 10 ? '0' + day : day}/${month.replace(/\./g, '')}`;

    return dateString;
  };

  const handleTransactionClick = () => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
    setCurrentTransaction(transaction);
    setShowReceipt(true);
  };

  return (
    <>
      <div className={styles.transaction__container} onClick={handleTransactionClick}>
        <div className={styles.transaction__category}>
          <p className={styles['transaction__category--icon']}>{transaction.category[0]}</p>
        </div>
        <div className={styles.transaction__body}>
          <p className={styles.transaction__place}>{transaction.description}</p>
          <p className={
            classNames({
              [styles.transaction__price]: true,
              [styles.transaction__price__positive]: transaction.type === 'income',
              [styles.transaction__price__negative]: transaction.type === 'expense'
            })}>
            {transaction.type === 'expense' ? '- ' : '+ '} R$ {(+transaction.amount).toFixed(2)}
          </p>
        </div>
        <p className={styles.transaction__date}>{formatDate(transaction.date)}</p>
      </div>
      {
        showReceipt 
          ? <TransactionReceipt/>
          : null
      }
      
    </>

  );
};

export default TransactionSummary;