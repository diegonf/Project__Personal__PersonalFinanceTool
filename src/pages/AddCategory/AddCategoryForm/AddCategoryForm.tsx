import { handleCreateDocFunction, handleFetchCategories, handleFetchOnlyUserCategories } from 'assets/functions/handleDatabaseFunctions';
import { ICategory, ITransactionType } from 'assets/interfaces/interfaces';
import { useSelectedCategory, useUserCategories } from 'assets/state/hooks/addCategoryHooks';
import { useCategories, useUser } from 'assets/state/hooks/firebaseHooks';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styles from './AddCategoryForm.module.scss';


const AddCategoryForm = () => {
  const nav = useNavigate();
  const [user] = useUser();
  const [, setCategories] = useCategories();
  const [, setUserCategories] = useUserCategories();
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  // 👇 useState forms
  const [name, setName] = useState('');
  const [type, setType] = useState<ITransactionType | ''>('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  // ☝️ useState forms

  useEffect(() => {
    if (selectedCategory) handleSelectedCategoryFormLoad();
  }, [selectedCategory]);

  const handleSelectedCategoryFormLoad = () => {
    if (selectedCategory) {
      setName(selectedCategory.value);
      setType(selectedCategory.type);
      setDescription(selectedCategory.description);
      setIcon(selectedCategory.icon);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      const category = getCategoryObj();
      if(selectedCategory) {
        alert('transaction uptade call');
      } else {
        await handleCreateDocFunction('categories', user.uid, category);
      }

      handleFetchCategories(setCategories, user.uid);
      handleFetchOnlyUserCategories(setUserCategories, user.uid);
      resetForm();
    }
  };

  const getCategoryObj = () => {
    const categoryObj: ICategory = {
      value: name,
      type: type as ITransactionType,
      description: description,
      icon: icon,
    };

    return categoryObj;
  };

  const resetForm = () => {
    setName('');
    setType('');
    setDescription('');
    setIcon('');
    setSelectedCategory(null);
  };

  const handleReturnButton = () => {
    setSelectedCategory(null);
    if (window.history.state && window.history.state.idx > 0) {
      nav(-1);
    } else {
      nav('/', { replace: true }); // return to home if there is no back page history
    }
  };

  return (
    <section className={`theme__homesections ${styles.addCategoryForm__container}`}>
      <BsArrowLeft className={styles.addCategoryForm__returnPage} role='button' onClick={handleReturnButton} />
      <>
        {
          selectedCategory
            ? (
              <>
                <h2>Update Category</h2>
                <button className={styles.addCategoryForm__cancelUpdate} onClick={resetForm}>Cancel Update Transaction</button>
              </>
            )
            : (
              <h2>Add a new Category</h2>
            )
        }
      </>

      <form onSubmit={handleFormSubmit}>
        <label className={styles.addCategoryForm__labels}>
          How would like to call this Category?
          <input
            className={styles.addCategoryForm__inputs}
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.addCategoryForm__labels}>
          Type:
          <select
            className={styles.addCategoryForm__selects}
            required
            value={type}
            onChange={(e) => setType(e.target.value as ITransactionType)}
          >
            <option value=""></option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className={styles.addCategoryForm__labels}>
          Description:
          <textarea
            className={styles.addCategoryForm__textareas}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='(optional) write down examples of transactions to be used with this category.'
            style={{ 'width': '100%' }}
          />
        </label>
        <label className={styles.addCategoryForm__labels}>
          Icon:
          <input
            className={styles.addCategoryForm__inputs}
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder='(optional) paste a link of an icon you would like to use.'
          />
        </label>
        <>
          {
            icon && icon.length > 0
              ? (
                <img className={styles.addCategoryForm__iconPreview} src={icon} alt="icon" />
              )
              : null
          }
        </>
        <button className={styles.addCategoryForm__button} type='submit'>
          {
            selectedCategory
              ? 'Update Category'
              : 'Add Category'
          }
        </button>
      </form>
    </section>
  );
};

export default AddCategoryForm;