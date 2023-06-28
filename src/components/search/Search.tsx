import React from 'react';
import styles from './Search.module.scss';
import withLogging from '../../hoc/withLogging';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search by user name"
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );
};

const Search = withLogging(SearchComponent);
export default Search;
